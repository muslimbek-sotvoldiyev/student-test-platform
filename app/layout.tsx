import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "O'quvchilar Test Platformasi",
  description: "O'quvchilar uchun test platformasi",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <a href="/" className="text-2xl font-bold">
                O'quvchilar Testi
              </a>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="/" className="hover:text-gray-600">
                      Bosh sahifa
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-gray-50 border-t py-6">
            <div className="container mx-auto px-4 text-center text-gray-500">
              &copy; {new Date().getFullYear()} O'quvchilar Test Platformasi
            </div>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  )
}
