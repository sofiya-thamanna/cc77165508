import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Link } from 'react-router-dom';

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(stored);
  }, []);

  const handleDelete = (id) => {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8 shadow-xl">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to <span className="text-yellow-300">Planora</span>
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-8">
          Discover, create, and manage amazing events. Connect with like-minded people and make memories that last.
        </p>
        <div className="flex justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-indigo-100"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </div>

      <div className="mt-10 px-4 max-w-6xl mx-auto">
        <div className="flex justify-center mb-6">
          <button className="px-5 py-2 rounded font-medium bg-indigo-600 text-white cursor-default">
            Cuurent Events
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
