"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useSiteData } from "@/lib/site-data"
import { Badge } from "@/components/ui/badge"

export function ProjectsSection() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])
  const { data } = useSiteData()
  const projects = data.projects || []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleItems((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.1 }
    )

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item)
    })

    return () => observer.disconnect()
  }, [projects.length])

  return (
    <section id="projets" className="bg-secondary/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              Notre Portfolio
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono text-balance">
              Des realisations qui parlent de nous
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground text-pretty">
              Decouvrez comment nous accompagnons nos clients dans leurs defis technologiques les plus ambitieux.
            </p>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                itemsRef.current[index] = el
              }}
              data-index={index}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 ${
                visibleItems.has(index)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-12 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
                
                {/* Overlay Link */}
                {project.link && (
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <Link
                      href={project.link}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-300 hover:scale-110"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] font-medium uppercase tracking-wider">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground font-mono group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {project.description}
                </p>
                
                {project.link && (
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
