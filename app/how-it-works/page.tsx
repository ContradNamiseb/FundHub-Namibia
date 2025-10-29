import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function HowItWorksPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">How it Works</h1>
          <p className="text-gray-600 mb-6">Explanation of how the platform works. Placeholder content for now.</p>
          <Link href="/" className="text-indigo-600 hover:underline">Return home</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
