import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-center mb-8 text-gray-900 dark:text-slate-100">
            About FundHub-Namibia
          </h1>

          <div className="prose prose-lg dark:prose-invert mx-auto">
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                Our Mission
              </h2>
              <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed">
                FundHub-Namibia is dedicated to empowering innovation through
                community funding. We believe that great ideas can come from
                anywhere, and everyone should have the opportunity to bring their
                vision to life.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                What We Do
              </h2>
              <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed mb-4">
                We provide a platform where creators can launch crowdfunding
                campaigns for their innovative projects, and backers can discover
                and support ideas they believe in.
              </p>
              <div className="grid md:grid-cols-3 gap-8 my-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-orange-500 dark:to-red-600 p-6 rounded-xl text-white">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold mb-2">For Creators</h3>
                  <p className="text-white/90">
                    Launch your project, reach a global audience, and secure
                    funding to make your vision a reality.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-orange-500 dark:to-red-600 p-6 rounded-xl text-white">
                  <div className="text-4xl mb-4">💝</div>
                  <h3 className="text-xl font-bold mb-2">For Backers</h3>
                  <p className="text-white/90">
                    Discover innovative projects, support ideas you believe in,
                    and get exclusive rewards.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 dark:from-orange-500 dark:to-red-600 p-6 rounded-xl text-white">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-2">For Everyone</h3>
                  <p className="text-white/90">
                    Join a global community of innovators and supporters shaping
                    the future together.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                Our Story
              </h2>
              <p className="text-gray-700 dark:text-slate-300 text-lg leading-relaxed">
                Founded in 2024, CrowdFund Hub started with a simple idea: make
                it easier for innovative projects to get funded. We've grown into
                a thriving community of creators and backers, with over $2.4M in
                total funding and a success rate of 89%.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                Our Values
              </h2>
              <ul className="space-y-4 text-gray-700 dark:text-slate-300 text-lg">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-orange-500 font-bold mr-3">
                    ✓
                  </span>
                  <span>
                    <strong>Transparency:</strong> We believe in clear
                    communication between creators and backers.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-orange-500 font-bold mr-3">
                    ✓
                  </span>
                  <span>
                    <strong>Innovation:</strong> We support creative ideas that
                    push boundaries and solve problems.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-orange-500 font-bold mr-3">
                    ✓
                  </span>
                  <span>
                    <strong>Community:</strong> We foster a supportive environment
                    where ideas can flourish.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-orange-500 font-bold mr-3">
                    ✓
                  </span>
                  <span>
                    <strong>Integrity:</strong> We maintain the highest standards
                    of trust and safety.
                  </span>
                </li>
              </ul>
            </section>

            <section className="text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-orange-500 dark:to-red-600 text-white p-12 rounded-2xl">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-xl mb-6 opacity-90">
                Whether you're a creator with a vision or a backer looking to
                support innovation, we'd love to have you join us.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href="/signup"
                  className="bg-white text-indigo-600 dark:text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </a>
                <a
                  href="/campaigns"
                  className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
                >
                  Browse Projects
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

