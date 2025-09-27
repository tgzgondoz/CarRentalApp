import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="nav">
          <div className="logo">
            <Link to="/" className="logo-link">
              <h1>DriveEasy</h1>
            </Link>
          </div>
          
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <a href="#cars" className="nav-link">Cars</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            {currentUser ? (
              <Link to="/admin" className="nav-link admin-link">Admin Panel</Link>
            ) : (
              <Link to="/admin/login" className="nav-link">Admin</Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="mobile-menu-btn">
            <span></span>
                <span></span>
                <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;