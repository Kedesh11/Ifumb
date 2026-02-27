"use client"

import { Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { SiteData } from "@/lib/site-data"

interface Props {
  data: SiteData
  setData: (updater: SiteData | ((prev: SiteData) => SiteData)) => void
}

export function AdminHeroTab({ data, setData }: Props) {
  const hero = data.hero

  const update = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value },
    }))
  }

  const updateStat = (index: number, field: "value" | "label", value: string) => {
    setData((prev) => {
      const stats = [...prev.hero.stats]
      stats[index] = { ...stats[index], [field]: value }
      return { ...prev, hero: { ...prev.hero, stats } }
    })
  }

  const addStat = () => {
    setData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: [...prev.hero.stats, { value: "0", label: "Nouveau" }],
      },
    }))
  }

  const removeStat = (index: number) => {
    setData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: prev.hero.stats.filter((_, i) => i !== index),
      },
    }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          Contenu principal
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="hero-badge">Badge</Label>
            <Input
              id="hero-badge"
              value={hero.badge}
              onChange={(e) => update("badge", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-title">Titre principal</Label>
            <Input
              id="hero-title"
              value={hero.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-accent">Mot accent</Label>
            <Input
              id="hero-accent"
              value={hero.titleAccent}
              onChange={(e) => update("titleAccent", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-subtitle">Sous-titre</Label>
            <Textarea
              id="hero-subtitle"
              value={hero.subtitle}
              onChange={(e) => update("subtitle", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          Boutons CTA
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="hero-cta1">CTA Primaire</Label>
            <Input
              id="hero-cta1"
              value={hero.ctaPrimary}
              onChange={(e) => update("ctaPrimary", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hero-cta2">CTA Secondaire</Label>
            <Input
              id="hero-cta2"
              value={hero.ctaSecondary}
              onChange={(e) => update("ctaSecondary", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Statistiques
          </h3>
          <Button variant="outline" size="sm" onClick={addStat} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-3">
          {hero.stats.map((stat, index) => (
            <div key={index} className="flex items-end gap-3">
              <div className="flex-1">
                <Label>Valeur</Label>
                <Input
                  value={stat.value}
                  onChange={(e) => updateStat(index, "value", e.target.value)}
                />
              </div>
              <div className="flex-1">
                <Label>Label</Label>
                <Input
                  value={stat.label}
                  onChange={(e) => updateStat(index, "label", e.target.value)}
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeStat(index)}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
