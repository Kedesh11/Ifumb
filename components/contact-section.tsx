"use client"

import { useState, useRef, useEffect } from "react"
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteService } from "@/lib/services/site-service"
import { useSiteData } from "@/lib/site-data"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { data } = useSiteData()
  const contact = data.contact
  const phoneHref = `tel:${contact.phone.replace(/\s+/g, "")}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await SiteService.submitContactMessage(formData)

    if (success) {
      alert("Merci pour votre message ! Nous vous recontacterons rapidement.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } else {
      alert("Une erreur est survenue lors de l'envoi. Veuillez reessayer.")
    }

    setIsSubmitting(false)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono text-balance">
            Parlons de votre projet
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Vous avez une idee, un projet ou un besoin ? Contactez-nous et
            transformons votre vision en realite.
          </p>
        </div>

        <div
          className={`grid gap-12 lg:grid-cols-5 transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-6 text-lg font-semibold text-card-foreground font-mono">
                Coordonnees
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      Telephone
                    </p>
                    <a
                      href={phoneHref}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground">
                      Adresse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {contact.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick CTA */}
            <div className="rounded-xl bg-primary p-6 text-primary-foreground">
              <h3 className="mb-2 text-lg font-semibold font-mono">
                {contact.urgentTitle}
              </h3>
              <p className="mb-4 text-sm text-primary-foreground/80">
                {contact.urgentText}
              </p>
              <Button
                asChild
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                <a href={`mailto:${contact.email}`}>Envoyer un email</a>
              </Button>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-border bg-card p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-card-foreground"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-medium text-card-foreground"
                >
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                  className="rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Objet de votre message"
                />
              </div>
              <div className="mt-5 flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-card-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  className="resize-none rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Decrivez votre projet ou besoin..."
                />
              </div>
              <Button type="submit" size="lg" className="mt-6 gap-2 w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Envoi en cours...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
