import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', current: location.pathname === '/' },
    { name: 'Cars', href: '/cars', current: location.pathname === '/cars' },
    { name: 'About', href: '/about', current: location.pathname === '/about' },
    { name: 'Contact', href: '/contact', current: location.pathname === '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              DriveEasy
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600 border-transparent'
                } font-medium transition-colors duration-200 border-b-2 py-1`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Admin Link */}
            {currentUser ? (
              <Link 
                to="/admin" 
                className="text-blue-600 hover:text-blue-700 transition-colors font-medium border-b-2 border-blue-600 py-1"
              >
                Admin Panel
              </Link>
            ) : (
              <Link 
                to="/admin/login" 
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium border-b-2 border-transparent py-1"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex flex-col space-y-1 p-2 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-600 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white">
            <div className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  } px-4 py-2 rounded-lg font-medium transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Admin Link - Mobile */}
              {currentUser ? (
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Admin Panel
                </Link>
              ) : (
                <Link
                  to="/admin/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Admin
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;