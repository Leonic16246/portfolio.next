import Header from '../components/header/header'
import Footer from '../components/footer/footer'
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-800 dark:bg-black text-neutral-900 dark:text-neutral-200">
        <Header />
          <main>{children}</main> 
        <Footer />
      </body>
    </html>
  )
}