"use client"

import { useState, useRef } from "react"
import { Upload, X, FileText, Loader2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteService } from "@/lib/services/site-service"

interface Props {
  value?: string
  onChange: (url: string) => void
  label?: string
  className?: string
  accept?: string
}

export function FileUpload({ value, onChange, label, className = "", accept = "*" }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const url = await SiteService.uploadFile(file)
    if (url) {
      onChange(url)
    } else {
      alert("Erreur lors du téléchargement du fichier.")
    }
    setIsUploading(false)
  }

  const handleRemove = () => {
    if (window.confirm("Supprimer ce fichier ?")) {
      onChange("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const getFileName = (url: string) => {
    try {
      const parts = url.split("/")
      const name = parts[parts.length - 1]
      // Remove the random prefix if possible (optional)
      return name.split("-").slice(1).join("-") || name
    } catch {
      return "Fichier"
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
        {value ? (
          <div className="flex w-full items-center justify-between rounded-md border border-border bg-card p-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">
                  {getFileName(value)}
                </p>
                <a 
                  href={value} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                >
                  <Download className="h-2 w-2" />
                  Voir le fichier
                </a>
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleRemove}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <div className="mb-2 rounded-full bg-primary/10 p-2 text-primary">
              <Upload className="h-5 w-5" />
            </div>
            <p className="text-xs text-muted-foreground">
              {isUploading ? "Téléchargement..." : "Aucun fichier sélectionné"}
            </p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept={accept}
          className="hidden"
        />

        {!value && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={isUploading}
            onClick={() => fileInputRef.current?.click()}
            className="gap-2"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            Choisir un fichier
          </Button>
        )}
      </div>
    </div>
  )
}
