"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export function CtaBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-primary py-20 lg:py-24">
      <div
        className={`mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl font-mono text-balance">
          Pret a transformer votre vision en realite ?
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80 text-pretty">
          Que vous soyez une entreprise privee, une institution publique ou un
          futur partenaire, nous sommes prets a relever vos defis.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 gap-2 text-base px-8"
          >
            <Link href="#contact">
              Demarrer un projet
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-2 text-base px-8"
          >
            <Link href="#services">Explorer nos services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
