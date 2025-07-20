import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext.jsx';
import LogoutModal from './LogoutModal';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUser(null);
    setShowLogoutModal(false);
    onClose(); // Close the sidebar after logout
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="text-xl font-semibold text-gray-800">Menu</span>
            <button
              onClick={onClose}
              className="text-gray-500 bg-white hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                Home
              </Link>
              <Link
                to="/restaurants"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={onClose}
              >
                Restaurants
              </Link>
              {user && (
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={onClose}
                >
                  Profile
                </Link>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t">
            {!user ? (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-4 py-2 text-center text-gray-700 hover:bg-gray-100 rounded-md"
                  onClick={onClose}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-2 text-center text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                  onClick={onClose}
                >
                  Register
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="block w-full bg-blue-600 px-4 py-2 text-center text-gray-50 hover:bg-gray-100 rounded-md"
              >
                Logout {user?.name}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Sidebar; 