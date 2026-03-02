import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} bg-neutral-800 dark:bg-black text-neutral-900 dark:text-neutral-200 pt-16`}>
        <Header />
          <main className="min-h-screen">{children}</main> 
        <Footer />
      </body>
    </html>
  )
}