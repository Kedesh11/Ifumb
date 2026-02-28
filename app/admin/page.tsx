"use client"

import { useState } from "react"
import Link from "next/link"
import {
  LayoutDashboard,
  Zap,
  Briefcase,
  Info,
  GitBranch,
  Users,
  Phone,
  RotateCcw,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Save,
  MessageSquare,
} from "lucide-react"
import { useSiteData } from "@/lib/site-data"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { AdminHeroTab } from "@/components/admin/admin-hero-tab"
import { AdminServicesTab } from "@/components/admin/admin-services-tab"
import { AdminAboutTab } from "@/components/admin/admin-about-tab"
import { AdminProcessTab } from "@/components/admin/admin-process-tab"
import { AdminProjectsTab } from "@/components/admin/admin-projects-tab"
import { AdminTeamTab } from "@/components/admin/admin-team-tab"
import { AdminContactTab } from "@/components/admin/admin-contact-tab"
import { AdminMessagesTab } from "@/components/admin/admin-messages-tab"

const tabs = [
  { id: "hero", label: "Hero", icon: Zap },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "about", label: "A propos", icon: Info },
  { id: "process", label: "Processus", icon: GitBranch },
  { id: "projects", label: "Projets", icon: LayoutDashboard },
  { id: "team", label: "Equipe", icon: Users },
  { id: "contact", label: "Contact", icon: Phone },
  { id: "messages", label: "Messages", icon: MessageSquare },
] as const

type TabId = (typeof tabs)[number]["id"]

export default function AdminPage() {
  const { data, setData, resetData, isLoaded } = useSiteData()
  const [activeTab, setActiveTab] = useState<TabId>("hero")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [saveFlash, setSaveFlash] = useState(false)

  const handleSave = () => {
    setData(data)
    setSaveFlash(true)
    setTimeout(() => setSaveFlash(false), 1500)
  }

  const handleReset = () => {
    if (window.confirm("Reinitialiser toutes les donnees du site aux valeurs par defaut ? Cette action est irreversible.")) {
      resetData()
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`flex shrink-0 flex-col border-r border-border bg-card transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo area */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
            <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-bold text-card-foreground font-mono">
                IFUMB
              </span>
              <span className="text-[10px] text-muted-foreground">
                Administration
              </span>
            </div>
          )}
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  title={tab.label}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {sidebarOpen && <span>{tab.label}</span>}
                </button>
              )
            })}
          </div>
        </nav>

        <Separator />

        {/* Bottom actions */}
        <div className="p-3 flex flex-col gap-2">
          <Link
            href="/"
            target="_blank"
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground ${
              !sidebarOpen ? "justify-center" : ""
            }`}
            title="Voir le site"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Voir le site</span>}
          </Link>
          <button
            type="button"
            onClick={handleReset}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive ${
              !sidebarOpen ? "justify-center" : ""
            }`}
            title="Reinitialiser"
          >
            <RotateCcw className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Reinitialiser</span>}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          type="button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 items-center justify-center border-t border-border text-muted-foreground transition-colors hover:text-foreground"
          aria-label={sidebarOpen ? "Replier le menu" : "Deplier le menu"}
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div>
            <h1 className="text-lg font-bold text-card-foreground font-mono">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-muted-foreground">
              Modifier le contenu de cette section
            </p>
          </div>
          <Button
            onClick={handleSave}
            className={`gap-2 transition-all ${
              saveFlash ? "bg-accent text-accent-foreground" : ""
            }`}
          >
            <Save className="h-4 w-4" />
            {saveFlash ? "Sauvegarde !" : "Sauvegarder"}
          </Button>
        </header>

        {/* Tab content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "hero" && (
            <AdminHeroTab data={data} setData={setData} />
          )}
          {activeTab === "services" && (
            <AdminServicesTab data={data} setData={setData} />
          )}
          {activeTab === "about" && (
            <AdminAboutTab data={data} setData={setData} />
          )}
          {activeTab === "process" && (
            <AdminProcessTab data={data} setData={setData} />
          )}
          {activeTab === "projects" && (
            <AdminProjectsTab data={data} setData={setData} />
          )}
          {activeTab === "team" && (
            <AdminTeamTab data={data} setData={setData} />
          )}
          {activeTab === "contact" && (
            <AdminContactTab data={data} setData={setData} />
          )}
          {activeTab === "messages" && (
            <AdminMessagesTab />
          )}
        </main>
      </div>
    </div>
  )
}
