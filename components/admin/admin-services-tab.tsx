"use client"

import { Trash2, Plus, GripVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { SiteData } from "@/lib/site-data"

const availableIcons = [
  "Code2",
  "ShieldCheck",
  "BarChart3",
  "BrainCircuit",
  "Megaphone",
  "Globe",
  "Layers",
  "Cpu",
  "Smartphone",
  "Database",
  "Cloud",
  "Palette",
  "LineChart",
  "Lock",
  "Rocket",
  "Lightbulb",
]

interface Props {
  data: SiteData
  setData: (updater: SiteData | ((prev: SiteData) => SiteData)) => void
}

export function AdminServicesTab({ data, setData }: Props) {
  const services = data.services

  const updateService = (index: number, field: string, value: string) => {
    setData((prev) => {
      const updated = [...prev.services]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, services: updated }
    })
  }

  const addService = () => {
    setData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: `s${Date.now()}`,
          icon: "Layers",
          title: "Nouveau service",
          description: "Description du service...",
        },
      ],
    }))
  }

  const removeService = (index: number) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {services.length} service(s) configure(s)
        </p>
        <Button onClick={addService} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Ajouter un service
        </Button>
      </div>

      {services.map((service, index) => (
        <div
          key={service.id}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GripVertical className="h-4 w-4" />
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                Service {index + 1}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeService(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Titre</Label>
                <Input
                  value={service.title}
                  onChange={(e) =>
                    updateService(index, "title", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Icone</Label>
                <select
                  value={service.icon}
                  onChange={(e) =>
                    updateService(index, "icon", e.target.value)
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
            <div>
              <Label>Description</Label>
              <Textarea
                value={service.description}
                onChange={(e) =>
                  updateService(index, "description", e.target.value)
                }
                rows={2}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
