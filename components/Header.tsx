'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b dark:border-red-400/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            href="/" 
            className="text-2xl font-extrabold text-indigo-600 dark:text-orange-500 hover:opacity-80 transition-opacity"
          >
            CrowdFund Hub
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-orange-500'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about"
              className={`font-medium transition-colors ${
                isActive('/about') 
                  ? 'text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-orange-500'
              }`}
            >
              About Us
            </Link>
            <Link 
              href="/campaigns"
              className={`font-medium transition-colors ${
                isActive('/campaigns') 
                  ? 'text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-orange-500'
              }`}
            >
              Campaigns
            </Link>
            <Link 
              href="/contact"
              className={`font-medium transition-colors ${
                isActive('/contact') 
                  ? 'text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-orange-500'
              }`}
            >
              Contact Us
            </Link>
            <Link 
              href="/login"
              className={`font-medium transition-colors ${
                isActive('/login') 
                  ? 'text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-orange-500'
              }`}
            >
              Login
            </Link>
            <Link 
              href="/profile"
              className={`font-medium transition-colors ${
                isActive('/profile') 
                  ? 'text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-orange-500'
              }`}
            >
              Profile
            </Link>
            <Link 
              href="/signup"
              className="bg-indigo-600 dark:bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-all hover:-translate-y-0.5"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-gray-700 dark:text-slate-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}

