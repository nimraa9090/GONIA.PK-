import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Goniaa Fashion | Luxury Minimalist Fashion',
  description: 'Luxury minimalist fashion shopping app for Goniaa Fashion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-primary">
        <nav className="border-b px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter">GONIAA</h1>
          <div className="space-x-6">
            <a href="/shop" className="hover:underline">Shop</a>
            <a href="/admin" className="hover:underline">Admin</a>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-20 px-6 py-10 text-center text-sm text-gray-500">
          &copy; 2026 Goniaa Fashion. All rights reserved.
        </footer>
      </body>
    </html>
  )
}
