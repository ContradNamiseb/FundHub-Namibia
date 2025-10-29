'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProjectCard from '@/components/ProjectCard'
import { createClient } from '@/lib/supabase/client'

interface Project {
  id: string
  title: string
  description: string
  icon: string
  goal: number
  raised: number
  backers: number
  days_left: number
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [showFundingModal, setShowFundingModal] = useState(false)
  const [showCreatorModal, setShowCreatorModal] = useState(false)
  const [currentProject, setCurrentProject] = useState<Project | null>(null)
  const [fundingAmount, setFundingAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    loadProjects()
    // Check auth status
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
      // cleanup subscription
      try {
        listener?.subscription?.unsubscribe()
      } catch (e) {
        // ignore
      }
    }
  }, [])

  

  async function loadProjects() {
    // Try to load from Supabase first
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6)

    if (data && data.length > 0) {
      setProjects(data)
    } else {
      // Fallback to sample data if no projects in database
      setProjects(getSampleProjects())
    }
  }

  function getSampleProjects(): Project[] {
    return [
      {
        id: '1',
        title: 'Smart Garden System',
        description:
          'Automated hydroponic garden that grows fresh vegetables year-round using AI and IoT sensors.',
        icon: '🌱',
        goal: 50000,
        raised: 34500,
        backers: 287,
        days_left: 12,
      },
      {
        id: '2',
        title: 'Eco-Friendly Water Bottle',
        description:
          'Revolutionary biodegradable water bottle made from plant-based materials.',
        icon: '💧',
        goal: 25000,
        raised: 18750,
        backers: 156,
        days_left: 8,
      },
      {
        id: '3',
        title: 'Solar-Powered Backpack',
        description:
          'Charge your devices on the go with this innovative solar panel integrated backpack.',
        icon: '🎒',
        goal: 75000,
        raised: 62250,
        backers: 423,
        days_left: 15,
      },
      {
        id: '4',
        title: 'AI Language Tutor',
        description:
          'Personal AI assistant that helps you learn any language through natural conversation.',
        icon: '🤖',
        goal: 100000,
        raised: 45000,
        backers: 234,
        days_left: 22,
      },
      {
        id: '5',
        title: 'Sustainable Sneakers',
        description:
          'Comfortable sneakers made entirely from recycled ocean plastic and organic materials.',
        icon: '👟',
        goal: 40000,
        raised: 38000,
        backers: 312,
        days_left: 5,
      },
      {
        id: '6',
        title: 'Portable Wind Turbine',
        description:
          'Compact wind generator perfect for camping and emergency power situations.',
        icon: '💨',
        goal: 60000,
        raised: 21000,
        backers: 89,
        days_left: 18,
      },
    ]
  }

  function openFundingModal(projectId: string) {
    const project = projects.find((p) => p.id === projectId)
    if (project) {
      setCurrentProject(project)
      setShowFundingModal(true)
      setFundingAmount('')
    }
  }

  function closeFundingModal() {
    setShowFundingModal(false)
    setCurrentProject(null)
    setFundingAmount('')
  }

  async function confirmFunding() {
    const amount = parseFloat(fundingAmount)

    if (!amount || amount < 1) {
      alert('Please enter a valid funding amount.')
      return
    }

    setLoading(true)
    try {
      if (!currentProject) {
        throw new Error('No project selected')
      }

      const res = await fetch('/api/pledges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: currentProject.id, amount }),
      })

      // Parse JSON safely — some server errors return HTML (e.g. Next error page)
      let json: any = null
      const ct = res.headers.get('content-type') || ''
      if (ct.includes('application/json')) {
        json = await res.json()
      } else {
        const text = await res.text()
        // If not JSON, throw with the raw text so user sees useful error
        if (!res.ok) {
          if (res.status === 401) {
            alert('You must be signed in to back a project. Redirecting to login...')
            window.location.href = '/login'
            return
          }
          throw new Error(text || 'Server returned an error')
        }
        try {
          json = JSON.parse(text)
        } catch (e) {
          json = { message: text }
        }
      }

      if (!res.ok) {
        throw new Error(json?.error || json?.message || 'Failed to process pledge')
      }

      // Update project in the list if returned
      const returnedProject = json?.project
      if (returnedProject) {
        const updatedProjects = projects.map((p) =>
          p.id === returnedProject.id ? returnedProject : p
        )
        setProjects(updatedProjects)
      }

      showSuccessMessage(`Successfully backed "${currentProject.title}" with N$${amount}!`)
    } catch (error: any) {
      alert(error.message || 'Failed to back project')
    } finally {
      setLoading(false)
      closeFundingModal()
    }
  }

  function showSuccessMessage(message: string) {
    // You can replace this with a toast notification library
    alert(message)
  }

  function scrollToProjects() {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 text-center text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
              Fund the Future of Innovation
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Discover groundbreaking projects and help bring amazing ideas to
              life through community funding.
            </p>
            {/* auth status intentionally removed from homepage; header handles login/logout UI */}
            <button
              onClick={scrollToProjects}
              className="inline-block bg-green-500 dark:bg-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-green-600 dark:hover:bg-orange-600 transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Explore Projects
            </button>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 dark:bg-slate-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border dark:border-slate-700">
                    <span className="block text-4xl font-extrabold text-indigo-600 dark:text-orange-500">
                      N$2.4M
                    </span>
                <div className="text-gray-600 dark:text-slate-400 font-medium mt-2">
                  Total Funded
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border dark:border-slate-700">
                <span className="block text-4xl font-extrabold text-indigo-600 dark:text-orange-500">
                  156
                </span>
                <div className="text-gray-600 dark:text-slate-400 font-medium mt-2">
                  Active Projects
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border dark:border-slate-700">
                <span className="block text-4xl font-extrabold text-indigo-600 dark:text-orange-500">
                  12.8K
                </span>
                <div className="text-gray-600 dark:text-slate-400 font-medium mt-2">
                  Happy Backers
                </div>
              </div>
              <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-md border dark:border-slate-700">
                <span className="block text-4xl font-extrabold text-indigo-600 dark:text-orange-500">
                  89%
                </span>
                <div className="text-gray-600 dark:text-slate-400 font-medium mt-2">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Get Started */}
        <section className="py-16 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-slate-100">
              How to Get Started
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Creator Card */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border-l-4 border-indigo-600 dark:border-orange-500 hover:-translate-y-2 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-orange-500 dark:to-red-600 w-16 h-16 rounded-xl flex items-center justify-center">
                    🚀
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    Start a Campaign
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-slate-400 mb-6">
                  Turn your innovative idea into reality by launching a
                  crowdfunding campaign.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: 'Create Your Project',
                      desc: 'Write a compelling description, set your funding goal, and upload engaging visuals.',
                    },
                    {
                      title: 'Set Rewards',
                      desc: 'Offer exciting rewards to backers at different funding levels.',
                    },
                    {
                      title: 'Launch & Promote',
                      desc: 'Publish your campaign and share it with your network.',
                    },
                    {
                      title: 'Deliver Results',
                      desc: 'Keep backers updated and deliver on your promises.',
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 dark:bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-slate-100">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => router.push('/start-project')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-orange-500 dark:to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  START YOUR CAMPAIGN
                </button>
              </div>

              {/* Backer Card */}
              <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border-l-4 border-green-600 dark:border-orange-500 hover:-translate-y-2 transition-transform">
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-orange-500 dark:to-red-600 w-16 h-16 rounded-xl flex items-center justify-center">
                    💝
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    Fund a Project
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-slate-400 mb-6">
                  Support amazing projects and help bring innovative ideas to
                  life.
                </p>
                <div className="space-y-4 mb-6">
                  {[
                    {
                      title: 'Browse Projects',
                      desc: 'Explore featured campaigns and discover projects that match your interests.',
                    },
                    {
                      title: 'Choose Your Support',
                      desc: 'Select a reward tier or enter a custom amount to back the project.',
                    },
                    {
                      title: 'Complete Payment',
                      desc: 'Securely fund the project using your preferred payment method.',
                    },
                    {
                      title: 'Get Rewards',
                      desc: 'Receive updates and enjoy your rewards when the project reaches its goal.',
                    },
                  ].map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-green-600 dark:bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-slate-100">
                          {step.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollToProjects}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 dark:from-orange-500 dark:to-red-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  EXPLORE PROJECTS
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="projects" className="py-16 bg-gray-50 dark:bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-slate-100">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onFund={openFundingModal}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Funding Modal */}
      {showFundingModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeFundingModal}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full shadow-2xl border dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-100">
              Back this Project
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-4">
              {currentProject?.title}
            </p>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100 rounded-lg mb-6 focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
              placeholder="Enter amount (N$)"
              min="1"
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
            />
            <div className="flex gap-4">
              <button
                onClick={closeFundingModal}
                className="flex-1 px-6 py-3 bg-gray-500 dark:bg-slate-700 text-white rounded-lg font-semibold hover:bg-gray-600 dark:hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmFunding}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-green-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Confirm Funding'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Creator Modal */}
      {showCreatorModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCreatorModal(false)}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl border dark:border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-slate-100">
              Start Your Campaign
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6">
              Ready to bring your innovative idea to life? Here's what you need
              to get started:
            </p>
            <div className="space-y-4 mb-6">
              {[
                {
                  title: 'Project Description',
                  desc: 'A compelling story about your project and why it matters',
                },
                {
                  title: 'Funding Goal',
                  desc: 'Realistic target amount needed to complete your project',
                },
                {
                  title: 'Reward Tiers',
                  desc: 'Exciting rewards for backers at different funding levels',
                },
                {
                  title: 'Visual Content',
                  desc: 'High-quality images or videos showcasing your project',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-600 dark:bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-slate-100 block">
                      {item.title}
                    </strong>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCreatorModal(false)}
                className="flex-1 px-6 py-3 bg-gray-500 dark:bg-slate-700 text-white rounded-lg font-semibold hover:bg-gray-600 dark:hover:bg-slate-600 transition-colors"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  alert('Campaign creation started! Check your email for next steps.')
                  setShowCreatorModal(false)
                }}
                className="flex-1 px-6 py-3 bg-green-600 dark:bg-orange-500 text-white rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-orange-600 transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

