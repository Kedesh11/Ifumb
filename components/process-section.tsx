"use client"

import { useEffect, useRef, useState } from "react"
import { useSiteData } from "@/lib/site-data"

export function ProcessSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const { data } = useSiteData()
  const steps = data.process

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

  return (
    <section ref={sectionRef} className="bg-secondary py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Notre methode
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-secondary-foreground sm:text-4xl font-mono text-balance">
            Un processus clair et efficace
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            De l{"'"}idee a la realisation, nous suivons une methodologie
            eprouvee pour garantir des resultats optimaux.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`relative transition-all duration-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden h-px w-8 -translate-x-[-100%] bg-border lg:block" />
              )}

              <div className="rounded-xl border border-border bg-card p-6">
                <span className="mb-4 block text-4xl font-bold text-primary/20 font-mono">
                  {step.number}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-card-foreground font-mono">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
