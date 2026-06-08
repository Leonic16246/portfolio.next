import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import "./globals.css";

export const metadata: Metadata = {
  title: "Leon Lee - Software Engineer",
  description: "Portfolio of Leon Lee, software engineering student",
  openGraph: {
    title: "Leon Lee - Software Engineer",
    description: "Software engineering student & software developer.",
    url: "https://leonlee.dev",
    images: ["/images/CherryTreeGlyph.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} bg-white dark:bg-black text-black dark:text-white pt-16 antialiased`}>
        <Header />
          <main className="min-h-screen">{children}</main> 
        <Footer />
      </body>
    </html>
  )
}