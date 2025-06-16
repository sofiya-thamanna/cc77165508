// src/App.jsx
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./components/EditEvent";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <nav className="w-full bg-white shadow-md">
          <div className="max-w-5xl mx-auto flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
            <div className="space-x-6">
              <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
                Home
              </Link>
              <Link to="/create" className="text-blue-600 hover:text-blue-800 font-medium">
                Create Event
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1 bg-gradient-to-br from-purple-100 via-blue-200 to-pink-100 flex justify-center items-start">
        <div className="w-full max-w-5xl bg-white rounded-lg shadow p-8 mt-8">
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
