"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useSiteData } from "@/lib/site-data"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { data } = useSiteData()
  const hero = data.hero

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/70" />
      </div>

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {hero.badge}
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-5xl md:text-7xl font-mono text-balance">
            {hero.title}
            <br />
            <span className="text-accent">{hero.titleAccent}</span> de confiance
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            {hero.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base px-8"
            >
              <Link href="#services">
                {hero.ctaPrimary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground gap-2 text-base px-8"
            >
              <Link href="#contact">{hero.ctaSecondary}</Link>
            </Button>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4 transition-all duration-1000 delay-500 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          {hero.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-accent font-mono">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-primary-foreground/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-primary-foreground/50" />
      </div>
    </section>
  )
}
