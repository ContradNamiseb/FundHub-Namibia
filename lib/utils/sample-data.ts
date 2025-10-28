// Sample data for development and testing

export interface SampleProject {
  title: string
  description: string
  icon: string
  goal: number
  raised: number
  backers: number
  days_left: number
  category: string
}

export const sampleProjects: SampleProject[] = [
  {
    title: 'Smart Garden System',
    description:
      'Automated hydroponic garden that grows fresh vegetables year-round using AI and IoT sensors.',
    icon: '🌱',
    goal: 50000,
    raised: 34500,
    backers: 287,
    days_left: 12,
    category: 'Technology',
  },
  {
    title: 'Eco-Friendly Water Bottle',
    description:
      'Revolutionary biodegradable water bottle made from plant-based materials.',
    icon: '💧',
    goal: 25000,
    raised: 18750,
    backers: 156,
    days_left: 8,
    category: 'Design',
  },
  {
    title: 'Solar-Powered Backpack',
    description:
      'Charge your devices on the go with this innovative solar panel integrated backpack.',
    icon: '🎒',
    goal: 75000,
    raised: 62250,
    backers: 423,
    days_left: 15,
    category: 'Technology',
  },
  {
    title: 'AI Language Tutor',
    description:
      'Personal AI assistant that helps you learn any language through natural conversation.',
    icon: '🤖',
    goal: 100000,
    raised: 45000,
    backers: 234,
    days_left: 22,
    category: 'Technology',
  },
  {
    title: 'Sustainable Sneakers',
    description:
      'Comfortable sneakers made entirely from recycled ocean plastic and organic materials.',
    icon: '👟',
    goal: 40000,
    raised: 38000,
    backers: 312,
    days_left: 5,
    category: 'Fashion',
  },
  {
    title: 'Portable Wind Turbine',
    description:
      'Compact wind generator perfect for camping and emergency power situations.',
    icon: '💨',
    goal: 60000,
    raised: 21000,
    backers: 89,
    days_left: 18,
    category: 'Technology',
  },
  {
    title: 'Indie Game: Pixel Adventures',
    description:
      'A retro-style platformer with modern mechanics and an engaging storyline.',
    icon: '🎮',
    goal: 35000,
    raised: 28000,
    backers: 542,
    days_left: 10,
    category: 'Games',
  },
  {
    title: 'Documentary: Ocean Life',
    description:
      'A stunning documentary exploring the hidden wonders of our oceans.',
    icon: '🎬',
    goal: 80000,
    raised: 56000,
    backers: 380,
    days_left: 20,
    category: 'Film',
  },
]

export async function seedSampleProjects(supabase: any, userId: string) {
  const projectsToInsert = sampleProjects.map((project) => ({
    ...project,
    creator_id: userId,
    status: 'active',
  }))

  const { data, error } = await supabase
    .from('projects')
    .insert(projectsToInsert)
    .select()

  if (error) {
    console.error('Error seeding projects:', error)
    return { success: false, error }
  }

  return { success: true, data }
}

