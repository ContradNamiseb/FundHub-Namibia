'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { createClient } from '@/lib/supabase/client';

interface Project {
  id: string;
  title: string;
  description: string;
  icon: string;
  goal: number;
  raised: number;
  backers: number;
  days_left: number | null;
  category: string | null;            // <-- will be the *category name*
}

/* --------------------------------------------------------------
   1. Load real projects (including category name)
   -------------------------------------------------------------- */
export default function CampaignsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const supabase = createClient();
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [fundingAmount, setFundingAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        title,
        description,
        icon,
        goal,
        raised,
        backers,
        days_left,
        status,
        category
      `)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      setProjects(getSampleProjects());
      return;
    }

    if (data && data.length > 0) {
      // `category` is stored as a text column in the projects table
      const formatted = data.map((p: any) => ({
        ...p,
        category: p.category ?? null,
      }));
      setProjects(formatted);
    } else {
      // DB empty → show your nice sample cards
      setProjects(getSampleProjects());
    }
  }

  /* --------------------------------------------------------------
     2. Sample fallback (unchanged – keep it for quick demos)
     -------------------------------------------------------------- */
  function getSampleProjects(): Project[] {
    return [
      {
        id: '1',
        title: 'Smart Garden System',
        description:
          'Automated hydroponic garden that grows fresh vegetables year-round using AI and IoT sensors.',
        icon: 'leaf',
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
        icon: 'droplet',
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
        icon: 'backpack',
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
        icon: 'robot',
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
        icon: 'shoe',
        goal: 40000,
        raised: 38000,
        backers: 312,
        days_left: 5,
        category: 'Fashion',
      },
      {
        id: '6',
        title: 'Portable Wind Turbine',
        description: 'Compact wind.generator perfect for camping and emergency power situations.',
        icon: 'wind',
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
        icon: 'gamepad',
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
        icon: 'film',
        goal: 80000,
        raised: 56000,
        backers: 380,
        days_left: 20,
        category: 'Film',
      },
    ];
  }

  /* --------------------------------------------------------------
     3. Filtering / search (unchanged logic, works with real data)
     -------------------------------------------------------------- */
  const filteredProjects = projects.filter((project) => {
    const matchesFilter = filter === 'all' || project.category === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
      if (!currentProject) throw new Error('No project selected')

      const res = await fetch('/api/pledges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project_id: currentProject.id, amount }),
      })

      // Parse response safely (some errors return HTML)
      let json: any = null
      const ct = res.headers.get('content-type') || ''
      if (ct.includes('application/json')) {
        json = await res.json()
      } else {
        const text = await res.text()
        if (!res.ok) {
          if (res.status === 401) {
            alert('You must be signed in to back a project. Redirecting to login...')
            window.location.href = '/login'
            return
          }
          throw new Error(text || 'Server returned an error')
        }
        try { json = JSON.parse(text) } catch (e) { json = { message: text } }
      }

      if (!res.ok) throw new Error(json?.error || json?.message || 'Failed to process pledge')

      const returnedProject = json?.project
      if (returnedProject) {
        const updatedProjects = projects.map((p) => (p.id === returnedProject.id ? returnedProject : p))
        setProjects(updatedProjects)
      }

      alert(`Successfully backed "${currentProject.title}" with N$${amount}!`)
    } catch (error: any) {
      alert(error.message || 'Failed to back project')
    } finally {
      setLoading(false)
      closeFundingModal()
    }
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
              {['all', 'Technology', 'Design', 'Fashion', 'Games', 'Film'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    filter === cat
                      ? 'bg-indigo-600 dark:bg-orange-500 text-white'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
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
                project={{
                  id: project.id,
                  title: project.title,
                  description: project.description,
                  icon: project.icon,
                  goal: project.goal,
                  raised: project.raised,
                  backers: project.backers,
                  // ProjectCard expects number for days_left
                  days_left: (project.days_left ?? 0) as number,
                }}
                onFund={openFundingModal}
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
        </div>
      </main>
      <Footer />
    </>
  );
}