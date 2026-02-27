import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "IFUMB Admin | Dashboard",
  description: "Panneau d'administration du site IFUMB",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
