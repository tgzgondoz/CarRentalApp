import { useState } from 'react'
import './Hero.css'

const Hero = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchInput)
  }

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Find Your Perfect Ride</h1>
          <p>Discover the best cars for your journey at unbeatable prices</p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search by car brand or model..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Hero