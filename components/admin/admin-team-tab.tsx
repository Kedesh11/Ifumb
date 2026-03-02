"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Trash2,
  Plus,
  ChevronDown,
  ChevronUp,
  Briefcase,
  FolderOpen,
  BarChart3,
  Award,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "./image-upload"
import { FileUpload } from "./file-upload"
import type { SiteData, Founder, Certification } from "@/lib/site-data"

interface Props {
  data: SiteData
  setData: (updater: SiteData | ((prev: SiteData) => SiteData)) => void
}

export function AdminTeamTab({ data, setData }: Props) {
  const founders = data.founders
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const updateFounder = (index: number, field: keyof Founder, value: unknown) => {
    setData((prev) => {
      const updated = [...prev.founders]
      updated[index] = { ...updated[index], [field]: value }
      return { ...prev, founders: updated }
    })
  }

  const addFounder = () => {
    setData((prev) => ({
      ...prev,
      founders: [
        ...prev.founders,
        {
          id: `f${Date.now()}`,
          name: "Nouveau membre",
          role: "Role",
          description: "Description...",
          image: "/images/founder-1.jpg",
          linkedin: "#",
          twitter: "#",
          email: "email@ifumb.com",
          bio: "Biographie...",
          education: "Formation",
          location: "Lieu",
          experience: [],
          projects: [],
          skills: [],
          certifications: [],
        },
      ],
    }))
  }

  const removeFounder = (index: number) => {
    if (!window.confirm("Supprimer ce membre ?")) return
    setData((prev) => ({
      ...prev,
      founders: prev.founders.filter((_, i) => i !== index),
    }))
  }

  const moveFounder = (index: number, direction: "up" | "down") => {
    setData((prev) => {
      const updated = [...prev.founders]
      const targetIndex = direction === "up" ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= updated.length) return prev

      const temp = updated[index]
      updated[index] = updated[targetIndex]
      updated[targetIndex] = temp

      return { ...prev, founders: updated }
    })
  }

  // Experience helpers
  const addExperience = (fIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(fIndex, "experience", [
      ...founder.experience,
      { role: "Nouveau poste", company: "Entreprise", period: "2024 - Present", description: "Description..." },
    ])
  }

  const removeExperience = (fIndex: number, eIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(
      fIndex,
      "experience",
      founder.experience.filter((_, i) => i !== eIndex)
    )
  }

  const updateExperience = (fIndex: number, eIndex: number, field: string, value: string) => {
    const founder = founders[fIndex]
    const exp = [...founder.experience]
    exp[eIndex] = { ...exp[eIndex], [field]: value }
    updateFounder(fIndex, "experience", exp)
  }

  const moveExperience = (fIndex: number, eIndex: number, direction: "up" | "down") => {
    const founder = founders[fIndex]
    const updated = [...founder.experience]
    const targetIndex = direction === "up" ? eIndex - 1 : eIndex + 1
    if (targetIndex < 0 || targetIndex >= updated.length) return
    
    const temp = updated[eIndex]
    updated[eIndex] = updated[targetIndex]
    updated[targetIndex] = temp
    updateFounder(fIndex, "experience", updated)
  }

  // Project helpers
  const addProject = (fIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(fIndex, "projects", [
      ...founder.projects,
      { title: "Nouveau projet", description: "Description...", tags: [], link: "" },
    ])
  }

  const removeProject = (fIndex: number, pIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(
      fIndex,
      "projects",
      founder.projects.filter((_, i) => i !== pIndex)
    )
  }

  const updateProject = (fIndex: number, pIndex: number, field: string, value: unknown) => {
    const founder = founders[fIndex]
    const proj = [...founder.projects]
    proj[pIndex] = { ...proj[pIndex], [field]: value }
    updateFounder(fIndex, "projects", proj)
  }

  const moveTeamProject = (fIndex: number, pIndex: number, direction: "up" | "down") => {
    const founder = founders[fIndex]
    const updated = [...founder.projects]
    const targetIndex = direction === "up" ? pIndex - 1 : pIndex + 1
    if (targetIndex < 0 || targetIndex >= updated.length) return

    const temp = updated[pIndex]
    updated[pIndex] = updated[targetIndex]
    updated[targetIndex] = temp
    updateFounder(fIndex, "projects", updated)
  }

  // Skill helpers
  const addSkill = (fIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(fIndex, "skills", [
      ...founder.skills,
      { name: "Nouvelle competence", level: 75 },
    ])
  }

  const removeSkill = (fIndex: number, sIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(
      fIndex,
      "skills",
      founder.skills.filter((_, i) => i !== sIndex)
    )
  }

  const updateSkill = (fIndex: number, sIndex: number, field: string, value: unknown) => {
    const founder = founders[fIndex]
    const skills = [...founder.skills]
    skills[sIndex] = { ...skills[sIndex], [field]: value }
    updateFounder(fIndex, "skills", skills)
  }

  const moveSkill = (fIndex: number, sIndex: number, direction: "up" | "down") => {
    const founder = founders[fIndex]
    const updated = [...founder.skills]
    const targetIndex = direction === "up" ? sIndex - 1 : sIndex + 1
    if (targetIndex < 0 || targetIndex >= updated.length) return

    const temp = updated[sIndex]
    updated[sIndex] = updated[targetIndex]
    updated[targetIndex] = temp
    updateFounder(fIndex, "skills", updated)
  }

  // Certification helpers
  const addCertification = (fIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(fIndex, "certifications", [
      ...founder.certifications,
      { name: "Nouvelle certification", url: "" },
    ])
  }

  const removeCertification = (fIndex: number, cIndex: number) => {
    const founder = founders[fIndex]
    updateFounder(
      fIndex,
      "certifications",
      founder.certifications.filter((_, i) => i !== cIndex)
    )
  }

  const updateCertification = (fIndex: number, cIndex: number, field: keyof Certification, value: string) => {
    const founder = founders[fIndex]
    const certs = [...founder.certifications]
    certs[cIndex] = { ...certs[cIndex], [field]: value }
    updateFounder(fIndex, "certifications", certs)
  }

  const moveCertification = (fIndex: number, cIndex: number, direction: "up" | "down") => {
    const founder = founders[fIndex]
    const updated = [...founder.certifications]
    const targetIndex = direction === "up" ? cIndex - 1 : cIndex + 1
    if (targetIndex < 0 || targetIndex >= updated.length) return

    const temp = updated[cIndex]
    updated[cIndex] = updated[targetIndex]
    updated[targetIndex] = temp
    updateFounder(fIndex, "certifications", updated)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {founders.length} membre(s) de l{"'"}equipe
        </p>
        <Button onClick={addFounder} className="gap-1.5">
          <Plus className="h-4 w-4" />
          Ajouter un membre
        </Button>
      </div>

      {founders.map((founder, fIndex) => {
        const isExpanded = expandedId === founder.id
        return (
          <div
            key={founder.id}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            {/* Collapsed header */}
            <div
              onClick={() => setExpandedId(isExpanded ? null : founder.id)}
              className="flex w-full cursor-pointer items-center gap-4 p-4 text-left transition-colors hover:bg-secondary/30"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-card-foreground">
                  {founder.name}
                </p>
                <p className="text-xs text-muted-foreground">{founder.role}</p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveFounder(fIndex, "up")
                  }}
                  disabled={fIndex === 0}
                  className="h-8 w-8 text-muted-foreground"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    moveFounder(fIndex, "down")
                  }}
                  disabled={fIndex === founders.length - 1}
                  className="h-8 w-8 text-muted-foreground"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFounder(fIndex)
                  }}
                  className="h-8 w-8 text-muted-foreground hover:text-destructive ml-1"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              </div>
            </div>

            {/* Expanded content */}
            {isExpanded && (
              <div className="border-t border-border p-6 space-y-6">
                {/* Basic info */}
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
                    Informations generales
                  </h4>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Nom</Label>
                      <Input
                        value={founder.name}
                        onChange={(e) => updateFounder(fIndex, "name", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Role</Label>
                      <Input
                        value={founder.role}
                        onChange={(e) => updateFounder(fIndex, "role", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={founder.email}
                        onChange={(e) => updateFounder(fIndex, "email", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Lieu</Label>
                      <Input
                        value={founder.location}
                        onChange={(e) => updateFounder(fIndex, "location", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        value={founder.linkedin}
                        onChange={(e) => updateFounder(fIndex, "linkedin", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Twitter</Label>
                      <Input
                        value={founder.twitter}
                        onChange={(e) => updateFounder(fIndex, "twitter", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Formation</Label>
                      <Input
                        value={founder.education}
                        onChange={(e) => updateFounder(fIndex, "education", e.target.value)}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <ImageUpload
                        label="Photo de profil"
                        value={founder.image}
                        onChange={(url) => updateFounder(fIndex, "image", url)}
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label>Description courte</Label>
                    <Textarea
                      value={founder.description}
                      onChange={(e) => updateFounder(fIndex, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                  <div className="mt-4">
                    <Label>Biographie complete</Label>
                    <Textarea
                      value={founder.bio}
                      onChange={(e) => updateFounder(fIndex, "bio", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>

                <Separator />

                {/* Experience */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      <Briefcase className="h-3.5 w-3.5" />
                      Experiences ({founder.experience.length})
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addExperience(fIndex)}
                      className="gap-1 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {founder.experience.map((exp, eIndex) => (
                      <div
                        key={eIndex}
                        className="rounded-lg border border-border bg-secondary/20 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">
                            Experience {eIndex + 1}
                          </span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveExperience(fIndex, eIndex, "up")}
                              disabled={eIndex === 0}
                              className="h-6 w-6 text-muted-foreground"
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveExperience(fIndex, eIndex, "down")}
                              disabled={eIndex === founder.experience.length - 1}
                              className="h-6 w-6 text-muted-foreground"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeExperience(fIndex, eIndex)}
                              className="h-6 w-6 text-muted-foreground hover:text-destructive ml-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-3">
                          <Input
                            placeholder="Role"
                            value={exp.role}
                            onChange={(e) =>
                              updateExperience(fIndex, eIndex, "role", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Entreprise"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(fIndex, eIndex, "company", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Periode"
                            value={exp.period}
                            onChange={(e) =>
                              updateExperience(fIndex, eIndex, "period", e.target.value)
                            }
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={exp.description}
                          onChange={(e) =>
                            updateExperience(fIndex, eIndex, "description", e.target.value)
                          }
                          rows={2}
                          className="mt-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Projects */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      <FolderOpen className="h-3.5 w-3.5" />
                      Projets ({founder.projects.length})
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addProject(fIndex)}
                      className="gap-1 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {founder.projects.map((project, pIndex) => (
                      <div
                        key={pIndex}
                        className="rounded-lg border border-border bg-secondary/20 p-3"
                      >
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">
                            Projet {pIndex + 1}
                          </span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveTeamProject(fIndex, pIndex, "up")}
                              disabled={pIndex === 0}
                              className="h-6 w-6 text-muted-foreground"
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveTeamProject(fIndex, pIndex, "down")}
                              disabled={pIndex === founder.projects.length - 1}
                              className="h-6 w-6 text-muted-foreground"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeProject(fIndex, pIndex)}
                              className="h-6 w-6 text-muted-foreground hover:text-destructive ml-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <Input
                            placeholder="Titre"
                            value={project.title}
                            onChange={(e) =>
                              updateProject(fIndex, pIndex, "title", e.target.value)
                            }
                          />
                          <Input
                            placeholder="Lien (optionnel)"
                            value={project.link || ""}
                            onChange={(e) =>
                              updateProject(fIndex, pIndex, "link", e.target.value)
                            }
                          />
                        </div>
                        <Textarea
                          placeholder="Description"
                          value={project.description}
                          onChange={(e) =>
                            updateProject(fIndex, pIndex, "description", e.target.value)
                          }
                          rows={2}
                          className="mt-2"
                        />
                        <div className="mt-2">
                          <Input
                            placeholder="Tags (separes par des virgules)"
                            value={project.tags.join(", ")}
                            onChange={(e) =>
                              updateProject(
                                fIndex,
                                pIndex,
                                "tags",
                                e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Skills */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      <BarChart3 className="h-3.5 w-3.5" />
                      Competences ({founder.skills.length})
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(fIndex)}
                      className="gap-1 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {founder.skills.map((skill, sIndex) => (
                      <div key={sIndex} className="flex items-end gap-2">
                        <div className="flex-1">
                          <Input
                            placeholder="Competence"
                            value={skill.name}
                            onChange={(e) =>
                              updateSkill(fIndex, sIndex, "name", e.target.value)
                            }
                          />
                        </div>
                        <div className="w-20">
                          <Input
                            type="number"
                            min={0}
                            max={100}
                            value={skill.level}
                            onChange={(e) =>
                              updateSkill(fIndex, sIndex, "level", parseInt(e.target.value) || 0)
                            }
                          />
                        </div>
                        <span className="pb-2 text-xs text-muted-foreground">%</span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveSkill(fIndex, sIndex, "up")}
                            disabled={sIndex === 0}
                            className="h-9 w-9 text-muted-foreground"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveSkill(fIndex, sIndex, "down")}
                            disabled={sIndex === founder.skills.length - 1}
                            className="h-9 w-9 text-muted-foreground"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSkill(fIndex, sIndex)}
                            className="h-9 w-9 text-muted-foreground hover:text-destructive ml-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Certifications */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      <Award className="h-3.5 w-3.5" />
                      Certifications ({founder.certifications.length})
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addCertification(fIndex)}
                      className="gap-1 text-xs"
                    >
                      <Plus className="h-3 w-3" />
                      Ajouter
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {founder.certifications.map((cert, cIndex) => (
                      <div key={cIndex} className="rounded-lg border border-border bg-secondary/20 p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-[10px] text-muted-foreground">
                            Certification {cIndex + 1}
                          </span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveCertification(fIndex, cIndex, "up")}
                              disabled={cIndex === 0}
                              className="h-6 w-6 text-muted-foreground"
                            >
                              <ChevronUp className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => moveCertification(fIndex, cIndex, "down")}
                              disabled={cIndex === founder.certifications.length - 1}
                              className="h-6 w-6 text-muted-foreground"
                            >
                              <ChevronDown className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeCertification(fIndex, cIndex)}
                              className="h-6 w-6 text-muted-foreground hover:text-destructive ml-1"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <Label className="text-[10px]">Nom de la certification</Label>
                            <Input
                              value={cert.name}
                              onChange={(e) =>
                                updateCertification(fIndex, cIndex, "name", e.target.value)
                              }
                              placeholder="ex: AWS Solutions Architect"
                              className="h-8 text-sm"
                            />
                          </div>
                          <FileUpload
                            value={cert.url}
                            onChange={(url) => updateCertification(fIndex, cIndex, "url", url)}
                            label="Document (PDF, Image...)"
                            accept=".pdf,image/*"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
