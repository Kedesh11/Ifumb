"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { Linkedin, Twitter, Github } from "lucide-react"
import { SiteService } from "@/lib/services/site-service"

const navigation = {
  services: [
    { name: "Genie logiciel", href: "#services" },
    { name: "Hacking ethique", href: "#services" },
    { name: "Conseil en digitalisation", href: "#services" },
    { name: "Data & IA", href: "#services" },
    { name: "Marketing Digital", href: "#services" },
  ],
  company: [
    { name: "A propos", href: "#apropos" },
    { name: "Equipe", href: "#equipe" },
    { name: "Contact", href: "#contact" },
  ],
  social: [
    { name: "LinkedIn", href: "#", icon: Linkedin },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "GitHub", href: "#", icon: Github },
  ],
}

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return

    setIsSubmitting(true)
    const status = await SiteService.submitNewsletterSubscription(newsletterEmail)

    if (status === "success") {
      alert("Merci, votre abonnement a ete enregistre.")
      setNewsletterEmail("")
    } else if (status === "exists") {
      alert("Cette adresse email est deja abonnee.")
    } else {
      alert("Une erreur est survenue. Veuillez reessayer.")
    }

    setIsSubmitting(false)
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground font-mono">
                  IF
                </span>
              </div>
              <span className="text-xl font-bold tracking-tight text-card-foreground font-mono">
                IFUMB
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Votre partenaire digital de confiance. Nous transformons les
              idees en solutions numeriques performantes.
            </p>
            <div className="mt-6 flex gap-3">
              {navigation.social.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={item.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-card-foreground font-mono">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-card-foreground font-mono">
              Entreprise
            </h3>
            <ul className="flex flex-col gap-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-card-foreground font-mono">
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Restez informe de nos dernieres actualites et innovations.
            </p>
            <form
              className="flex gap-2"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="votre@email.com"
                required
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {isSubmitting ? "..." : "OK"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-border pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IFUMB. Tous droits reserves.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Mentions legales
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Politique de confidentialite
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
