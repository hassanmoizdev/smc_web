import React, { useState, useEffect } from "react";
import { CONTENT_API, REQUEST_CONFIG, buildUrl, API_URL } from "../api";
import { 
  DownloadCloud, 
  Plus, 
  FileText, 
  Trash2, 
  X, 
  Save, 
  ExternalLink, 
  Loader2, 
  FilePlus 
} from "lucide-react";

function DownloadsAdmin() {
  const [files, setFiles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null,
  });

  // Fetch all downloads
  const fetchDownloads = async () => {
    try {
      // Note: Assuming CONTENT_API.DOWNLOADS exists in your api.js
      const res = await fetch(CONTENT_API.DOWNLOADS.get);
      const data = await res.json();
      
      // Handle array or object response
      setFiles(Array.isArray(data) ? data : data.downloads || data.data || []);
    } catch (err) {
      console.error("Error fetching downloads:", err);
      setFiles([]);
    }
  };

  useEffect(() => {
    fetchDownloads();
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
  if (!formData.file) return alert("Please select a file.");
  
  setLoading(true);
  
  // Create FormData
  const data = new FormData();
  data.append("title", formData.title);
  data.append("description", formData.description);
  data.append("file", formData.file); // The actual File object

  try {
    const res = await fetch(CONTENT_API.DOWNLOADS.post, {
      method: "POST",
      // IMPORTANT: Do NOT set 'Content-Type': 'multipart/form-data' here. 
      // Fetch will set it automatically with the correct boundary.
      body: data,
    });

    if (res.ok) {
      fetchDownloads();
      setShowForm(false);
      setFormData({ title: "", description: "", file: null });
    } else {
      const errData = await res.json();
      alert(errData.message || "Failed to upload asset.");
    }
  } catch (err) {
    console.error("Error adding download:", err);
    alert("Check console for connection error.");
  } finally {
    setLoading(false);
  }
};

  const handleDelete = async (id) => {
    console.log(`${CONTENT_API.DOWNLOADS}/${id}`)
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    try {
      await fetch(`${CONTENT_API.DOWNLOADS.get}/${id}`, REQUEST_CONFIG.DELETE);
      fetchDownloads();
    } catch (err) {
      console.error("Error deleting asset:", err);
      alert("Failed to delete file.");
    }
  };

  return (
    <div className="max-w-[1000px] mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#fff5f5] text-[#800000] rounded-2xl">
            <DownloadCloud size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#800000] tracking-tight">Manage Downloads</h2>
            <p className="text-gray-500 font-medium italic">SMC Brand Assets Library</p>
          </div>
        </div>
        {!showForm && (
          <button 
            className="flex items-center gap-2 bg-[#800000] hover:bg-[#600000] text-white py-3 px-6 rounded-xl font-bold transition-all hover:shadow-lg hover:-translate-y-1"
            onClick={() => setShowForm(true)}
          >
            <Plus size={20} /> Add New File
          </button>
        )}
      </div>

      {/* Form Section */}
      {showForm && (
        <div className="bg-[#fff5f5] p-8 rounded-3xl border border-[#ffcccc] mb-10 animate-in fade-in slide-in-from-top-4 duration-300">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="col-span-full flex justify-between items-center">
              <h3 className="text-xl font-bold text-[#800000] flex items-center gap-2">
                <FilePlus size={22} /> Upload New Asset
              </h3>
              <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-red-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">File Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Winter Catalog 2026"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none bg-white"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Select File*</label>
              <input
                type="file"
                name="file"
                onChange={handleChange}
                className="p-2 border border-gray-200 rounded-xl bg-white file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-[#800000] file:text-white cursor-pointer"
                required
              />
            </div>

            <div className="col-span-full flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What is this file for?"
                rows="3"
                className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#800000] outline-none bg-white resize-none"
              />
            </div>

            <div className="col-span-full flex gap-4 pt-4">
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center gap-2 bg-[#28a745] hover:bg-[#218838] text-white py-3 px-8 rounded-xl font-bold transition-all disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                Save Asset
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

      {/* Asset List */}
      <div className="space-y-4">
        {(!Array.isArray(files) || files.length === 0) ? (
          <div className="text-center p-16 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-bold">No assets found in the library.</p>
          </div>
        ) : (
          files.map((file) => (
            <div 
              key={file._id}
              className="flex justify-between items-center bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex gap-5 items-center">
                <div className="w-16 h-16 bg-[#fff5f5] text-[#800000] rounded-xl flex items-center justify-center group-hover:bg-[#800000] group-hover:text-white transition-all">
                  <FileText size={28} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-[#800000] transition-colors">
                    {file.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1">
                    {file.description || "No description provided."}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <a
                  href={`${API_URL}${file.fileUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 text-[#800000] bg-[#fff5f5] hover:bg-[#800000] hover:text-white rounded-xl transition-all"
                  title="View/Download"
                >
                  <ExternalLink size={20} />
                </a>
                <button 
                  className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  onClick={() => handleDelete(file._id)}
                  title="Delete"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DownloadsAdmin;