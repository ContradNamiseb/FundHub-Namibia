'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (error) throw error

      // Redirect to login or show success message
      alert('Account created! Please check your email to verify your account.')
      router.push('/login')
    } catch (error: any) {
      setError(error.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border dark:border-slate-700">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-slate-100">
              Create Account
            </h2>
            <p className="text-center text-gray-600 dark:text-slate-400 mb-8">
              Join CrowdFund Hub today
            </p>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-6">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  required
                  className="w-4 h-4 mt-1 text-indigo-600 dark:text-orange-500 border-gray-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:focus:ring-orange-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-slate-300">
                  I agree to the{' '}
                  <Link href="/terms" className="text-indigo-600 dark:text-orange-500 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-indigo-600 dark:text-orange-500 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 dark:bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-slate-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-indigo-600 dark:text-orange-500 font-semibold hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
              <p className="text-center text-gray-600 dark:text-slate-400 mb-4">
                Or sign up with
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="text-xl">🔍</span>
                  <span className="font-medium text-gray-700 dark:text-slate-300">
                    Google
                  </span>
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <span className="text-xl">🐙</span>
                  <span className="font-medium text-gray-700 dark:text-slate-300">
                    GitHub
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

