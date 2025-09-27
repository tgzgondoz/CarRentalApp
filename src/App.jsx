import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CarList from './components/CarList'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="App">
      <Header />
      <Hero onSearch={setSearchTerm} />
      <CarList searchTerm={searchTerm} />
      <Footer />
    </div>
  )
}

export default App