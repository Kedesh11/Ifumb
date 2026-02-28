"use client"

import { useState, useEffect, useCallback } from "react"
import { SiteService } from "./services/site-service"

// ─── Types ──────────────────────────────────────────────────────

export interface HeroData {
  badge: string
  title: string
  titleAccent: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  stats: { value: string; label: string }[]
  backgroundImage: string
}

export interface ServiceItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface ValueItem {
  id: string
  icon: string
  title: string
  description: string
}

export interface AboutData {
  title: string
  subtitle: string
  paragraph1: string
  paragraph2: string
  values: ValueItem[]
}

export interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
}

export interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
  image?: string
}

export interface ProjectItem {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

export interface Skill {
  name: string
  level: number
}

export interface Experience {
  role: string
  company: string
  period: string
  description: string
}

export interface Founder {
  id: string
  name: string
  role: string
  description: string
  image: string
  linkedin: string
  twitter: string
  email: string
  bio: string
  education: string
  location: string
  experience: Experience[]
  projects: Project[]
  skills: Skill[]
  certifications: string[]
}

export interface ContactData {
  email: string
  phone: string
  address: string
  urgentTitle: string
  urgentText: string
}

export interface SiteData {
  hero: HeroData
  services: ServiceItem[]
  about: AboutData
  process: ProcessStep[]
  founders: Founder[]
  contact: ContactData
  projects: ProjectItem[]
}

// ─── Defaults ───────────────────────────────────────────────────

export const defaultSiteData: SiteData = {
  hero: {
    badge: "Solutions numeriques innovantes",
    title: "Votre partenaire",
    titleAccent: "digital",
    subtitle:
      "IFUMB accompagne les entreprises et les institutions dans leur transformation numerique avec expertise, innovation et engagement.",
    ctaPrimary: "Decouvrir nos services",
    ctaSecondary: "Parlons de votre projet",
    stats: [
      { value: "50+", label: "Projets livres" },
      { value: "30+", label: "Clients satisfaits" },
      { value: "3", label: "Co-fondateurs" },
      { value: "7+", label: "Expertises" },
    ],
    backgroundImage: "/images/hero-bg.jpg",
  },
  services: [
    {
      id: "s1",
      icon: "Code2",
      title: "Genie logiciel",
      description:
        "Conception, developpement et deploiement d'applications robustes et evolutives adaptees a vos besoins metier.",
    },
    {
      id: "s2",
      icon: "ShieldCheck",
      title: "Hacking ethique",
      description:
        "Audits de securite, tests de penetration et conseil en cybersecurite pour proteger vos systemes et donnees.",
    },
    {
      id: "s3",
      icon: "BarChart3",
      title: "Conseil en digitalisation",
      description:
        "Accompagnement strategique pour reussir votre transformation numerique et optimiser vos processus.",
    },
    {
      id: "s4",
      icon: "BrainCircuit",
      title: "Data & Intelligence Artificielle",
      description:
        "Exploitation de vos donnees et integration de solutions IA pour un avantage concurrentiel decisif.",
    },
    {
      id: "s5",
      icon: "Megaphone",
      title: "Communication & Marketing Digital",
      description:
        "Strategies digitales, creation de contenu et campagnes performantes pour accroitre votre visibilite.",
    },
    {
      id: "s6",
      icon: "Globe",
      title: "Developpement Web",
      description:
        "Sites vitrines, plateformes e-commerce et applications web modernes, performantes et SEO-friendly.",
    },
    {
      id: "s7",
      icon: "Layers",
      title: "Autres services sur demande",
      description:
        "Formation, maintenance, integration de systemes et solutions personnalisees selon vos exigences specifiques.",
    },
  ],
  about: {
    title: "La technologie au service de votre ambition",
    subtitle: "A propos",
    paragraph1:
      "IFUMB est une startup specialisee dans le developpement de solutions numeriques. Fondee par trois passionnes de technologie, notre mission est d'accompagner les entreprises, institutions publiques et partenaires dans leur transformation digitale.",
    paragraph2:
      "De la conception logicielle a la cybersecurite, en passant par l'intelligence artificielle et le marketing digital, nous offrons une expertise pluridisciplinaire pour repondre aux defis du monde numerique.",
    values: [
      {
        id: "v1",
        icon: "Lightbulb",
        title: "Innovation",
        description:
          "Nous repoussons les limites de la technologie pour creer des solutions d'avant-garde.",
      },
      {
        id: "v2",
        icon: "Target",
        title: "Excellence",
        description:
          "Chaque projet est traite avec rigueur, precision et un souci constant de qualite.",
      },
      {
        id: "v3",
        icon: "Users",
        title: "Collaboration",
        description:
          "Nous croyons en la force du partenariat et du travail d'equipe avec nos clients.",
      },
      {
        id: "v4",
        icon: "Eye",
        title: "Transparence",
        description:
          "Communication ouverte, suivi regulier et integrite dans chacune de nos missions.",
      },
    ],
  },
  process: [
    {
      id: "p1",
      number: "01",
      title: "Ecoute & Analyse",
      description:
        "Nous prenons le temps de comprendre votre contexte, vos objectifs et vos contraintes pour definir la meilleure approche.",
    },
    {
      id: "p2",
      number: "02",
      title: "Conception & Strategie",
      description:
        "Nous elaborons une strategie sur mesure et concevons l'architecture de votre solution avec precision.",
    },
    {
      id: "p3",
      number: "03",
      title: "Developpement & Integration",
      description:
        "Notre equipe developpe votre solution avec les meilleures technologies, en respectant les standards de qualite.",
    },
    {
      id: "p4",
      number: "04",
      title: "Deploiement & Suivi",
      description:
        "Nous deployon, testons et assurons le suivi post-livraison pour garantir la perennite de votre solution.",
    },
  ],
  founders: [
    {
      id: "f1",
      name: "Fondateur 1",
      role: "CEO & Co-fondateur",
      description:
        "Visionnaire et strategiste, il pilote la direction globale d'IFUMB et veille a l'alignement entre innovation technologique et besoins clients.",
      image: "/images/founder-1.jpg",
      linkedin: "#",
      twitter: "#",
      email: "ceo@ifumb.com",
      bio: "Entrepreneur passionne par la transformation digitale en Afrique, il a fonde IFUMB avec la conviction que la technologie est le levier le plus puissant pour accelerer le developpement.",
      education: "Master en Management & Innovation Digitale",
      location: "Libreville, Gabon",
      experience: [
        {
          role: "CEO & Co-fondateur",
          company: "IFUMB",
          period: "2023 - Present",
          description:
            "Direction strategique, developpement commercial et partenariats institutionnels.",
        },
        {
          role: "Consultant en Strategie Digitale",
          company: "Cabinet Independant",
          period: "2021 - 2023",
          description:
            "Accompagnement de PME dans leur transformation numerique.",
        },
      ],
      projects: [
        {
          title: "Plateforme E-Gov",
          description:
            "Conception d'une plateforme de services publics numeriques.",
          tags: ["Strategie", "GovTech", "UX"],
          link: "#",
        },
        {
          title: "IFUMB Academy",
          description:
            "Programme de formation pour developper les talents tech locaux.",
          tags: ["Formation", "EdTech", "Leadership"],
        },
      ],
      skills: [
        { name: "Strategie & Vision Produit", level: 95 },
        { name: "Leadership & Management", level: 90 },
        { name: "Business Development", level: 92 },
        { name: "Gestion de Projet Agile", level: 85 },
      ],
      certifications: [
        "Certified Scrum Product Owner (CSPO)",
        "Google Project Management Certificate",
      ],
    },
    {
      id: "f2",
      name: "Fondateur 2",
      role: "CTO & Co-fondateur",
      description:
        "Expert en genie logiciel et cybersecurite, il dirige l'architecture technique et garantit l'excellence de nos solutions.",
      image: "/images/founder-2.jpg",
      linkedin: "#",
      twitter: "#",
      email: "cto@ifumb.com",
      bio: "Ingenieur logiciel et specialiste en cybersecurite, il concoit les architectures techniques d'IFUMB avec un souci constant de performance et securite.",
      education: "Ingenieur en Informatique & Cybersecurite",
      location: "Libreville, Gabon",
      experience: [
        {
          role: "CTO & Co-fondateur",
          company: "IFUMB",
          period: "2023 - Present",
          description:
            "Architecture technique, securite des systemes et supervision du developpement.",
        },
        {
          role: "Ingenieur Cybersecurite",
          company: "CyberShield Labs",
          period: "2020 - 2023",
          description:
            "Audits de securite, tests de penetration et conformite.",
        },
      ],
      projects: [
        {
          title: "SecureVault",
          description:
            "Systeme de gestion securisee des donnees sensibles avec chiffrement.",
          tags: ["Cybersecurite", "Chiffrement", "Backend"],
          link: "#",
        },
        {
          title: "API Gateway IFUMB",
          description:
            "Architecture microservices et gateway API pour les services IFUMB.",
          tags: ["Microservices", "DevOps", "Cloud"],
        },
      ],
      skills: [
        { name: "Architecture Logicielle", level: 95 },
        { name: "Cybersecurite & Hacking Ethique", level: 92 },
        { name: "Cloud & DevOps", level: 88 },
        { name: "Python / TypeScript / Go", level: 90 },
      ],
      certifications: [
        "Certified Ethical Hacker (CEH)",
        "AWS Solutions Architect Associate",
      ],
    },
    {
      id: "f3",
      name: "Fondateur 3",
      role: "COO & Co-fondateur",
      description:
        "Specialiste en strategie digitale et management, il orchestre les operations et cultive les partenariats strategiques.",
      image: "/images/founder-3.jpg",
      linkedin: "#",
      twitter: "#",
      email: "coo@ifumb.com",
      bio: "Passionne par le marketing digital et la communication strategique, il est le moteur operationnel d'IFUMB.",
      education: "Master en Marketing Digital & Communication",
      location: "Libreville, Gabon",
      experience: [
        {
          role: "COO & Co-fondateur",
          company: "IFUMB",
          period: "2023 - Present",
          description:
            "Operations, partenariats, marketing digital et relation client.",
        },
        {
          role: "Responsable Marketing Digital",
          company: "DigiWave Agency",
          period: "2020 - 2023",
          description:
            "Strategie de contenu, SEO/SEA, campagnes social media.",
        },
      ],
      projects: [
        {
          title: "IFUMB Brand Identity",
          description:
            "Creation de l'identite visuelle complete d'IFUMB.",
          tags: ["Branding", "Design", "Communication"],
        },
        {
          title: "Campagne Lead Gen",
          description:
            "Strategie d'acquisition ayant genere +200 leads qualifies en 3 mois.",
          tags: ["Marketing", "SEO", "Ads"],
          link: "#",
        },
      ],
      skills: [
        { name: "Marketing Digital & SEO", level: 94 },
        { name: "Gestion des Operations", level: 90 },
        { name: "Communication Strategique", level: 92 },
        { name: "Gestion de Partenariats", level: 88 },
      ],
      certifications: [
        "Google Ads Certification",
        "HubSpot Inbound Marketing",
      ],
    },
  ],
  contact: {
    email: "ifumbgabon3@gmail.com",
    phone: "077172820",
    address: "Libreville, Gabon",
    urgentTitle: "Besoin urgent ?",
    urgentText:
      "Appelez-nous directement ou envoyez un email pour une reponse rapide.",
  },
  projects: [
    {
      id: "p1",
      title: "Plateforme E-Gov",
      description: "Une solution complète de gouvernance électronique pour moderniser les services publics.",
      image: "/images/project-1.jpg",
      tags: ["Next.js", "Supabase", "GovTech"],
      link: "#",
    },
    {
      id: "p2",
      title: "FinTech Connect",
      description: "Application mobile de microfinance facilitant l'accès au crédit pour les entrepreneurs locaux.",
      image: "/images/project-2.jpg",
      tags: ["React Native", "Node.js", "FinTech"],
      link: "#",
    },
    {
      id: "p3",
      title: "EduCloud RDC",
      description: "Plateforme d'apprentissage en ligne destinée aux universités et centres de formation.",
      image: "/images/project-3.jpg",
      tags: ["LMS", "Cloud", "Education"],
      link: "#",
    },
  ],
}

// ─── LocalStorage key ───────────────────────────────────────────

const STORAGE_KEY = "ifumb-site-data"

function loadData(): SiteData {
  if (typeof window === "undefined") return defaultSiteData
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultSiteData
    return { ...defaultSiteData, ...JSON.parse(raw) }
  } catch {
    return defaultSiteData
  }
}

function saveData(data: SiteData) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage full or unavailable
  }
}

// ─── Hook ───────────────────────────────────────────────────────

export function useSiteData() {
  const [data, setDataState] = useState<SiteData>(defaultSiteData)
  const [isLoaded, setIsLoaded] = useState(false)

  // Initial load from LocalStorage (sync) and Supabase (async)
  useEffect(() => {
    const localData = loadData()
    setDataState(localData)
    
    // Sync from Supabase in background
    const syncFromBackend = async () => {
      const backendData = await SiteService.getSiteData()
      if (backendData) {
        saveData(backendData) // Update LocalStorage
        setDataState(backendData)
      }
      setIsLoaded(true)
    }

    syncFromBackend()
  }, [])

  // Listen for storage changes from other tabs/components
  useEffect(() => {
    const handler = () => {
      setDataState(loadData())
    }
    window.addEventListener("storage", handler)
    // Custom event for same-tab updates
    window.addEventListener("site-data-updated", handler)
    return () => {
      window.removeEventListener("storage", handler)
      window.removeEventListener("site-data-updated", handler)
    }
  }, [])

  const setData = useCallback(
    (updater: SiteData | ((prev: SiteData) => SiteData)) => {
      setDataState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater
        
        // 1. Update LocalStorage for immediate local feel
        saveData(next)
        
        // 2. Update Supabase in background
        SiteService.saveSiteData(next).then((success) => {
          if (!success) {
            console.error("Failed to sync data to Supabase")
          }
        })

        // 3. Dispatch custom event so other components pick it up
        window.dispatchEvent(new Event("site-data-updated"))
        
        return next
      })
    },
    []
  )

  const resetData = useCallback(async () => {
    // 1. Reset locally
    saveData(defaultSiteData)
    setDataState(defaultSiteData)
    window.dispatchEvent(new Event("site-data-updated"))

    // 2. Reset on backend
    await SiteService.resetToDefaults()
  }, [])

  return { data, setData, resetData, isLoaded }
}
