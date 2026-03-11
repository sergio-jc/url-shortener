import type { Metadata } from "next"

import { Geist, Geist_Mono } from "next/font/google"

import { Toaster } from "@/src/components/ui/sonner"

import { ThemeProvider } from "../components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "URL Shortener",
  description:
    "Create short, memorable links with our fast and secure URL Shortener. Instantly shrink long URLs, manage your links, and track detailed analytics to boost your sharing—perfect for businesses, marketers, and personal use.",
  openGraph: {
    images: [
      {
        url: "https://k7q988masp.ufs.sh/f/ECXGYKWdB6RA26DOwTdbI6MZ1DFPOQcoyahfG9XNpxvAKW0d",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://k7q988masp.ufs.sh/f/ECXGYKWdB6RA26DOwTdbI6MZ1DFPOQcoyahfG9XNpxvAKW0d"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          defaultTheme="system"
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
