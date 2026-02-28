"use client"

import { useEffect, useState } from "react"
import { SiteService } from "@/lib/services/site-service"
import { Trash2, Mail, User, Calendar, MessageSquare, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export function AdminMessagesTab() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchMessages = async () => {
    setIsLoading(true)
    const data = await SiteService.getContactMessages()
    setMessages(data as ContactMessage[])
    setIsLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const deleteMessage = async (id: string) => {
    if (!window.confirm("Supprimer ce message ?")) return
    const success = await SiteService.deleteContactMessage(id)
    if (success) {
      setMessages((prev) => prev.filter((m) => m.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-mono text-card-foreground">Messages reçus</h2>
          <p className="text-sm text-muted-foreground">Consultez les demandes de contact de vos clients</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchMessages} disabled={isLoading} className="gap-2">
          <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Actualiser
        </Button>
      </div>

      <div className="grid gap-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCcw className="h-8 w-8 animate-spin text-primary/30" />
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <Card key={msg.id} className="overflow-hidden border-border bg-card/50">
              <CardContent className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="flex flex-1 flex-col gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                        <User className="h-4 w-4 text-primary" />
                        {msg.name}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4 text-primary" />
                        {msg.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(msg.created_at).toLocaleString("fr-FR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>

                    <div className="rounded-lg bg-secondary/30 p-4">
                      <div className="mb-2 flex items-center gap-2 font-bold text-foreground">
                        <Badge variant="outline" className="font-mono text-[10px] uppercase">Sujet</Badge>
                        {msg.subject}
                      </div>
                      <div className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                        {msg.message}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-start">
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteMessage(msg.id)}
                      className="h-9 w-9"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <MessageSquare className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Aucun message pour le moment</p>
          </div>
        )}
      </div>
    </div>
  )
}
