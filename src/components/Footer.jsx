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
    <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Newsletter Section */}
        <div className="py-16 border-b border-white/10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm font-medium text-white/90">EXCLUSIVE UPDATES</span>
            </div>
            <h4 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Join Our Inner Circle
            </h4>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Be the first to access premium vehicle launches, exclusive offers, and VIP experiences. 
              Elevate your driving journey with our curated insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  placeholder="Enter your professional email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <div className="absolute inset-y-0 right-3 flex items-center">
                  <span className="text-blue-300">✉️</span>
                </div>
              </div>
              <button 
                type="submit" 
                className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  subscribed 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                } shadow-lg hover:shadow-2xl backdrop-blur-sm`}
              >
                {subscribed ? (
                  <span className="flex items-center">
                    <span className="w-4 h-4 bg-white rounded-full mr-2 animate-pulse"></span>
                    Welcome Aboard!
                  </span>
                ) : (
                  'Receive Exclusive Access'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Premium Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Premium Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white font-bold text-lg">DE</span>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">DriveEasy</h3>
            </div>
            <p className="text-blue-100 mb-8 leading-relaxed text-lg">
              Curating extraordinary mobility experiences since 2004. Where automotive excellence meets unparalleled service, crafting journeys that transcend transportation.
            </p>
            <div className="flex space-x-3">
              {[
                { label: 'Facebook', bg: 'hover:bg-blue-600', icon: 'f', color: 'text-white' },
                { label: 'Twitter', bg: 'hover:bg-black', icon: '𝕏', color: 'text-white' },
                { label: 'Instagram', bg: 'hover:bg-gradient-to-r from-purple-600 to-pink-600', icon: '📷', color: 'text-sm' },
                { label: 'LinkedIn', bg: 'hover:bg-blue-700', icon: 'in', color: 'text-white font-semibold' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${social.bg} border border-white/20 hover:border-white/40`}
                  aria-label={social.label}
                >
                  <span className={social.color}>{social.icon}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Premium Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Navigation</h4>
            <div className="space-y-3">
              {['Home', 'Master Collection', 'Executive Services', 'Our Heritage', 'Concierge', 'VIP Program'].map((link, index) => (
                <a 
                  key={index}
                  href={`#${link.toLowerCase().replace(' ', '-')}`} 
                  className="block text-blue-100 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
                >
                  <span className="flex items-center">
                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link}
                  </span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Premium Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">Concierge Access</h4>
            <div className="space-y-4">
              {[
                { icon: '✉', text: 'tgzgondozz@gmail.com', subtext: 'Executive Support' },
                { icon: '☎', text: '(263) 783 242 506', subtext: '24/7 Priority Line' },
                { icon: '📍', text: '7805 Kubatana Karoi Surbub', subtext: 'Flagship Location' },
                { icon: '⏰', text: 'Always Available', subtext: 'Elite Client Support' }
              ].map((contact, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center text-blue-300 group-hover:scale-110 transition-transform duration-300 mt-1">
                    <span className="text-lg">{contact.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{contact.text}</p>
                    <p className="text-blue-200 text-sm">{contact.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Value Propositions */}
          <div>
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">The DriveEasy Standard</h4>
            <div className="space-y-4">
              {[
                { text: 'Curated Premium Fleet', icon: '⭐' },
                { text: '24/7 Executive Support', icon: '🎯' },
                { text: 'Competitive Excellence', icon: '💎' },
                { text: 'Flexible Elite Plans', icon: '⚡' },
                { text: 'White Glove Service', icon: '👑' },
                { text: 'Global Mobility Access', icon: '🌍' }
              ].map((value, index) => (
                <p key={index} className="flex items-center text-blue-100 group hover:text-white transition-colors duration-300">
                  <span className="text-yellow-400 mr-3 text-lg group-hover:scale-110 transition-transform duration-300">{value.icon}</span>
                  <span>{value.text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        
        {/* Premium Footer Bottom */}
        <div className="py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <p className="text-blue-200 text-sm">
                &copy; 2025 DriveEasy Holdings. Crafting excellence in mobility.
              </p>
              <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
              <p className="text-blue-200 text-sm">All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#privacy" className="text-blue-200 hover:text-white text-sm transition-all duration-300 transform hover:scale-105">
                Privacy Excellence
              </a>
              <a href="#terms" className="text-blue-200 hover:text-white text-sm transition-all duration-300 transform hover:scale-105">
                Terms of Service
              </a>
              <a href="#disclaimer" className="text-blue-200 hover:text-white text-sm transition-all duration-300 transform hover:scale-105">
                Legal
              </a>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 backdrop-blur-sm border border-white/20"
          aria-label="Back to top"
        >
          <span className="text-lg">↑</span>
        </button>
      </div>
    </footer>
  )
}

export default Footer