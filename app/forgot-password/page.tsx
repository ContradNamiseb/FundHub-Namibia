import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Reset your password</h1>
          <p className="text-gray-600 mb-6">Password reset flow placeholder. We'll send an email with instructions.</p>
          <Link href="/login" className="text-indigo-600 hover:underline">Back to login</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
