import { supabase } from "../supabase"
import { SiteData, defaultSiteData } from "../site-data"

const CONFIG_TABLE = "site_configs"
const CONFIG_ID = "main-config"

export const SiteService = {
  /**
   * Fetches the site configuration from Supabase.
   * If no config exists, it returns null.
   */
  async getSiteData(): Promise<SiteData | null> {
    try {
      const { data, error } = await supabase
        .from(CONFIG_TABLE)
        .select("data")
        .eq("id", CONFIG_ID)
        .single()

      if (error) {
        if (error.code === "PGRST116") {
          // No record found
          return null
        }
        throw error
      }

      return data.data as SiteData
    } catch (error) {
      console.error("Error fetching site data from backend:", error)
      return null
    }
  },

  /**
   * Saves the site configuration to Supabase.
   */
  async saveSiteData(data: SiteData): Promise<boolean> {
    try {
      const { error } = await supabase.from(CONFIG_TABLE).upsert({
        id: CONFIG_ID,
        data,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error
      return true
    } catch (error) {
      console.error("Error saving site data to backend:", error)
      return false
    }
  },

  /**
   * Resets the backend site data to defaults.
   */
  async resetToDefaults(): Promise<boolean> {
    return this.saveSiteData(defaultSiteData)
  },

  // ─── Contact Messages ──────────────────────────────────────────

  async submitContactMessage(message: {
    name: string
    email: string
    subject: string
    message: string
  }) {
    try {
      const { error } = await supabase.from("contact_messages").insert([message])
      if (error) throw error
      return true
    } catch (error) {
      console.error("Error submitting contact message:", error)
      return false
    }
  },

  async getContactMessages() {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false })
      if (error) throw error
      return data
    } catch (error) {
      console.error("Error fetching contact messages:", error)
      return []
    }
  },

  async deleteContactMessage(id: number | string) {
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id)
      if (error) throw error
      return true
    } catch (error) {
      console.error("Error deleting contact message:", error)
      return false
    }
  },

  async submitNewsletterSubscription(email: string): Promise<"success" | "exists" | "error"> {
    try {
      const normalizedEmail = email.trim().toLowerCase()
      const { error } = await supabase
        .from("newsletter_subscriptions")
        .insert([{ email: normalizedEmail }])

      if (error) {
        if (error.code === "23505") {
          return "exists"
        }
        throw error
      }

      return "success"
    } catch (error) {
      console.error("Error submitting newsletter subscription:", error)
      return "error"
    }
  },

  // ─── File Upload ──────────────────────────────────────────────
  
  async uploadFile(file: File): Promise<string | null> {
    try {
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error("Error uploading file:", error)
      return null
    }
  },
}
