'use client'

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

interface ProjectCardProps {
  project: Project
  onFund: (projectId: string) => void
}

export default function ProjectCard({ project, onFund }: ProjectCardProps) {
  const progressPercentage = Math.min((project.raised / project.goal) * 100, 100)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-slate-700 dark:hover:border-orange-500">
      <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-orange-500 dark:to-red-600 flex items-center justify-center text-6xl">
        {project.icon}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-slate-100">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="mb-4">
          <div className="bg-gray-200 dark:bg-slate-700 rounded-full h-2 mb-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-600 dark:from-orange-500 dark:to-red-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-bold text-green-600 dark:text-orange-500">
              ${project.raised.toLocaleString()}
            </span>
            <span className="text-gray-600 dark:text-slate-400">
              of ${project.goal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1 text-gray-600 dark:text-slate-400">
            <span>{project.backers} backers</span>
            <span>{Math.round(progressPercentage)}% funded</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-700">
          <span className="text-sm font-semibold text-amber-600 dark:text-orange-500">
            {project.days_left} days left
          </span>
          <button
            onClick={() => onFund(project.id)}
            className="bg-indigo-600 dark:bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-all hover:scale-105"
          >
            Back Project
          </button>
        </div>
      </div>
    </div>
  )
}

