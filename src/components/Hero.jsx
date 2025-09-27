import { useState } from 'react'
import './Hero.css'

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
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Discover the best cars for your journey at unbeatable prices. Experience luxury, performance, and reliability in every vehicle.</p>
          
          <form onSubmit={handleSearch} className={`search-form ${isLoading ? 'loading' : ''}`}>
            <input
              type="text"
              placeholder="Search by car brand, model, or type..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search Cars'}
            </button>
          </form>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Premium Vehicles</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Customer Support</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Locations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero