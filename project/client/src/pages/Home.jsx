import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { Link } from 'react-router-dom';

export default function Home() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
      fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((error) => {
          console.error("Error fetching events:", error);
          alert("Failed to fetch events. Please try again.");
      });
  }, []);

  const handleDelete = async (id) => {
      await fetch(`http://localhost:5000/api/events/${id}`, {
          method: 'DELETE',
      });
      setEvents((prev) => prev.filter((e) => e._id !== id));
      alert("Event deleted successfully");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-yellow-300">Planora</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover, create, and manage amazing events. Connect with like-minded people and make memories that last.
          </p>
          <div className="flex justify-center">
          <Link
            to="/search"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded shadow hover:bg-indigo-100"
          >
            Browse Events
          </Link>
        </div>
        </div>
      </div>
    </div>

      <div className="mt-10 px-4 max-w-6xl mx-auto pb-20">
        <div className="flex justify-center mb-6">
          <button className="px-5 py-2 rounded font-medium bg-indigo-600 text-white cursor-default">
            Current Events
          </button>
        </div>

        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event._id} event={event} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

function Footer() {
  const linkSections = [
    {
      title: "Explore",
      links: ["Home", "Create Event", "Search Events", "Upcoming Events", "Past Events"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact Us", "Privacy Policy", "Terms of Service"],
    },
    {
      title: "Connect With Us",
      links: ["Instagram", "LinkedIn", "Twitter", "YouTube"],
    },
  ];

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 bg-white shadow-lg border-b border-gray-100">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-t border-gray-300/30 text-gray-500">
        <div>
          <h2 className="flex items-center pl-2 text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-200 mb-4">Planora</h2>
          {/* <h1 className="flex items-center space-x-2 text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent hover:from-purple-700 hover:to-blue-700 transition-all duration-200">Planora</h1> */}
          <p className="max-w-[410px]">
            Planora is your go-to platform for discovering, creating, and managing exciting events. Whether it's a
            seminar, workshop, or competition – Planora connects people through memorable experiences.
          </p>
        </div>

        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
          {linkSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">{section.title}</h3>
              <ul className="text-sm space-y-1">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a href="#" className="hover:underline transition">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        © {new Date().getFullYear()} Planora. All rights reserved.
      </p>
    </div>
  );
}
