'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState('')
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data, error } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (data) {
        setProfile(data)
        setFullName(data.full_name || '')
      } else {
        // Create a profile if it doesn't exist
        setProfile({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata.full_name || null,
          avatar_url: null,
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdateProfile() {
    if (!profile) return

    setLoading(true)
    try {
      const { error } = await (supabase as any)
        .from('profiles')
        .update({ full_name: fullName })
        .eq('id', profile.id)

      if (error) throw error

      setProfile({ ...profile, full_name: fullName })
      setEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
          <div className="text-2xl text-gray-500 dark:text-slate-400">
            Loading...
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-slate-100">
            My Profile
          </h1>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-orange-500 dark:to-red-600 h-32"></div>

            <div className="px-8 pb-8">
              <div className="flex items-end gap-6 -mt-16 mb-8">
                <div className="w-32 h-32 bg-gray-300 dark:bg-slate-700 rounded-full border-4 border-white dark:border-slate-800 flex items-center justify-center text-5xl">
                  {profile?.full_name?.[0]?.toUpperCase() || '👤'}
                </div>
                <div className="pb-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    {profile?.full_name || 'User'}
                  </h2>
                  <p className="text-gray-600 dark:text-slate-400">
                    {profile?.email}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                    Account Information
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Full Name
                      </label>
                      {editing ? (
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                        />
                      ) : (
                        <p className="px-4 py-3 bg-gray-50 dark:bg-slate-900 rounded-lg text-gray-900 dark:text-slate-100">
                          {profile?.full_name || 'Not set'}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <p className="px-4 py-3 bg-gray-50 dark:bg-slate-900 rounded-lg text-gray-900 dark:text-slate-100">
                        {profile?.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    {editing ? (
                      <>
                        <button
                          onClick={handleUpdateProfile}
                          disabled={loading}
                          className="px-6 py-3 bg-indigo-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-colors disabled:opacity-50"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => {
                            setEditing(false)
                            setFullName(profile?.full_name || '')
                          }}
                          className="px-6 py-3 bg-gray-500 dark:bg-slate-700 text-white rounded-lg font-semibold hover:bg-gray-600 dark:hover:bg-slate-600 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setEditing(true)}
                        className="px-6 py-3 bg-indigo-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-colors"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                    My Projects
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-4">
                    You haven't created any projects yet.
                  </p>
                  <button onClick={() => router.push('/start-project')} className="px-6 py-3 bg-green-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-orange-600 transition-colors">
                    Create a Project
                  </button>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                    Backed Projects
                  </h3>
                  <p className="text-gray-600 dark:text-slate-400">
                    You haven't backed any projects yet.
                  </p>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg font-semibold hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

