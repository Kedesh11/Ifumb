"use client"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteService } from "@/lib/services/site-service"
import Image from "next/image"

interface Props {
  value: string
  onChange: (url: string) => void
  label?: string
  className?: string
}

export function ImageUpload({ value, onChange, label, className = "" }: Props) {
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
      alert("Erreur lors du téléchargement de l'image.")
    }
    setIsUploading(false)
  }

  const handleRemove = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}
      
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
        {value ? (
          <div className="group relative h-40 w-full overflow-hidden rounded-md border border-border">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={handleRemove}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
              <ImageIcon className="h-6 w-6" />
            </div>
            <p className="text-xs text-muted-foreground">
              {isUploading ? "Téléchargement..." : "Aucune image sélectionnée"}
            </p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          accept="image/*"
          className="hidden"
        />

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
          {value ? "Changer l'image" : "Choisir une image"}
        </Button>
      </div>
    </div>
  )
}
