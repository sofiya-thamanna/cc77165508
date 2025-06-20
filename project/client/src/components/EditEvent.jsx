import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EventForm from '../components/EventForm';

function EditEvent() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/${id}`).then((res) => {
            if(!res.ok) throw new Error("Failed to fetch event data");
            return res.json();
        }).then((data) => {
            setEvent(data);
        }).catch((error) => {
            console.error("Error fetching event data:", error);
            alert("Failed to fetch event data. Please try again.");
        })
    }, [id]);

    return (
        <div>
            {event && <EventForm initialData={event} />}
        </div>
    )
}

export default EditEvent;