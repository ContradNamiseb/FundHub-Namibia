import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400 dark:text-orange-500">
              CrowdFund Hub
            </h3>
            <p className="text-gray-300">
              Empowering innovation through community funding. Join thousands of
              backers supporting the next big ideas.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400 dark:text-orange-500">
              For Creators
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/start-project" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Creator Guidelines
                </Link>
              </li>
              <li>
                <Link href="/success-stories" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400 dark:text-orange-500">
              For Backers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  How it Works
                </Link>
              </li>
              <li>
                <Link href="/trust-safety" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Trust &amp; Safety
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400 dark:text-orange-500">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-green-400 dark:hover:text-orange-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>© 2024 CrowdFund Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

