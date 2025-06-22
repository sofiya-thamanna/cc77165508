import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./components/EditEvent";
import SearchEvents from "./pages/SearchEvents";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import { Search, HomeIcon, Plus, User, LogOut, LogIn } from "lucide-react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { useEffect, useRef, useState } from "react";

function ProfileDropdown({ onLogout }) {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-50 border p-4">
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <button
        onClick={onLogout}
        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}

function AppContent() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col bg-gray-50">
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 pr-8 pl-8">
        <div className="mx-auto flex justify-between items-center px-6 py-4 relative">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Planora
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-100"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/search"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-100"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </Link>

            <Link
              to="/create"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-100"
            >
              <Plus className="w-4 h-4" />
              <span>Create Event</span>
            </Link>

            {user ? (
              <>
                {/* Profile Button with Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-100"
                  >
                    <User className="h-4 w-4" />
                    <span>{user.name}</span>
                  </button>
                  {showDropdown && <ProfileDropdown onLogout={handleLogout} />}
                </div>

                {/* Navbar Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-100 transition-all duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-3 py-2 bg-yellow-300 text-gray-800 rounded-lg hover:bg-yellow-400 transition-all duration-200"
                >
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="flex-1 bg-gradient-to-br from-purple-100 via-blue-200 to-pink-100 flex justify-center items-start">
        <div className="w-full bg-white shadow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateEvent />} />
            <Route path="/edit/:id" element={<EditEvent />} />
            <Route path="/search" element={<SearchEvents />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
