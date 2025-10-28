'use client'

import { useState, useEffect } from 'react'
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
  category?: string | null
}

export default function CampaignsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClient()

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (data && data.length > 0) {
      setProjects(data)
    } else {
      // Sample projects if database is empty
      setProjects(getSampleProjects())
    }
  }

  function getSampleProjects(): Project[] {
    return [
      {
        id: '1',
        title: 'Smart Garden System',
        description: 'Automated hydroponic garden that grows fresh vegetables year-round using AI and IoT sensors.',
        icon: '🌱',
        goal: 50000,
        raised: 34500,
        backers: 287,
        days_left: 12,
        category: 'Technology',
      },
      {
        id: '2',
        title: 'Eco-Friendly Water Bottle',
        description: 'Revolutionary biodegradable water bottle made from plant-based materials.',
        icon: '💧',
        goal: 25000,
        raised: 18750,
        backers: 156,
        days_left: 8,
        category: 'Design',
      },
      {
        id: '3',
        title: 'Solar-Powered Backpack',
        description: 'Charge your devices on the go with this innovative solar panel integrated backpack.',
        icon: '🎒',
        goal: 75000,
        raised: 62250,
        backers: 423,
        days_left: 15,
        category: 'Technology',
      },
      {
        id: '4',
        title: 'AI Language Tutor',
        description: 'Personal AI assistant that helps you learn any language through natural conversation.',
        icon: '🤖',
        goal: 100000,
        raised: 45000,
        backers: 234,
        days_left: 22,
        category: 'Technology',
      },
      {
        id: '5',
        title: 'Sustainable Sneakers',
        description: 'Comfortable sneakers made entirely from recycled ocean plastic and organic materials.',
        icon: '👟',
        goal: 40000,
        raised: 38000,
        backers: 312,
        days_left: 5,
        category: 'Fashion',
      },
      {
        id: '6',
        title: 'Portable Wind Turbine',
        description: 'Compact wind generator perfect for camping and emergency power situations.',
        icon: '💨',
        goal: 60000,
        raised: 21000,
        backers: 89,
        days_left: 18,
        category: 'Technology',
      },
      {
        id: '7',
        title: 'Indie Game: Pixel Adventures',
        description: 'A retro-style platformer with modern mechanics and an engaging storyline.',
        icon: '🎮',
        goal: 35000,
        raised: 28000,
        backers: 542,
        days_left: 10,
        category: 'Games',
      },
      {
        id: '8',
        title: 'Documentary: Ocean Life',
        description: 'A stunning documentary exploring the hidden wonders of our oceans.',
        icon: '🎬',
        goal: 80000,
        raised: 56000,
        backers: 380,
        days_left: 20,
        category: 'Film',
      },
    ]
  }

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.category === filter
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  function handleFund(projectId: string) {
    alert(`Funding modal for project ${projectId} would open here`)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-slate-100">
            All Campaigns
          </h1>
          <p className="text-center text-gray-600 dark:text-slate-400 mb-12 text-lg">
            Discover and support innovative projects from around the world
          </p>

          {/* Filters */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-2 flex-wrap justify-center">
              {['all', 'Technology', 'Design', 'Fashion', 'Games', 'Film'].map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filter === category
                        ? 'bg-indigo-600 dark:bg-orange-500 text-white'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                )
              )}
            </div>

            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500 w-full md:w-64"
            />
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onFund={handleFund}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-500 dark:text-slate-400">
                No campaigns found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

