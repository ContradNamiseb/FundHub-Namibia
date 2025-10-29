"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (user) {
      setError('You are already signed in')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push('/profile')
    } catch (error: any) {
      setError(error.message || 'Failed to log in')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then((res: any) => {
      if (!mounted) return
      setUser(res?.data?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setUser(session?.user ?? null)
    })

    return () => {
      mounted = false
      try {
        listener?.subscription?.unsubscribe()
      } catch (e) {}
    }
  }, [])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border dark:border-slate-700">
            <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-slate-100">
              Welcome Back
            </h2>
            <p className="text-center text-gray-600 dark:text-slate-400 mb-8">
              Log in to your CrowdFund Hub account
            </p>

            {error && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 dark:text-orange-500 border-gray-300 dark:border-slate-600 rounded focus:ring-indigo-500 dark:focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-slate-300">
                    Remember me
                  </span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-indigo-600 dark:text-orange-500 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 dark:bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-slate-400">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="text-indigo-600 dark:text-orange-500 font-semibold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
              <p className="text-center text-gray-600 dark:text-slate-400 mb-4">
                Or continue with
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

