import React, { useState, useEffect } from "react";
import { API_URL, CONTENT_API } from "../api";
import { BellRing, Send, Trash2, X, Image as ImageIcon, Calendar, Megaphone, Loader2 } from "lucide-react";

function NotificationsAdmin() {
  const [notes, setNotes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    date: new Date().toISOString().split("T")[0],
    image: null,
  });

  const API_BASE = process.env.REACT_APP_API_URL;
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch(CONTENT_API.NOTIFICATIONS);
      const data = await res.json();
      
      setNotes(Array.isArray(data) ? data : data.notifications || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setNotes([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.message)
      return alert("Title and message are required!");

    setIsSubmitting(true);
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("message", formData.message);
    formDataToSend.append("date", formData.date);
    if (formData.image) formDataToSend.append("image", formData.image);

    try {
      const res = await fetch(`${API_BASE}/notifications`, {
        method: "POST",
        body: formDataToSend,
      });
      if (res.ok) {
        fetchNotes();
        setFormData({
          title: "",
          message: "",
          date: new Date().toISOString().split("T")[0],
          image: null,
        });
        setShowForm(false);
      }
    } catch (err) {
      console.error("Error submitting notification:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notification?"))
      return;
    try {
      await fetch(`${API_BASE}/notifications/${id}`, {
        method: "DELETE",
      });
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto my-10 p-8 bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff5f5] text-[#800000] rounded-2xl shadow-sm">
            <BellRing size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#800000] tracking-tight leading-none">Notifications</h2>
            <p className="text-gray-500 mt-2 font-medium">Send alerts and updates to users</p>
          </div>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="flex items-center gap-2 bg-[#800000] text-white py-3 px-6 rounded-xl font-bold transition-all hover:bg-[#600000] hover:shadow-lg hover:-translate-y-1"
          >
            <Megaphone size={20} />
            Publish New
          </button>
        )}
      </div>

      {/* Form Container */}
      {showForm && (
        <div className="bg-[#fff5f5] p-8 rounded-3xl border border-[#ffcccc] mb-10 shadow-sm animate-in fade-in zoom-in duration-300">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="col-span-full flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#800000] flex items-center gap-2">
                <Send size={22} /> New Announcement
              </h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Notification Title*</label>
              <input
                type="text"
                name="title"
                placeholder="Urgent Update / Sale Alert"
                value={formData.title}
                onChange={handleChange}
                required
                className="p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Display Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none"
              />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Message Content*</label>
              <textarea
                name="message"
                rows="3"
                placeholder="Write your notice here..."
                value={formData.message}
                onChange={handleChange}
                required
                className="p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Notice Image (Optional)</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="p-2 bg-white border border-gray-200 rounded-xl file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#800000] file:text-white"
              />
            </div>

            <div className="col-span-full flex gap-4 pt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[#800000] text-white py-3 px-8 rounded-xl font-bold transition-all hover:bg-[#600000] disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                Broadcast Now
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

      {/* Notifications List */}
      <div className="grid gap-4">
        {(!Array.isArray(notes) || notes.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <BellRing size={64} className="text-gray-200 mb-4" />
            <p className="text-gray-500 font-bold">No active notifications.</p>
          </div>
        ) : (
          notes.map((n) => (
            <div 
              className="flex justify-between items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group" 
              key={n._id}
            >
              <div className="flex gap-6 items-start">
                <div className="relative">
                  {n.imageUrl ? (
                    <img
                      src={`${API_URL}${n.imageUrl}`}
                      alt="Notice"
                      className="w-20 h-20 object-cover rounded-xl shadow-sm"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-[#fff5f5] rounded-xl flex items-center justify-center text-[#800000]">
                      <Megaphone size={28} />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#800000] transition-colors">
                    {n.title}
                  </h3>
                  <p className="text-gray-600 mt-1 leading-relaxed">{n.message}</p>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#800000] mt-3 uppercase tracking-wider">
                    <Calendar size={12} />
                    {new Date(n.date).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                  </div>
                </div>
              </div>
              <button 
                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                onClick={() => handleDelete(n._id)}
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

export default NotificationsAdmin;