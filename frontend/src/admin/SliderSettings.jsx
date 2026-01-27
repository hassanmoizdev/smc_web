import React, { useState, useEffect } from "react";
import { SETTINGS_API, API_BASE_URL } from "../api";
import { 
  Image as ImageIcon, 
  Plus, 
  Save, 
  Trash2, 
  UploadCloud, 
  Link as LinkIcon,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";

function SliderSettings() {
  const [slides, setSlides] = useState([]);
  const [popup, setPopup] = useState({ show: false, type: "", message: "" });
  const [isSaving, setIsSaving] = useState(false);

  const baseDomainUrl = API_BASE_URL.replace("/api", "");
  const SLIDER_API_URL = `${SETTINGS_API.SLIDER}`;
  const UPLOAD_API_URL = `${SETTINGS_API.SLIDER}/upload`;
 //console.log(SLIDER_API_URL, UPLOAD_API_URL);

  const showPopup = (type, message) => {
    setPopup({ show: true, type, message });
    setTimeout(() => setPopup({ show: false, type: "", message: "" }), 3000);
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(SLIDER_API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setSlides(data?.slides || []);
      } catch (err) {
        console.error("Error fetching slider data:", err);
      }
    };
    fetchSlides();
  }, [SLIDER_API_URL]);

  const updateSlide = (index, value) => {
    const copy = [...slides];
    copy[index] = { ...copy[index], url: value };
    setSlides(copy);
  };

  const handleFileUpload = async (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      
      try {
        const res = await fetch(UPLOAD_API_URL, { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        
        const resData = await res.json();
        updateSlide(index, resData.url);
        showPopup("success", "Image uploaded successfully!");
      } catch (err) {
        showPopup("error", "Upload failed!");
      }
    }
  };

  const addSlide = () => setSlides((prev) => [...prev, { url: "" }]);
  const deleteSlide = (index) => setSlides((prev) => prev.filter((_, i) => i !== index));

  const saveAllSlides = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(SLIDER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      });
      if (!res.ok) throw new Error("Save failed");
      showPopup("success", "Homepage slider updated!");
    } catch (err) {
      showPopup("error", "Failed to save slider!");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto my-10 p-8 bg-white font-['Poppins',_sans-serif]">
      {/* Notifications */}
      {popup.show && (
        <div className={`fixed top-10 right-10 p-4 rounded-2xl text-white font-bold flex items-center gap-3 shadow-2xl z-[9999] animate-in fade-in slide-in-from-right-10 ${popup.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {popup.type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          {popup.message}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-6 border-b border-gray-100 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-[#fff5f5] text-[#800000] rounded-2xl">
            <ImageIcon size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#800000] tracking-tight">Hero Slider</h2>
            <p className="text-gray-500 font-medium">Manage main banners for Slider</p>
          </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-all"
            onClick={addSlide}
          >
            <Plus size={20} /> Add Slide
          </button>
          <button 
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#800000] text-white py-3 px-6 rounded-xl font-bold hover:bg-[#600000] shadow-lg shadow-red-900/20 transition-all disabled:opacity-50"
            onClick={saveAllSlides}
            disabled={isSaving}
          >
            {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Save Changes
          </button>
        </div>
      </div>

      {/* Content Grid */}
      {slides.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 text-center">
          <ImageIcon size={64} className="text-gray-200 mb-4" />
          <h3 className="text-xl font-bold text-gray-400">Your slider is empty</h3>
          <p className="text-gray-400 max-w-xs mx-auto mt-2">Add your first slide to start Slider.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {slides.map((s, i) => (
            <div key={i} className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col">
              {/* Image Preview Container */}
              <div className="relative h-64 bg-gray-100 overflow-hidden">
                {s.url ? (
                  <img
                    src={`${baseDomainUrl}${s.url}`}
                    alt={`slide-${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
                    <ImageIcon size={48} />
                    <span className="font-bold text-sm uppercase tracking-widest">No Image Selected</span>
                  </div>
                )}
                
                {/* Delete Button - Floating */}
                <button 
                  onClick={() => deleteSlide(i)}
                  className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-red-600 hover:text-white text-red-600 rounded-full shadow-lg backdrop-blur-sm transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              {/* Controls */}
              <div className="p-6 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <LinkIcon size={12} /> Image Path
                  </label>
                  <input
                    type="text"
                    placeholder="Enter manual URL or upload below..."
                    value={s.url || ""}
                    onChange={(e) => updateSlide(i, e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:ring-2 focus:ring-[#800000] outline-none transition-all"
                  />
                </div>

                <div className="relative">
                  <input
                    type="file"
                    id={`file-${i}`}
                    accept="image/*"
                    onChange={(e) => handleFileUpload(i, e)}
                    className="hidden"
                  />
                  <label 
                    htmlFor={`file-${i}`}
                    className="flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-[#800000]/20 rounded-2xl text-[#800000] font-bold cursor-pointer hover:bg-[#fff5f5] hover:border-[#800000] transition-all"
                  >
                    <UploadCloud size={20} />
                    {s.url ? "Replace Image" : "Upload Banner"}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SliderSettings;