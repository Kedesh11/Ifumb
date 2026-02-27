"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { SiteData } from "@/lib/site-data"

interface Props {
  data: SiteData
  setData: (updater: SiteData | ((prev: SiteData) => SiteData)) => void
}

export function AdminContactTab({ data, setData }: Props) {
  const contact = data.contact

  const update = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }))
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          Coordonnees
        </h3>
        <div className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input
              value={contact.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>
          <div>
            <Label>Telephone</Label>
            <Input
              value={contact.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
          <div>
            <Label>Adresse</Label>
            <Input
              value={contact.address}
              onChange={(e) => update("address", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
          Section urgente
        </h3>
        <div className="space-y-4">
          <div>
            <Label>Titre</Label>
            <Input
              value={contact.urgentTitle}
              onChange={(e) => update("urgentTitle", e.target.value)}
            />
          </div>
          <div>
            <Label>Texte</Label>
            <Textarea
              value={contact.urgentText}
              onChange={(e) => update("urgentText", e.target.value)}
              rows={2}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
