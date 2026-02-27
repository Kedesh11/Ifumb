"use client"

import {
  Code2,
  ShieldCheck,
  BarChart3,
  BrainCircuit,
  Megaphone,
  Globe,
  Layers,
  Cpu,
  Smartphone,
  Database,
  Cloud,
  Palette,
  LineChart,
  Lock,
  Rocket,
  Lightbulb,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useSiteData } from "@/lib/site-data"

const iconMap: Record<string, LucideIcon> = {
  Code2,
  ShieldCheck,
  BarChart3,
  BrainCircuit,
  Megaphone,
  Globe,
  Layers,
  Cpu,
  Smartphone,
  Database,
  Cloud,
  Palette,
  LineChart,
  Lock,
  Rocket,
  Lightbulb,
}

export function ServicesSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const { data } = useSiteData()
  const services = data.services

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.15 }
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [services.length])

  return (
    <section id="services" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Ce que nous faisons
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono text-balance">
            Nos expertises au service de votre reussite
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
            Une gamme complete de services numeriques pour transformer vos idees
            en realite et propulser votre activite.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Layers
            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[index] = el
                }}
                data-index={index}
                className={`group relative rounded-xl border border-border bg-card p-6 transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 ${
                  visibleCards.has(index)
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground font-mono">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
