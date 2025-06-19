import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

function SearchEvents() {
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => {
        setAllEvents(data);
        setFilteredEvents(data);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        alert("Failed to load events.");
      });
  }, []);

  const handleSearch = () => {
    let result = allEvents;

    if (searchTerm.trim() !== "") {
      const lower = searchTerm.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(lower) ||
          e.location.toLowerCase().includes(lower)
      );
    }

    if (filterType !== "All") {
      result = result.filter((e) => e.type === filterType);
    }

    setFilteredEvents(result);
  };

  useEffect(() => {
    handleSearch(); // live filter
  }, [searchTerm, filterType]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Search & Filter Events</h1>

      <div className="max-w-4xl mx-auto mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by title or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg w-full"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg w-full bg-white"
        >
          <option value="All">All Types</option>
          <option value="Seminar">Seminar</option>
          <option value="Workshop">Workshop</option>
          <option value="Webinar">Webinar</option>
          <option value="Competition">Competition</option>
        </select>

        <button
          onClick={handleSearch}
          className="bg-indigo-600 text-white px-4 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredEvents.length === 0 ? (
          <p className="text-center col-span-3 text-gray-500">No matching events found.</p>
        ) : (
          filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchEvents;
