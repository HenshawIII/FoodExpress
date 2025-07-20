import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import { UserContext } from '../context/UserContext.jsx';
import LogoutModal from './LogoutModal';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setShowLogoutModal(false);
  };

  return (
    <>
      <nav className="bg-white shadow-lg w-full md:sticky top-0 z-50 opacity-90">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-blue-600">FoodExpress</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
                  <Link
                    to="/profile"
                    className="bg-white text-gray-900 hover:text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Profile
                  </Link>
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Login
                  </Link>
                  
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
              {user && (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-gray-700 bg-white hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  LogOut {user?.name}
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleSidebar}
                className="inline-flex items-center bg-slate-200 justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isSidebarOpen ? 'hidden' : 'block'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className={`${isSidebarOpen ? 'block' : 'hidden'} h-6 w-6`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar; 