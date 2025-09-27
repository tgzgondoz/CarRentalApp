import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <h1>DriveEasy</h1>
            </Link>
          </div>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <a href="#cars">Cars</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <Link to="/admin">Admin</Link>
          </nav>
          <button className="btn btn-secondary">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;