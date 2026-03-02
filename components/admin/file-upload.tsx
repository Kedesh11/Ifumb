"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, X, FileText, Loader2, Download, Search, Image as ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteService } from "@/lib/services/site-service"
import Image from "next/image"
import { createWorker } from "tesseract.js"

interface Props {
  value?: string
  onChange: (url: string) => void
  onScan?: (text: string) => void
  label?: string
  className?: string
  accept?: string
}

export function FileUpload({ value, onChange, onScan, label, className = "", accept = "*" }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [isScanning, setIsScanning] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (value) {
      setPreviewUrl(value)
    } else {
      setPreviewUrl(null)
    }
  }, [value])

  const performOCR = async (file: File) => {
    if (!onScan) return
    
    // Only perform OCR on images for simplicity (Tesseract works best on images)
    if (!file.type.startsWith("image/")) return

    setIsScanning(true)
    try {
      const worker = await createWorker("fra") // French for this project
      const { data: { text } } = await worker.recognize(file)
      await worker.terminate()
      
      // Basic cleaning of scanned text
      const cleanedText = text
        .split("\n")
        .filter(line => line.trim().length > 3)
        .join("\n") // Keep newlines for better parsing in parent
        .slice(0, 500)
      
      onScan(cleanedText)
    } catch (error) {
      console.error("OCR Error:", error)
    } finally {
      setIsScanning(false)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 1. Local Preview & OCR
    const reader = new FileReader()
    reader.onload = (e) => setPreviewUrl(e.target?.result as string)
    reader.readAsDataURL(file)

    if (file.type.startsWith("image/")) {
      performOCR(file)
    }

    // 2. Upload to Supabase
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
      setPreviewUrl(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const isImage = (url: string) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i) || url.startsWith("data:image")
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        {label && <label className="text-sm font-medium text-foreground">{label}</label>}
        {isScanning && (
          <span className="flex items-center gap-1 text-[10px] text-primary animate-pulse">
            <Search className="h-3 w-3" />
            Analyse intelligente...
          </span>
        )}
      </div>
      
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border bg-muted/30 p-2 transition-colors hover:bg-muted/50">
        {previewUrl ? (
          <div className="w-full space-y-3">
            <div className="relative h-64 w-full overflow-hidden rounded-md border border-border bg-card">
              {isImage(previewUrl) ? (
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-contain p-1"
                />
              ) : previewUrl.includes(".pdf") || previewUrl.startsWith("data:application/pdf") ? (
                <iframe
                  src={previewUrl}
                  className="h-full w-full"
                  title="PDF Preview"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2">
                  <FileText className="h-10 w-10 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Aperçu non disponible</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="flex-1 overflow-hidden">
                {value && (
                  <a 
                    href={value} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                  >
                    <Download className="h-2.5 w-2.5" />
                    Lien direct
                  </a>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="h-7 px-2 text-[10px]"
              >
                <X className="h-3 w-3 mr-1" />
                Supprimer
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 text-center">
            <div className="mb-2 rounded-full bg-primary/10 p-3 text-primary">
              <Upload className="h-6 w-6" />
            </div>
            <p className="text-xs text-muted-foreground">
              {isUploading ? "Téléchargement..." : "Glissez un fichier ou cliquez pour choisir"}
            </p>
            <p className="mt-1 text-[10px] text-muted-foreground/60">
              PDF, JPG, PNG (Max 5MB)
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

        {!previewUrl && (
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
