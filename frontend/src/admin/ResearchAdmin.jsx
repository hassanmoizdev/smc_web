import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  FileText, 
  Plus, 
  Trash2, 
  Edit3, 
  X, 
  Save, 
  Calendar, 
  FileSearch, 
  Loader2, 
  ExternalLink 
} from "lucide-react";
import { API_URL } from "../api";

function ResearchAdmin() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    file: null,
    fileUrl: "",
  });

  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchResearch();
  }, []);

  const fetchResearch = async () => {
    try {
      const res = await fetch(`${API_BASE}/research`);
      const data = await res.json();
      // Defensive check to ensure items is always an array
      setItems(Array.isArray(data) ? data : data.research || []);
    } catch (err) {
      console.error("Error fetching research:", err);
      setItems([]);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files.length > 0) {
      setFormData((prev) => ({ ...prev, file: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) return alert("Title and abstract are required!");

    setIsSubmitting(true);
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    dataToSend.append("date", formData.date);
    if (formData.file) dataToSend.append("file", formData.file);
    if (formData.fileUrl) dataToSend.append("fileUrl", formData.fileUrl);

    try {
      const url = editingId ? `${API_BASE}/research/${editingId}` : `${API_BASE}/research`;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, { method, body: dataToSend });

      if (res.ok) {
        fetchResearch();
        resetForm();
      } else {
        alert("Failed to save research");
      }
    } catch (err) {
      console.error("Error saving research:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      file: null,
      fileUrl: "",
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date.split("T")[0],
      file: null,
      fileUrl: item.fileUrl,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this paper?")) return;
    try {
      const res = await fetch(`${API_BASE}/research/${id}`, { method: "DELETE" });
      if (res.ok) setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto my-10 p-8 bg-white min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff5f5] text-[#800000] rounded-2xl shadow-sm">
            <BookOpen size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#800000] tracking-tight">Research & Papers</h2>
            <p className="text-gray-500 mt-1 font-medium italic">Manage technical assets and publications</p>
          </div>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)} 
            className="flex items-center gap-2 bg-[#800000] text-white py-3 px-6 rounded-xl font-bold transition-all hover:bg-[#600000] hover:shadow-lg hover:-translate-y-1"
          >
            <Plus size={20} />
            Add New Paper
          </button>
        )}
      </div>

      {/* Entry Form */}
      {showForm && (
        <div className="bg-[#fff5f5] p-8 rounded-3xl border border-[#ffcccc] mb-10 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="col-span-full flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#800000] flex items-center gap-2">
                <FileSearch size={22} /> {editingId ? "Update Publication" : "Submit New Paper"}
              </h3>
              <button type="button" onClick={resetForm} className="text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Publication Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title of the research paper"
                required
                className="p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Publication Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none"
              />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Abstract / Description*</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide a brief summary of the findings..."
                required
                className="p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Upload Document (.pdf, .doc)</label>
              <input
                type="file"
                name="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="p-2 bg-white border border-gray-200 rounded-xl file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#800000] file:text-white cursor-pointer"
              />
            </div>

            {formData.fileUrl && (
              <div className="flex items-end pb-2">
                <a 
                  href={`${API_BASE}${formData.fileUrl}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#800000] text-sm font-bold flex items-center gap-2 hover:underline"
                >
                  <ExternalLink size={16} /> View Attached File
                </a>
              </div>
            )}

            <div className="col-span-full flex gap-4 mt-2">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-[#800000] text-white py-3 px-8 rounded-xl font-bold transition-all hover:bg-[#600000] disabled:opacity-50"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                {editingId ? "Update Entry" : "Save Paper"}
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 py-3 px-8 rounded-xl font-bold hover:bg-gray-300 transition-all"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Papers List */}
      <div className="grid gap-6">
        {(!Array.isArray(items) || items.length === 0) ? (
          <div className="flex flex-col items-center justify-center p-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <FileText size={64} className="text-gray-200 mb-4" />
            <p className="text-gray-500 font-bold">No research papers found in the library.</p>
          </div>
        ) : (
          items.map((i) => (
            <div 
              className="flex justify-between items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden" 
              key={i._id}
            >
              <div className="flex gap-6 items-start">
                <div className="w-16 h-16 bg-[#fff5f5] rounded-xl flex items-center justify-center text-[#800000] group-hover:bg-[#800000] group-hover:text-white transition-all shadow-sm">
                  <FileText size={32} />
                </div>
                <div className="max-w-2xl">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#800000] transition-colors">
                    {i.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#800000] mt-2 uppercase tracking-widest">
                    <Calendar size={14} />
                    {new Date(i.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </div>
                  <p className="text-gray-600 mt-3 leading-relaxed">{i.description}</p>
                  
                  {i.fileUrl && (
                    <a
                      href={`${API_URL}${i.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-[#800000] bg-[#fff5f5] py-2 px-4 rounded-lg text-sm font-bold hover:bg-[#800000] hover:text-white transition-all"
                    >
                      <ExternalLink size={16} /> Download Document
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleEdit(i)} 
                  className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                  title="Edit Paper"
                >
                  <Edit3 size={20} />
                </button>
                <button 
                  className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  onClick={() => handleDelete(i._id)}
                  title="Delete Paper"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ResearchAdmin;