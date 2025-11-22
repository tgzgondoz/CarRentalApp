import { useState } from 'react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-gray-700">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-2xl font-bold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for the latest deals and offers
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  subscribed 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } transform hover:scale-105 active:scale-95`}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">DriveEasy</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for premium car rentals since 2004. Experience luxury, 
              reliability, and exceptional service with our extensive fleet of premium vehicles.
            </p>
            <div className="flex space-x-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-200"
                aria-label="Facebook"
              >
                <span className="font-semibold">f</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-black transition-colors duration-200"
                aria-label="Twitter"
              >
                <span className="font-semibold">𝕏</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors duration-200"
                aria-label="Instagram"
              >
                <span className="text-sm">📷</span>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <span className="font-semibold">in</span>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-300 hover:text-white transition-colors duration-200">Home</a>
              <a href="#cars" className="block text-gray-300 hover:text-white transition-colors duration-200">Our Fleet</a>
              <a href="#about" className="block text-gray-300 hover:text-white transition-colors duration-200">About Us</a>
              <a href="#contact" className="block text-gray-300 hover:text-white transition-colors duration-200">Contact</a>
              <a href="#faq" className="block text-gray-300 hover:text-white transition-colors duration-200">FAQ</a>
              <a href="#terms" className="block text-gray-300 hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 mt-1">✉</span>
                <span className="text-gray-300">tgzgondozz@gmail.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 mt-1">☎</span>
                <span className="text-gray-300">(263) 783 242 506</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 mt-1">📍</span>
                <span className="text-gray-300">7805 Kubatana Karoi Surbub</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-gray-400 mt-1">⏰</span>
                <span className="text-gray-300">24/7 Customer Support</span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Why Choose Us</h4>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Premium Vehicle Fleet
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                24/7 Roadside Assistance
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Competitive Pricing
              </p>
              <p className="flex items-center">
                <span className="text-green-400 mr-2">✓</span>
                Flexible Rental Periods
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="py-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-gray-400 text-sm">
              &copy; 2025 DriveEasy. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer