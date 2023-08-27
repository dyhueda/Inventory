import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inventory',
  description: 'Inventory app for restaurants',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='bg-slate-800 text-gray-200 min-h-screen'>
          <Header/>
        {children}
        </div>
        </body>
    </html>
  )
}
