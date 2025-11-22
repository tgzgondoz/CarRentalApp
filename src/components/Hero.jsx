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
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect Ride
          </h1>
          
          {/* Description */}
          <p className="text-xl text-blue-100 mb-8">
            Discover the best cars for your journey at unbeatable prices. Experience luxury, performance, and reliability in every vehicle.
          </p>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Search by car brand, model, or type..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search Cars'}
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">500+</div>
              <div className="text-blue-100 text-sm">Premium Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <div className="text-blue-100 text-sm">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold mb-1">50+</div>
              <div className="text-blue-100 text-sm">Locations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero