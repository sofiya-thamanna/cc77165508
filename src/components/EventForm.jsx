// src/components/EventForm.jsx
import { useState, useEffect } from "react";

function EventForm({ onAdd, initialData }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "Seminar",
    maxAttendees: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time)
      return alert("Title, Date, and Time are required");

    onAdd({ ...form, id: initialData?.id || Date.now() });

    setForm({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      type: "Seminar",
      maxAttendees: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-4xl shadow max-w-md mx-auto"
    >
      <div className="bg-blue-300 text-white py-2 px-4 rounded">
      <h2 className="text-2xl font-bold mb-4">
        {initialData ? "Edit Event" : "Create New Event"}
      </h2>
      </div>
      <br></br>
      <input
        className="w-full p-2 border mb-3 rounded bg-white"
        name="title"
        placeholder="Event Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <textarea
        className="w-full p-2 border mb-3 rounded bg-white"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        className="w-full p-2 border mb-3 rounded bg-white"
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border mb-3 rounded bg-white"
        type="time"
        name="time"
        value={form.time}
        onChange={handleChange}
        required
      />
      <input
        className="w-full p-2 border mb-3 rounded bg-white"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
      />
      <select
        className="w-full p-2 border mb-3 rounded bg-white"
        name="type"
        value={form.type}
        onChange={handleChange}
      >
        <option>Seminar</option>
        <option>Workshop</option>
        <option>Webinar</option>
        <option>Competition</option>
      </select>
      <input
        className="w-full p-2 border mb-3 rounded bg-white"
        type="number"
        name="maxAttendees"
        placeholder="Max Attendees"
        value={form.maxAttendees}
        onChange={handleChange}
      />

      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
        {initialData ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
}

export default EventForm;
