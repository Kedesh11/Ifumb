"use client"

import Image from "next/image"
import {
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
  Globe,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

interface Skill {
  name: string
  level: number
}

interface Experience {
  role: string
  company: string
  period: string
  description: string
}

interface Founder {
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

const founders: Founder[] = [
  {
    name: "Fondateur 1",
    role: "CEO & Co-fondateur",
    description:
      "Visionnaire et strategiste, il pilote la direction globale d'IFUMB et veille a l'alignement entre innovation technologique et besoins clients.",
    image: "/images/founder-1.jpg",
    linkedin: "#",
    twitter: "#",
    email: "ceo@ifumb.com",
    bio: "Entrepreneur passionne par la transformation digitale en Afrique, il a fonde IFUMB avec la conviction que la technologie est le levier le plus puissant pour accelerer le developpement. Fort de plusieurs annees d'experience en strategie d'entreprise et en gestion de projets technologiques, il guide l'equipe vers des solutions a fort impact.",
    education: "Master en Management & Innovation Digitale",
    location: "Kinshasa, RDC",
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
          "Accompagnement de PME dans leur transformation numerique et optimisation des processus.",
      },
      {
        role: "Chef de Projet IT",
        company: "TechCorp Africa",
        period: "2019 - 2021",
        description:
          "Gestion d'equipes pluridisciplinaires et livraison de solutions digitales pour le secteur bancaire.",
      },
    ],
    projects: [
      {
        title: "Plateforme E-Gov",
        description:
          "Conception d'une plateforme de services publics numeriques facilitant l'acces aux demarches administratives.",
        tags: ["Strategie", "GovTech", "UX"],
        link: "#",
      },
      {
        title: "IFUMB Academy",
        description:
          "Lancement d'un programme de formation interne pour developper les talents tech locaux.",
        tags: ["Formation", "EdTech", "Leadership"],
      },
      {
        title: "FinTech Connect",
        description:
          "Mise en place d'une solution de paiement mobile pour les marches informels.",
        tags: ["FinTech", "Mobile", "Inclusion"],
        link: "#",
      },
    ],
    skills: [
      { name: "Strategie & Vision Produit", level: 95 },
      { name: "Leadership & Management", level: 90 },
      { name: "Business Development", level: 92 },
      { name: "Gestion de Projet Agile", level: 85 },
      { name: "Communication & Networking", level: 88 },
    ],
    certifications: [
      "Certified Scrum Product Owner (CSPO)",
      "Google Project Management Certificate",
      "Design Thinking - IDEO",
    ],
  },
  {
    name: "Fondateur 2",
    role: "CTO & Co-fondateur",
    description:
      "Expert en genie logiciel et cybersecurite, il dirige l'architecture technique et garantit l'excellence de nos solutions.",
    image: "/images/founder-2.jpg",
    linkedin: "#",
    twitter: "#",
    email: "cto@ifumb.com",
    bio: "Ingenieur logiciel et specialiste en cybersecurite, il concoit les architectures techniques d'IFUMB avec un souci constant de performance, de securite et de scalabilite. Sa maitrise des technologies modernes et sa rigueur font de lui le garant de l'excellence technique de chaque projet.",
    education: "Ingenieur en Informatique & Cybersecurite",
    location: "Kinshasa, RDC",
    experience: [
      {
        role: "CTO & Co-fondateur",
        company: "IFUMB",
        period: "2023 - Present",
        description:
          "Architecture technique, securite des systemes et supervision du developpement logiciel.",
      },
      {
        role: "Ingenieur Cybersecurite",
        company: "CyberShield Labs",
        period: "2020 - 2023",
        description:
          "Audits de securite, tests de penetration et mise en conformite des systemes d'information.",
      },
      {
        role: "Developpeur Full-Stack",
        company: "DevStudio",
        period: "2018 - 2020",
        description:
          "Conception et developpement d'applications web et mobiles pour des clients internationaux.",
      },
    ],
    projects: [
      {
        title: "SecureVault",
        description:
          "Systeme de gestion securisee des donnees sensibles avec chiffrement de bout en bout.",
        tags: ["Cybersecurite", "Chiffrement", "Backend"],
        link: "#",
      },
      {
        title: "API Gateway IFUMB",
        description:
          "Architecture microservices et gateway API pour orchestrer l'ensemble des services IFUMB.",
        tags: ["Microservices", "DevOps", "Cloud"],
      },
      {
        title: "PenTest Toolkit",
        description:
          "Suite d'outils internes pour l'audit de securite et le hacking ethique.",
        tags: ["Hacking Ethique", "Python", "Securite"],
        link: "#",
      },
    ],
    skills: [
      { name: "Architecture Logicielle", level: 95 },
      { name: "Cybersecurite & Hacking Ethique", level: 92 },
      { name: "Cloud & DevOps", level: 88 },
      { name: "Python / TypeScript / Go", level: 90 },
      { name: "Base de Donnees & Data", level: 85 },
    ],
    certifications: [
      "Certified Ethical Hacker (CEH)",
      "AWS Solutions Architect Associate",
      "CompTIA Security+",
    ],
  },
  {
    name: "Fondateur 3",
    role: "COO & Co-fondateur",
    description:
      "Specialiste en strategie digitale et management, il orchestre les operations et cultive les partenariats strategiques.",
    image: "/images/founder-3.jpg",
    linkedin: "#",
    twitter: "#",
    email: "coo@ifumb.com",
    bio: "Passionne par le marketing digital et la communication strategique, il est le moteur operationnel d'IFUMB. Il assure que chaque projet est livre dans les temps, dans le budget et avec le plus grand impact. Sa capacite a creer des ponts entre technique et business est un atout majeur pour l'equipe.",
    education: "Master en Marketing Digital & Communication",
    location: "Kinshasa, RDC",
    experience: [
      {
        role: "COO & Co-fondateur",
        company: "IFUMB",
        period: "2023 - Present",
        description:
          "Operations, partenariats, marketing digital et gestion de la relation client.",
      },
      {
        role: "Responsable Marketing Digital",
        company: "DigiWave Agency",
        period: "2020 - 2023",
        description:
          "Strategie de contenu, SEO/SEA, campagnes social media et generation de leads.",
      },
      {
        role: "Charge de Communication",
        company: "ONG TechForAll",
        period: "2018 - 2020",
        description:
          "Communication institutionnelle et sensibilisation a l'inclusion numerique.",
      },
    ],
    projects: [
      {
        title: "IFUMB Brand Identity",
        description:
          "Creation de l'identite visuelle complete d'IFUMB : logo, charte graphique, site web et supports de communication.",
        tags: ["Branding", "Design", "Communication"],
      },
      {
        title: "Campagne Lead Gen",
        description:
          "Strategie d'acquisition digitale ayant genere +200 leads qualifies en 3 mois pour les services IFUMB.",
        tags: ["Marketing", "SEO", "Ads"],
        link: "#",
      },
      {
        title: "Dashboard Analytics",
        description:
          "Tableau de bord de suivi des KPIs operations et marketing pour piloter la performance.",
        tags: ["Data", "Analytics", "BI"],
        link: "#",
      },
    ],
    skills: [
      { name: "Marketing Digital & SEO", level: 94 },
      { name: "Gestion des Operations", level: 90 },
      { name: "Communication Strategique", level: 92 },
      { name: "Gestion de Partenariats", level: 88 },
      { name: "Analyse de Donnees", level: 82 },
    ],
    certifications: [
      "Google Ads Certification",
      "HubSpot Inbound Marketing",
      "Meta Blueprint - Social Media Marketing",
    ],
  },
]

function FounderPortfolio({ founder, open, onOpenChange }: { founder: Founder; open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header with photo and info */}
        <div className="relative">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
          <div className="px-6 pb-4">
            <div className="flex flex-col sm:flex-row gap-4 -mt-14">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border-4 border-card shadow-lg">
                <Image
                  src={founder.image}
                  alt={`Portrait de ${founder.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 pt-2 sm:pt-6">
                <DialogHeader className="text-left">
                  <DialogTitle className="text-2xl font-bold font-mono text-foreground">
                    {founder.name}
                  </DialogTitle>
                  <DialogDescription className="text-base font-medium text-primary">
                    {founder.role}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5" />
                    {founder.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {founder.education}
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <a
                    href={founder.linkedin}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={`LinkedIn de ${founder.name}`}
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={founder.twitter}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={`Twitter de ${founder.name}`}
                  >
                    <Twitter className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    aria-label={`Email de ${founder.name}`}
                  >
                    <Mail className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Tabs */}
        <div className="px-6 pb-6">
          <Tabs defaultValue="profil" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="profil" className="flex-1">Profil</TabsTrigger>
              <TabsTrigger value="projets" className="flex-1">Projets</TabsTrigger>
              <TabsTrigger value="competences" className="flex-1">Competences</TabsTrigger>
            </TabsList>

            {/* Profil Tab */}
            <TabsContent value="profil" className="mt-6">
              <div className="space-y-6">
                <div>
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                    A propos
                  </h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {founder.bio}
                  </p>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
                    <Briefcase className="h-4 w-4" />
                    Experience
                  </h4>
                  <div className="space-y-4">
                    {founder.experience.map((exp) => (
                      <div key={exp.role + exp.company} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-primary">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
                          <h5 className="text-sm font-semibold text-foreground">{exp.role}</h5>
                          <span className="text-xs text-muted-foreground">{exp.period}</span>
                        </div>
                        <p className="text-xs font-medium text-primary/80">{exp.company}</p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-primary">
                    <Award className="h-4 w-4" />
                    Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {founder.certifications.map((cert) => (
                      <Badge key={cert} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Projets Tab */}
            <TabsContent value="projets" className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {founder.projects.map((project) => (
                  <div
                    key={project.title}
                    className="group flex flex-col rounded-xl border border-border bg-secondary/30 p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                  >
                    <h5 className="mb-2 text-sm font-bold text-foreground font-mono">
                      {project.title}
                    </h5>
                    <p className="mb-4 flex-1 text-xs leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Voir le projet
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Competences Tab */}
            <TabsContent value="competences" className="mt-6">
              <div className="space-y-5">
                {founder.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs font-semibold text-primary">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function TeamSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="equipe" ref={sectionRef} className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            Notre equipe
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-mono text-balance">
            Les visages derriere IFUMB
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
            Trois co-fondateurs passionnes, unis par une vision commune :
            democratiser l{"'"}innovation numerique.
          </p>
        </div>

        {/* Team cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-700 hover:shadow-xl hover:shadow-primary/5 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Photo - clickable */}
              <button
                type="button"
                onClick={() => setSelectedFounder(founder)}
                className="relative block w-full aspect-[4/5] overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`Voir le portfolio de ${founder.name}`}
              >
                <Image
                  src={founder.image}
                  alt={`Portrait de ${founder.name}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-primary/0 transition-all duration-300 group-hover:bg-primary/20">
                  <span className="translate-y-4 rounded-full bg-card/90 px-4 py-2 text-sm font-medium text-foreground opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Voir le portfolio
                  </span>
                </div>

                {/* Info on image */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-primary-foreground font-mono">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-medium text-accent">
                    {founder.role}
                  </p>
                </div>
              </button>

              {/* Description */}
              <div className="p-6">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {founder.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-3">
                    <a
                      href={founder.linkedin}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label={`LinkedIn de ${founder.name}`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={founder.twitter}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label={`Twitter de ${founder.name}`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFounder(founder)}
                    className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Portfolio &rarr;
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Modal */}
      {selectedFounder && (
        <FounderPortfolio
          founder={selectedFounder}
          open={!!selectedFounder}
          onOpenChange={(open) => {
            if (!open) setSelectedFounder(null)
          }}
        />
      )}
    </section>
  )
}
