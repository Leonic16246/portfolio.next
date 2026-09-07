import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import "./globals.css";

// Ship Font Awesome's CSS with the document instead of letting it inject at
// runtime, which makes icons paint at their unstyled size before snapping in.
config.autoAddCss = false

export const metadata: Metadata = {
  metadataBase: new URL((process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000')),
  title: "Leon Lee - Software Engineer",
  description: "Portfolio of Leon Lee",
  openGraph: {
    title: "Leon Lee - Software Engineer",
    description: "Software engineering student",
    url: "https://leonlee.dev",
    images: ["/images/CherryTreeGlyph.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} bg-black text-white pt-16 antialiased`}>
        <Header />
          <main className="min-h-screen">{children}</main> 
        <Footer />
      </body>
    </html>
  )
}