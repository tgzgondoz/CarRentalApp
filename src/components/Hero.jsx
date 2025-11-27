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
    <section className="relative min-h-[500px] xs:min-h-[550px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
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
          <div className="absolute top-1/4 left-1/4 w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 bg-white rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 bg-blue-300 rounded-full blur-lg animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/3 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-purple-300 rounded-full blur-lg animate-pulse delay-500" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading with enhanced responsive styling */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 xs:mb-6 leading-tight px-2 xs:px-0">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent block xs:inline">
              Ride
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-lg xs:text-xl sm:text-2xl text-blue-100 mb-6 xs:mb-8 leading-relaxed font-light px-2 xs:px-0">
            Discover the best cars for your journey at unbeatable prices. 
            Experience luxury, performance, and reliability in every vehicle.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-8 xs:mb-10 sm:mb-12 px-2 xs:px-0">
            <div className="flex flex-col sm:flex-row gap-3 xs:gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search by car brand, model, or type..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  disabled={isLoading}
                  className="w-full px-4 xs:px-6 py-3 xs:py-4 rounded-lg xs:rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 text-sm xs:text-base"
                />
                {/* Search icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200">
                  <svg className="w-4 h-4 xs:w-5 xs:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <button 
                type="submit" 
                className="px-6 xs:px-8 py-3 xs:py-4 bg-white text-blue-600 rounded-lg xs:rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 disabled:opacity-50 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center min-w-[120px] xs:min-w-[140px] text-sm xs:text-base min-h-[50px] xs:min-h-0"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-3 w-3 xs:h-4 xs:w-4 text-blue-600" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </span>
                ) : (
                  'Search Cars'
                )}
              </button>
            </div>
          </form>

          {/* Stats with enhanced responsive design */}
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 max-w-2xl mx-auto px-2 xs:px-0">
            <div className="text-center p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-1 xs:mb-2 text-white">500+</div>
              <div className="text-blue-200 text-xs xs:text-sm font-medium">Premium Vehicles</div>
            </div>
            <div className="text-center p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-1 xs:mb-2 text-white">24/7</div>
              <div className="text-blue-200 text-xs xs:text-sm font-medium">Customer Support</div>
            </div>
            <div className="text-center p-4 xs:p-5 sm:p-6 rounded-lg xs:rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-1 xs:mb-2 text-white">50+</div>
              <div className="text-blue-200 text-xs xs:text-sm font-medium">Locations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-5 h-5 xs:w-6 xs:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero