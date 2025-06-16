import { useNavigate } from "react-router-dom";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
      <div className="bg-blue-300 text-white rounded">
      <h3 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h3>
      </div>
      <p className="text-sm italic text-gray-500 mb-3">{event.description}</p>
      <ul className="text-sm text-gray-700 space-y-1 mb-4">
        <li className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-indigo-600" />
          Date: {event.date}
        </li>
        <li className="flex items-center gap-2">
          <ClockIcon className="h-5 w-5 text-indigo-600" />
          Time: {event.time}
        </li>
        <li className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-indigo-600" />
          Location: {event.location}
        </li>
        <li className="flex items-center gap-2">
          <UsersIcon className="h-5 w-5 text-indigo-600" />
          Max Attendees: {event.maxAttendees}
        </li>
      </ul>
      <div className="flex justify-between">
        <button
          onClick={() => navigate(`/edit/${event.id}`)}
          className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event.id)}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default EventCard;
