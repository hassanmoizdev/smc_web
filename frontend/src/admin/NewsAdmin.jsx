import React, { useState, useEffect } from "react";
import { CONTENT_API, REQUEST_CONFIG, buildUrl, API_BASE_URL, API_URL } from "../api";
import { Newspaper, Plus, Calendar, Trash2, X, Save, Image as ImageIcon, Loader2 } from "lucide-react";

function NewsAdmin() {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    facebookEmbedUrl: "",
    image: null,
  });

  const fetchEvents = async () => {
    try {
      const res = await fetch(CONTENT_API.EVENTS);
      const data = await res.json();
      // Defensive check: Ensure we are setting an array
      setEvents(Array.isArray(data) ? data : data.events || []);
      
    } catch (err) {
      console.error("Error fetching events:", err);
      setEvents([]);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null) form.append(key, val);
    });

    try {
      const res = await fetch(CONTENT_API.EVENTS, {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        fetchEvents();
        setShowForm(false);
        setFormData({ title: "", date: "", description: "", facebookEmbedUrl: "", image: null });
      } else {
        alert("Failed to add event.");
      }
    } catch (err) {
      console.error("Error adding event:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await fetch(buildUrl(CONTENT_API.EVENTS, id), REQUEST_CONFIG.DELETE);
      fetchEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff5f5] text-[#800000] rounded-2xl">
            <Newspaper size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#800000] tracking-tight">News & Events</h2>
            <p className="text-gray-500 font-medium">Broadcast updates to your website</p>
          </div>
        </div>
        {!showForm && (
          <button 
            className="flex items-center gap-2 bg-[#800000] hover:bg-[#600000] text-white py-3 px-6 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} /> Add Event
          </button>
        )}
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-[#fff5f5] p-8 rounded-3xl border border-[#ffcccc] mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="col-span-full flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#800000]">New Update</h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Event Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Add title to Event"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none bg-white"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Date*</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none bg-white"
                required
              />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Details about the news or event..."
                rows="3"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none bg-white resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Cover Image</label>
              <input 
                type="file" 
                name="image" 
                onChange={handleChange} 
                className="p-2 border border-gray-200 rounded-xl bg-white file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#800000] file:text-white" 
              />
            </div>

            <div className="col-span-full flex gap-4 pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center gap-2 bg-[#28a745] hover:bg-[#218838] text-white py-3 px-8 rounded-xl font-bold transition-all"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                Save Event
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-bold hover:bg-gray-300 transition-all"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {(!Array.isArray(events) || events.length === 0) ? (
          <div className="text-center p-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">No news or events posted yet.</p>
          </div>
        ) : (
          events.map((ev) => (
            <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group" key={ev._id}>
              <div className="flex gap-5 items-center">
                <div className="relative">
                  {ev.imageUrl ? (
                    <img
                      src={`${API_URL}${ev.imageUrl}`}
                      alt={ev.title}
                      className="w-24 h-20 object-cover rounded-xl shadow-sm"
                    />
                  ) : (
                    <div className="w-24 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#800000] transition-colors">{ev.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-[#800000] font-semibold mt-1">
                    <Calendar size={14} />
                    {new Date(ev.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </div>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">{ev.description}</p>
                </div>
              </div>
              <button 
                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                onClick={() => handleDelete(ev._id)}
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NewsAdmin;