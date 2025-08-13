import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Betgamble-Registros',
  description: 'Bienvenido a BetGambler , la mejor plataforma de apuestas.',
}
export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
