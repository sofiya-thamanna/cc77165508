// src/pages/CreateEvent.jsx
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";

function CreateEvent() {
  const navigate = useNavigate();

  const handleAdd = (event) => {
    const existing = JSON.parse(localStorage.getItem("events")) || [];
    const updated = [...existing, event];
    localStorage.setItem("events", JSON.stringify(updated));
    navigate("/");
  };

  return <EventForm onAdd={handleAdd} />;
}

export default CreateEvent;
