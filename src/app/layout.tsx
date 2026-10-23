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
  metadataBase: new URL((process.env.NEXT_PUBLIC_SITE_URL ?? 'https://leonlee.dev')),
  title: "Leon Lee",
  description: "Software Engineering Student",
  openGraph: {
    title: "Leon Lee",
    description: "Leon Lee - Software Engineering Student",
    url: "https://leonlee.dev",
    images: ["/images/CherryTreeGlyph.png"],
  },
  twitter: {
    card: "summary",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} bg-black text-white antialiased`}>
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="min-h-dvh">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}