// Purpose: Template generators for React components
import { ParsedIntent } from '../../types'

export function generateNavComponent(intent: ParsedIntent): string {
  const isDark = intent.theme === 'dark' || intent.theme === 'amazon'

  return `// Purpose: Navigation component with responsive mobile menu
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">${intent.siteName.charAt(0)}</span>
            </div>
            <span className="font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}">${intent.siteName}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary">
              ${intent.cta?.primary || 'Get Started'}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 ${isDark ? 'text-white' : 'text-gray-900'}"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden ${isDark ? 'bg-gray-900' : 'bg-white'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block ${isDark ? 'text-gray-300' : 'text-gray-600'} py-2"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="btn-primary block text-center">
              ${intent.cta?.primary || 'Get Started'}
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}`
}

export function generateHeroComponent(intent: ParsedIntent): string {
  const isDark = intent.theme === 'dark' || intent.theme === 'amazon'
  const toneText = {
    professional: { headline: 'Professional Solutions for Modern Businesses', sub: 'Trusted by industry leaders worldwide' },
    casual: { headline: 'Hey there! Let\'s build something awesome', sub: 'Join thousands of happy customers' },
    playful: { headline: 'Ready to have some fun? 🚀', sub: 'The most exciting way to get things done' },
    confident: { headline: 'The Future Starts Here', sub: 'Be part of the revolution' },
    formal: { headline: 'Excellence in Every Detail', sub: 'Setting the standard for quality' },
    friendly: { headline: 'Welcome! We\'re glad you\'re here', sub: 'Let\'s accomplish great things together' },
  }

  const text = toneText[intent.tone] || toneText.professional

  return `// Purpose: Hero section with headline and CTA
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-white'}">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-${isDark ? '400' : '600'} text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            ${text.sub}
          </div>

          {/* Headline */}
          <h1 className="heading-xl ${isDark ? 'text-white' : 'text-gray-900'} mb-6">
            ${intent.title}
            <span className="block text-primary-500 mt-2">${text.headline}</span>
          </h1>

          {/* Description */}
          <p className="text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-10 max-w-2xl mx-auto">
            Transform your business with our cutting-edge solutions. Built for performance, 
            designed for success, and ready to scale with your ambitions.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="btn-primary group">
              ${intent.cta?.primary || 'Get Started'}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features" className="btn-secondary group">
              <Play className="mr-2 w-5 h-5" />
              See How It Works
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 ${isDark ? 'text-gray-500' : 'text-gray-400'}">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Free to start</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}`
}

export function generateFeaturesComponent(intent: ParsedIntent): string {
  const isDark = intent.theme === 'dark' || intent.theme === 'amazon'
  const features = intent.features || []

  // Map feature icons to Lucide icons
  const iconMap: Record<string, string> = {
    'BoltIcon': 'Zap',
    'ShieldCheckIcon': 'Shield',
    'PuzzlePieceIcon': 'Puzzle',
    'ChatBubbleLeftRightIcon': 'MessageSquare',
    'ChartBarIcon': 'BarChart3',
    'CloudIcon': 'Cloud',
    'StarIcon': 'Star',
    'UserGroupIcon': 'Users',
    'RocketLaunchIcon': 'Rocket',
    'CurrencyDollarIcon': 'DollarSign',
    'WrenchScrewdriverIcon': 'Wrench',
    'LifebuoyIcon': 'LifeBuoy',
  }

  const lucideIcons = features.map(f => iconMap[f.icon] || 'Star')
  const uniqueIcons = [...new Set(lucideIcons)]

  const featuresData = features.map((f, i) => ({
    ...f,
    lucideIcon: lucideIcons[i],
  }))

  return `// Purpose: Features grid section
import { ${uniqueIcons.join(', ')} } from 'lucide-react'

const features = ${JSON.stringify(featuresData.map(f => ({
    title: f.title,
    description: f.description,
    icon: f.lucideIcon,
  })), null, 2)}

const iconComponents: Record<string, any> = {
  ${uniqueIcons.map(icon => `${icon}: ${icon}`).join(',\n  ')}
}

export default function Features() {
  return (
    <section id="features" className="section ${isDark ? 'bg-gray-800' : 'bg-gray-50'}">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4">
            Everything you need to succeed
          </h2>
          <p className="${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg">
            Powerful features designed to help you achieve your goals faster and more efficiently.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconComponents[feature.icon]
            return (
              <div
                key={index}
                className="card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-2">
                  {feature.title}
                </h3>
                <p className="${isDark ? 'text-gray-400' : 'text-gray-600'}">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}`
}

export function generatePricingComponent(intent: ParsedIntent): string {
  const isDark = intent.theme === 'dark' || intent.theme === 'amazon'
  const tiers = intent.pricingTiers || []

  return `// Purpose: Pricing table component
import { Check } from 'lucide-react'

const tiers = ${JSON.stringify(tiers, null, 2)}

export default function Pricing() {
  return (
    <section id="pricing" className="section ${isDark ? 'bg-gray-900' : 'bg-white'}">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4">
            Simple, transparent pricing
          </h2>
          <p className="${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg">
            Choose the plan that's right for you. All plans include a 14-day free trial.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={tier.id}
              className={\`card p-8 relative \${tier.highlighted ? 'ring-2 ring-primary-500 scale-105' : ''}\`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-2">
                  {tier.name}
                </h3>
                <p className="${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4">
                  {tier.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}">
                    {tier.price === 0 ? 'Free' : \`$\${tier.price}\`}
                  </span>
                  {tier.price > 0 && (
                    <span className="${isDark ? 'text-gray-400' : 'text-gray-500'}">
                      /{tier.period}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                    <span className="${isDark ? 'text-gray-300' : 'text-gray-600'}">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={\`w-full py-3 px-6 rounded-lg font-semibold transition-colors \${
                  tier.highlighted
                    ? 'bg-primary-500 text-white hover:bg-primary-600'
                    : '${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}'
                }\`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}`
}

export function generateContactComponent(intent: ParsedIntent): string {
  const isDark = intent.theme === 'dark' || intent.theme === 'amazon'

  return `// Purpose: Contact form section
import { useState } from 'react'
import { Send, Mail, MapPin, Phone } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Check for Formspree ID
    const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID

    if (formspreeId) {
      try {
        const response = await fetch(\`https://formspree.io/f/\${formspreeId}\`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (response.ok) {
          setIsSubmitted(true)
        }
      } catch (error) {
        console.error('Form submission error:', error)
      }
    } else {
      // Fallback: log to console
      console.log('Form submission:', formData)
      setIsSubmitted(true)
    }

    setIsSubmitting(false)
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="section ${isDark ? 'bg-gray-800' : 'bg-gray-50'}">
        <div className="max-w-xl mx-auto text-center px-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h2 className="heading-md ${isDark ? 'text-white' : 'text-gray-900'} mb-4">
            Thanks for reaching out!
          </h2>
          <p className="${isDark ? 'text-gray-300' : 'text-gray-600'}">
            We'll get back to you as soon as possible.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="section ${isDark ? 'bg-gray-800' : 'bg-gray-50'}">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h2 className="heading-lg ${isDark ? 'text-white' : 'text-gray-900'} mb-4">
              Get in touch
            </h2>
            <p className="${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg mb-8">
              Have a question or want to work together? We'd love to hear from you.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold ${isDark ? 'text-white' : 'text-gray-900'}">Email</h3>
                  <p className="${isDark ? 'text-gray-400' : 'text-gray-600'}">hello@${intent.siteName.toLowerCase().replace(/\s+/g, '')}.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold ${isDark ? 'text-white' : 'text-gray-900'}">Phone</h3>
                  <p className="${isDark ? 'text-gray-400' : 'text-gray-600'}">+1 (555) 000-0000</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold ${isDark ? 'text-white' : 'text-gray-900'}">Location</h3>
                  <p className="${isDark ? 'text-gray-400' : 'text-gray-600'}">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="card p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}`
}

export function generateCTAComponent(intent: ParsedIntent): string {
  const isDark = intent.theme === 'dark' || intent.theme === 'amazon'

  return `// Purpose: Call-to-action section
import { ArrowRight } from 'lucide-react'

export default function CTA() {
  return (
    <section className="section ${isDark ? 'bg-primary-900' : 'bg-primary-500'}">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="heading-lg text-white mb-6">
          Ready to get started?
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers and take your business to the next level.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 rounded-lg font-semibold bg-white text-primary-600 hover:bg-gray-100 transition-colors group"
          >
            ${intent.cta?.primary || 'Get Started'}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#features"
            className="inline-flex items-center px-8 py-4 rounded-lg font-semibold border-2 border-white/50 text-white hover:bg-white/10 transition-colors"
          >
            ${intent.cta?.secondary || 'Learn More'}
          </a>
        </div>
      </div>
    </section>
  )
}`
}

export function generateFooterComponent(intent: ParsedIntent): string {
  const isDark = intent.theme === 'dark' || intent.theme === 'amazon'
  const year = new Date().getFullYear()

  return `// Purpose: Footer with links and social icons
import { Twitter, Github, Linkedin, Mail } from 'lucide-react'

const footerLinks = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
  Company: ['About', 'Blog', 'Careers', 'Press'],
  Resources: ['Documentation', 'Help Center', 'Community', 'Contact'],
  Legal: ['Privacy', 'Terms', 'License'],
}

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: '#', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="${isDark ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'} border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">${intent.siteName.charAt(0)}</span>
              </div>
              <span className="font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}">${intent.siteName}</span>
            </a>
            <p className="${isDark ? 'text-gray-400' : 'text-gray-600'} mb-4 max-w-sm">
              Building the future, one innovation at a time. Join us on our mission to make a difference.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t ${isDark ? 'border-gray-800' : 'border-gray-200'} flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="${isDark ? 'text-gray-500' : 'text-gray-400'} text-sm">
            © ${year} ${intent.siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}">
            <a href="#" className="hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors">Privacy</a>
            <a href="#" className="hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors">Terms</a>
            <a href="#" className="hover:${isDark ? 'text-white' : 'text-gray-900'} transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}`
}
