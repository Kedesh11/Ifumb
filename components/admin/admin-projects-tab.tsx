"use client"

import { SiteData, ProjectItem } from "@/lib/site-data"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Image as ImageIcon, Link as LinkIcon, Tag, ChevronUp, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUpload } from "./image-upload"

interface AdminProjectsTabProps {
  data: SiteData
  setData: (data: SiteData | ((prev: SiteData) => SiteData)) => void
}

export function AdminProjectsTab({ data, setData }: AdminProjectsTabProps) {
  const projects = data.projects || []

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    }))
  }

  const addProject = () => {
    const newProject: ProjectItem = {
      id: `p${Date.now()}`,
      title: "Nouveau projet",
      description: "Description du projet...",
      image: "/images/placeholder.jpg",
      tags: ["Tech"],
      link: "#",
    }
    setData((prev) => ({
      ...prev,
      projects: [...(prev.projects || []), newProject],
    }))
  }

  const removeProject = (id: string) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }))
  }

  const moveProject = (index: number, direction: "up" | "down") => {
    setData((prev) => {
      const updated = [...prev.projects]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= updated.length) return prev

      const temp = updated[index]
      updated[index] = updated[targetIndex]
      updated[targetIndex] = temp

      return { ...prev, projects: updated }
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-mono">Liste des projets</h2>
          <p className="text-sm text-muted-foreground">Gerez les projets affiches dans le portfolio</p>
        </div>
        <Button onClick={addProject} className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un projet
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden border-border bg-card/50">
            <CardContent className="p-6">
              <div className="flex flex-col gap-6 md:flex-row">
                <div className="shrink-0">
                  <div className="relative h-32 w-52 overflow-hidden rounded-lg border border-border bg-muted">
                    {project.image ? (
                      <img src={project.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Titre du projet</Label>
                      <Input
                        value={project.title}
                        onChange={(e) => updateProject(project.id, { title: e.target.value })}
                        className="font-mono text-sm"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-1">
                      <ImageUpload
                        label="Image d'illustration"
                        value={project.image}
                        onChange={(url) => updateProject(project.id, { image: url })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateProject(project.id, { description: e.target.value })}
                      className="min-h-[80px] resize-none text-sm"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Lien (URL)</Label>
                      <Input
                        value={project.link || ""}
                        onChange={(e) => updateProject(project.id, { link: e.target.value })}
                        className="font-mono text-xs"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tags (separes par des virgules)</Label>
                      <Input
                        value={(project.tags || []).join(", ")}
                        onChange={(e) =>
                          updateProject(project.id, {
                            tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
                          })
                        }
                        className="font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveProject(projects.findIndex(p => p.id === project.id), "up")}
                    disabled={projects.findIndex(p => p.id === project.id) === 0}
                    className="h-9 w-9 text-muted-foreground"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => moveProject(projects.findIndex(p => p.id === project.id), "down")}
                    disabled={projects.findIndex(p => p.id === project.id) === projects.length - 1}
                    className="h-9 w-9 text-muted-foreground"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeProject(project.id)}
                    className="h-9 w-9 mt-2"
                    title="Supprimer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {projects.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">Aucun projet pour le moment</p>
            <Button variant="link" onClick={addProject}>
              Ajouter votre premier projet
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
