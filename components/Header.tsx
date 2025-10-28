'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b dark:border-red-400/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link 
            href="/" 
            className="text-2xl font-extrabold text-indigo-600 dark:text-orange-500 hover:opacity-80 transition-opacity"
            onClick={closeMobileMenu}
          >
            CrowdFund Hub
          </Link>

          {/* Desktop Navigation */}
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
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-orange-500 rounded-lg p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3 border-t dark:border-slate-700 mt-2">
            <Link 
              href="/"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/about"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/about') 
                  ? 'bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              About Us
            </Link>
            <Link 
              href="/campaigns"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/campaigns') 
                  ? 'bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              Campaigns
            </Link>
            <Link 
              href="/contact"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/contact') 
                  ? 'bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              Contact Us
            </Link>
            <Link 
              href="/login"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/login') 
                  ? 'bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              Login
            </Link>
            <Link 
              href="/profile"
              onClick={closeMobileMenu}
              className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive('/profile') 
                  ? 'bg-indigo-50 dark:bg-orange-500/10 text-indigo-600 dark:text-orange-500' 
                  : 'text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              Profile
            </Link>
            <Link 
              href="/signup"
              onClick={closeMobileMenu}
              className="block mx-4 text-center bg-indigo-600 dark:bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}


