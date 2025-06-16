// src/components/EditEvent.jsx
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "./EventForm";

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    const found = stored.find((e) => e.id === parseInt(id));
    if (!found) return navigate("/");
    setEvent(found);
  }, [id, navigate]);

  const handleUpdate = (updatedEvent) => {
    const stored = JSON.parse(localStorage.getItem("events")) || [];
    const updatedList = stored.map((e) =>
      e.id === parseInt(id) ? updatedEvent : e
    );
    localStorage.setItem("events", JSON.stringify(updatedList));
    navigate("/");
  };

  return (
    <div>
      {event && <EventForm onAdd={handleUpdate} initialData={event} />}
    </div>
  );
}

export default EditEvent;
