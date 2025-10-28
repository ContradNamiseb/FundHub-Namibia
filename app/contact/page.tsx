'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // In a real app, this would send the form data to your backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-5xl font-bold text-center mb-4 text-gray-900 dark:text-slate-100">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 dark:text-slate-400 mb-12 text-lg">
            Have questions? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:border-indigo-600 dark:focus:border-orange-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 dark:bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-700 dark:hover:bg-orange-600 transition-colors"
                >
                  Send Message
                </button>

                {submitted && (
                  <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-orange-500 dark:to-red-600 p-8 rounded-2xl text-white">
                <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
                <p className="mb-6 opacity-90">
                  We're here to help and answer any question you might have. We
                  look forward to hearing from you!
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📧</div>
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="opacity-90">support@crowdfundhub.com</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📱</div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="opacity-90">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">🏢</div>
                    <div>
                      <div className="font-semibold">Office</div>
                      <div className="opacity-90">
                        123 Innovation Street
                        <br />
                        San Francisco, CA 94102
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-100 dark:bg-slate-800 p-8 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-slate-100">
                  Frequently Asked Questions
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-slate-300">
                  <li>
                    <a href="/help" className="hover:text-indigo-600 dark:hover:text-orange-500 transition-colors">
                      → How do I start a campaign?
                    </a>
                  </li>
                  <li>
                    <a href="/help" className="hover:text-indigo-600 dark:hover:text-orange-500 transition-colors">
                      → What fees does CrowdFund Hub charge?
                    </a>
                  </li>
                  <li>
                    <a href="/help" className="hover:text-indigo-600 dark:hover:text-orange-500 transition-colors">
                      → How do I back a project?
                    </a>
                  </li>
                  <li>
                    <a href="/help" className="hover:text-indigo-600 dark:hover:text-orange-500 transition-colors">
                      → What payment methods are accepted?
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

