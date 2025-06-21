// src/components/EventForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { DatePicker,TimePicker  } from 'antd';

function EventForm({ onAdd, initialData }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    type: "Seminar",
    maxAttendees: "",
    image: "",           
    price: "" 
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time)
      return alert("Title, Date, and Time are required");
        const method = initialData ? 'PUT' : 'POST';
        const url = initialData ? `${import.meta.env.VITE_BACKEND_URL}/api/events/${initialData._id}` : `${import.meta.env.VITE_BACKEND_URL}/api/events`;
        try {
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
          });
          if (response.status === 201 || response.status === 200) {
            if (!initialData && onAdd) {
              onAdd(form); 
            }
            navigate('/');
          }
        }
        catch (error) {
          console.error("Error submitting form:", error);
          alert("Failed to submit form. Please try again.");
        }
      }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {initialData ? "Edit Event" : "Create New Event"}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Event Title *
              </label>
              <input
                name="title"
                required
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                placeholder="Enter event title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg f resize-none"
                placeholder="Describe your event in detail..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Event Date *
                </label>
                <div className="relative">
                  {/* <input
                    type="date"
                    name="date"
                    required
                    value={form.date}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-black "
                  />        */}
                  <DatePicker size="large" className="w-full !pl-10 !pr-4 !py-3 border border-gray-300 rounded-lg text-black" onChange={handleChange} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Event Time *
                </label>
                <div className="relative">
                  <input
                    type="time"
                    name="time"
                    required
                    value={form.time}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg !active:border-black"
                  
                  />
                </div>
              </div>
            </div>

            <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Location *
              </label>
              <input
                name="location"
                required
                value={form.location}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
                placeholder="Enter location"
              />
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Image URL *
              </label>
              <input
                name="image"
                required
                type="url"
                value={form.image}
                onChange={handleChange}
                placeholder="Paste image link (e.g., https://example.com/image.jpg)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
              />
              
            <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                Event Price *
              </label>
              <input
                name="price"
                required
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Enter price (e.g., 99)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg "
              />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Event Type *
                </label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white"
                >
                  <option value="Seminar">Seminar</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Webinar">Webinar</option>
                  <option value="Competition">Competition</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                  Max Attendees *
                </label>
                <div className="relative">
                  <input
                    name="maxAttendees"
                    required
                    type="number"
                    value={form.maxAttendees}
                    onChange={handleChange}
                    min="1"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg "
                    placeholder="Leave blank for unlimited"
                  />
                </div>
              </div>
            </div>


            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                {initialData ? "Update Event" : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EventForm;
