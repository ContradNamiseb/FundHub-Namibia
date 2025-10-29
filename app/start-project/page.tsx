"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/client'

export default function StartProjectPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('🚀')
  const [goal, setGoal] = useState('')
  const [daysLeft, setDaysLeft] = useState('30')
  const [category, setCategory] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const { data } = await supabase.from('categories').select('name')
        if (!mounted) return
        setCategories((data as any[]).map((c) => c.name))
        if (data && data.length > 0) setCategory((data as any)[0].name)
      } catch (e) {
        // ignore
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description,
          icon,
          goal,
          days_left: daysLeft,
          category,
        }),
      })

      // Parse response safely — handle non-JSON errors
      let json: any = null
      const ct = res.headers.get('content-type') || ''
      if (ct.includes('application/json')) {
        json = await res.json()
      } else {
        const text = await res.text()
        if (!res.ok) {
          if (res.status === 401) {
            alert('Please sign in to create a project')
            router.push('/login')
            return
          }
          throw new Error(text || 'Server returned an error')
        }
        try { json = JSON.parse(text) } catch (e) { json = { message: text } }
      }

      if (!res.ok) throw new Error(json?.error || json?.message || 'Failed to create project')

      // Success — redirect to campaigns or profile
      router.push('/campaigns')
    } catch (error: any) {
      alert(error.message || 'Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center p-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-slate-100">Start a Project</h1>
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border dark:border-slate-700">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Project Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-900 dark:text-slate-100" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Short description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-900 dark:text-slate-100" rows={6} />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Icon (emoji)</label>
                <input value={icon} onChange={(e) => setIcon(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-900 dark:text-slate-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Goal (N$)</label>
                <input type="number" min={1} value={goal} onChange={(e) => setGoal(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-900 dark:text-slate-100" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2">Days to run</label>
                <input type="number" min={0} value={daysLeft} onChange={(e) => setDaysLeft(e.target.value)} required className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-900 dark:text-slate-100" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select value={category ?? undefined} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 rounded-lg bg-gray-100 dark:bg-slate-900 dark:text-slate-100">
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button type="button" onClick={() => router.push('/campaigns')} className="px-6 py-3 bg-gray-500 dark:bg-slate-700 text-white rounded-lg">Cancel</button>
              <button type="submit" disabled={loading} className="px-6 py-3 bg-indigo-600 dark:bg-orange-500 text-white rounded-lg">{loading ? 'Creating...' : 'Create Project'}</button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}

