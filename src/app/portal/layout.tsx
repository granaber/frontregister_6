import '../globals.css'
import { Inter } from 'next/font/google'
import { ContextProvider } from '@/context';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Portal de Pagos',
  description: 'Portal de pagos de Betgambler',
}

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ContextProvider>
        <body className={inter.className}>{children}</body>
      </ContextProvider >

    </html>
  )
}
