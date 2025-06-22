import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm";
import { useAuth } from "../context/AuthContext"; 

function CreateEvent() {
  const navigate = useNavigate();
  const { user } = useAuth(); 

  useEffect(() => {
    if (!user) {
      navigate("/login", { state: { from: "/create" } });
    }
  }, [user, navigate]);

  const handleAdd = (event) => {
    const existing = JSON.parse(localStorage.getItem("events")) || [];
    const updated = [...existing, event];
    localStorage.setItem("events", JSON.stringify(updated));
    navigate("/");
  };


  if (!user) return null;

  return (
    <div>
      <EventForm onAdd={handleAdd} />
    </div>
  );
}

export default CreateEvent;
