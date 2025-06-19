import { useNavigate } from "react-router-dom";
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon,BanknotesIcon } from "@heroicons/react/24/outline";

function EventCard({ event, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl shadow-lg overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover"
        />
      )}

       <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{event.title}</h3>
        <p className="text-sm italic text-gray-500 mb-3">{event.type}</p>

        <div className="space-y-1.5 mb-6">
        <div className="flex items-center text-gray-600 text-sm">
            <CalendarIcon className="h-4 w-4 mr-2 text-purple-500" />
            <span>{event.date}</span>
            <ClockIcon className="h-4 w-4 ml-4 mr-2 text-purple-500" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPinIcon className="h-4 w-4 mr-2 text-purple-500" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <UsersIcon className="h-4 w-4 mr-2 text-purple-500" />
            <span className="truncate">Max Attendees: {event.maxAttendees}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <BanknotesIcon className="h-4 w-4 mr-2 text-purple-500" />
            <span className="truncate">Price: ₹{event.price}</span>
          </div>
        
      </div>
        <div className="flex justify-between mt-2">
          <button
            onClick={() => navigate(`/edit/${event._id}`)}
            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event._id)}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
