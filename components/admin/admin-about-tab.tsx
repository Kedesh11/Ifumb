"use client"

import { Trash2, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { SiteData } from "@/lib/site-data"

const availableIcons = [
  "Lightbulb",
  "Target",
  "Users",
  "Eye",
  "Heart",
  "Shield",
  "Star",
  "Zap",
  "Award",
  "Handshake",
]

interface Props {
  data: SiteData
  setData: (updater: SiteData | ((prev: SiteData) => SiteData)) => void
}

export function AdminAboutTab({ data, setData }: Props) {
  const about = data.about

  const updateField = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: value },
    }))
  }

  const updateValue = (index: number, field: string, value: string) => {
    setData((prev) => {
      const values = [...prev.about.values]
      values[index] = { ...values[index], [field]: value }
      return { ...prev, about: { ...prev.about, values } }
    })
  }

  const addValue = () => {
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        values: [
          ...prev.about.values,
          {
            id: `v${Date.now()}`,
            icon: "Star",
            title: "Nouvelle valeur",
            description: "Description de la valeur...",
          },
        ],
      },
    }))
  }

  const removeValue = (index: number) => {
    setData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        values: prev.about.values.filter((_, i) => i !== index),
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
            <Label>Titre</Label>
            <Input
              value={about.title}
              onChange={(e) => updateField("title", e.target.value)}
            />
          </div>
          <div>
            <Label>Paragraphe 1</Label>
            <Textarea
              value={about.paragraph1}
              onChange={(e) => updateField("paragraph1", e.target.value)}
              rows={3}
            />
          </div>
          <div>
            <Label>Paragraphe 2</Label>
            <Textarea
              value={about.paragraph2}
              onChange={(e) => updateField("paragraph2", e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary">
            Valeurs ({about.values.length})
          </h3>
          <Button variant="outline" size="sm" onClick={addValue} className="gap-1.5">
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </Button>
        </div>
        <div className="space-y-4">
          {about.values.map((value, index) => (
            <div
              key={value.id}
              className="rounded-lg border border-border bg-secondary/30 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-medium text-primary">
                  Valeur {index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeValue(index)}
                  className="h-7 w-7 text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label>Titre</Label>
                  <Input
                    value={value.title}
                    onChange={(e) =>
                      updateValue(index, "title", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>Icone</Label>
                  <select
                    value={value.icon}
                    onChange={(e) =>
                      updateValue(index, "icon", e.target.value)
                    }
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    {availableIcons.map((icon) => (
                      <option key={icon} value={icon}>
                        {icon}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <Label>Description</Label>
                <Textarea
                  value={value.description}
                  onChange={(e) =>
                    updateValue(index, "description", e.target.value)
                  }
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
