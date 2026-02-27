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

export function AdminProcessTab({ data, setData }: Props) {
  const steps = data.process

  const updateStep = (index: number, field: string, value: string) => {
    setData((prev) => {
      const updated = [...prev.process]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, process: updated }
    })
  }

  const addStep = () => {
    const num = String(steps.length + 1).padStart(2, "0")
    setData((prev) => ({
      ...prev,
      process: [
        ...prev.process,
        {
          id: `p${Date.now()}`,
          number: num,
          title: "Nouvelle etape",
          description: "Description de l'etape...",
        },
      ],
    }))
  }

  const removeStep = (index: number) => {
    setData((prev) => ({
      ...prev,
      process: prev.process.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {steps.length} etape(s) configuree(s)
        </p>
        <Button onClick={addStep} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Ajouter une etape
        </Button>
      </div>

      {steps.map((step, index) => (
        <div
          key={step.id}
          className="rounded-xl border border-border bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary font-mono">
              {step.number}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeStep(index)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Numero</Label>
                <Input
                  value={step.number}
                  onChange={(e) =>
                    updateStep(index, "number", e.target.value)
                  }
                />
              </div>
              <div>
                <Label>Titre</Label>
                <Input
                  value={step.title}
                  onChange={(e) =>
                    updateStep(index, "title", e.target.value)
                  }
                />
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={step.description}
                onChange={(e) =>
                  updateStep(index, "description", e.target.value)
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
