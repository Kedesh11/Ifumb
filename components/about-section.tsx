"use client"

import {
  Target,
  Eye,
  Lightbulb,
  Users,
  Heart,
  Shield,
  Star,
  Zap,
  Award,
  Handshake,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useSiteData } from "@/lib/site-data"

const iconMap: Record<string, LucideIcon> = {
  Target,
  Eye,
  Lightbulb,
  Users,
  Heart,
  Shield,
  Star,
  Zap,
  Award,
  Handshake,
}

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { data } = useSiteData()
  const about = data.about

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="apropos"
      ref={sectionRef}
      className="bg-secondary py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              {about.subtitle}
            </p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl font-mono text-balance">
              {about.title}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>{about.paragraph1}</p>
              <p>{about.paragraph2}</p>
            </div>
          </div>

          {/* Right: values grid */}
          <div
            className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-8 opacity-0"
            }`}
          >
            {about.values.map((value) => {
              const Icon = iconMap[value.icon] || Lightbulb
              return (
                <div
                  key={value.id}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1 text-sm font-semibold text-card-foreground font-mono">
                    {value.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
