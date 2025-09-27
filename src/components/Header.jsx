import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <h1>DriveEasy</h1>
          </div>
          <nav className="nav-links">
            <a href="#home">Home</a>
            <a href="#cars">Cars</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </header>
  )
}

export default Header