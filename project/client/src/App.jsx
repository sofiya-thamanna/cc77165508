import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./components/EditEvent";
import { Search,HomeIcon, Plus } from "lucide-react";

function App() {
  return (
    <Router>
      <div className=" flex flex-col bg-gray-50 " >
        <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50 pr-8 pl-8">
          <div className=" mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="flex items-center space-x-2 text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-200">Planora</h1>
            <div className="flex space-x-4">
              <Link to="/" className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-100 ">
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

              <Link to="/create" className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-100">
              <Plus className="w-4 h-4" />
                <span>Create Event</span>
              </Link>

              <Link to="/"
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-white bg-yellow-300"
                >
                  <span>Sign Up</span>
                </Link>

            </div>


          </div>
        </nav>

        <main className="flex-1 bg-gradient-to-br from-purple-100 via-blue-200 to-pink-100 flex justify-center items-start">
        <div className="w-full  bg-white shadow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateEvent />} />
              <Route path="/edit/:id" element={<EditEvent />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
