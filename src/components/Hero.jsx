import { useState } from 'react'

const Hero = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return
    
    setIsLoading(true)
    try {
      await onSearch(searchInput)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {/* Main background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80")'
            
          }}
        />
        
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70" />
        
        {/* Optional: Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-300 rounded-full blur-lg animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-purple-300 rounded-full blur-lg animate-pulse delay-500" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading with enhanced styling */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
              Ride
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed font-light">
            Discover the best cars for your journey at unbeatable prices. 
            Experience luxury, performance, and reliability in every vehicle.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by car brand, model, or type..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                />
                {/* Search icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                type="submit" 
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[140px]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  'Search Cars'
                )}
              </button>
            </div>
          </form>

          {/* Stats with enhanced design */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold mb-2 text-white">500+</div>
              <div className="text-blue-200 text-sm font-medium">Premium Vehicles</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold mb-2 text-white">24/7</div>
              <div className="text-blue-200 text-sm font-medium">Customer Support</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-3xl font-bold mb-2 text-white">50+</div>
              <div className="text-blue-200 text-sm font-medium">Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero