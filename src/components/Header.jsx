import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              DriveEasy
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <a href="#cars" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Cars
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contact
            </a>
            {currentUser ? (
              <Link to="/admin" className="text-blue-600 hover:text-blue-700 transition-colors font-medium">
                Admin Panel
              </Link>
            ) : (
              <Link to="/admin/login" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden flex flex-col space-y-1 p-2">
            <span className="w-6 h-0.5 bg-gray-600"></span>
            <span className="w-6 h-0.5 bg-gray-600"></span>
            <span className="w-6 h-0.5 bg-gray-600"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;