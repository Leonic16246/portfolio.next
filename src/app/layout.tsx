import Navbar from '../components/navbar/navbar'
import ThemeProvider from '../components/themeprovider/themeprovider'
import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-800 dark:bg-gray-100 text-gray-900 dark:text-gray-200">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  )
}