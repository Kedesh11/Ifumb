import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'IFUMB | Solutions Numeriques Innovantes',
  description:
    'IFUMB accompagne les entreprises et institutions dans leur transformation digitale. Genie logiciel, Hacking ethique, Data & IA, Conseil en digitalisation.',
  keywords: [
    'IFUMB',
    'solutions numeriques',
    'genie logiciel',
    'hacking ethique',
    'data',
    'intelligence artificielle',
    'digitalisation',
    'developpement web',
  ],
  openGraph: {
    title: 'IFUMB | Solutions Numeriques Innovantes',
    description:
      'IFUMB accompagne les entreprises et institutions dans leur transformation digitale.',
    type: 'website',
    locale: 'fr_FR',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a56db',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
