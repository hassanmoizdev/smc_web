import React, { useEffect, useState } from "react";
import { Plus, Trash2, Edit3, X, Save, School } from "lucide-react";
import { CONTENT_API } from "../api";
const DepartmentsAdmin = () => {
  const [depts, setDepts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Basic Info");
  
  const [formData, setFormData] = useState({
    name: "", code: "", hod: "", totalFaculty: 0, foundedYear: "",
    description: "", logo: null, isActive: true, programs: [],
    facilities: "", researchAreas: "", contactEmail: "", contactPhone: ""
  });

  const [currentProgram, setCurrentProgram] = useState({
    name: "", duration: "", degreeType: "", description: ""
  });

  const fetchDepartments = async () => {
    try {
      const res = await fetch(`${CONTENT_API}`);
      const data = await res.json();
      setDepts(Array.isArray(data) ? data : data.departments || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => { fetchDepartments(); }, []);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const addProgramToList = () => {
    if (!currentProgram.name || !currentProgram.duration) return alert("Please fill program name and duration");
    setFormData(prev => ({
      ...prev,
      programs: [...prev.programs, { ...currentProgram, id: Date.now() }]
    }));
    setCurrentProgram({ name: "", duration: "", degreeType: "", description: "" });
  };

  const removeProgram = (index) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Department name is required");

    const newDept = {
      ...formData,
      id: Date.now(),
      logoPreview: formData.logo ? URL.createObjectURL(formData.logo) : null,
    };

    setDepts((prev) => [newDept, ...prev]);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "", code: "", hod: "", totalFaculty: 0, foundedYear: "",
      description: "", logo: null, isActive: true, programs: [],
      facilities: "", researchAreas: "", contactEmail: "", contactPhone: ""
    });
    setShowForm(false);
    setActiveTab("Basic Info");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) setDepts(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="p-6 lg:p-10 space-y-8 animate-in fade-in duration-500 bg-gray-50 min-h-screen">
      {/* SMC Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <div className="flex items-center gap-4">
            <div className="bg-[#800000] p-2.5 rounded-lg text-white">
                <School size={28} />
            </div>
            <div>
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">SMC <span className="text-[#800000]">DEPARTMENTS</span></h1>
                <p className="text-gray-500 text-sm font-medium">Sargodha Medical College Admin Portal</p>
            </div>
        </div>
        {!showForm && (
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-[#800000] hover:bg-[#600000] text-white px-6 py-2.5 rounded-md font-bold transition shadow-lg active:scale-95">
            <Plus size={18} /> Add New Department
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-xl border-t-4 border-[#800000] overflow-hidden">
          {/* Maroon Tab Navigation */}
          <div className="flex bg-gray-100 border-b">
            {["Basic Info", "Programs & Courses", "Additional Details"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? "bg-white text-[#800000] border-b-2 border-[#800000]" : "text-gray-400 hover:text-[#800000] hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
            <button onClick={resetForm} className="ml-auto px-4 text-gray-400 hover:text-red-600 transition-colors"><X size={20} /></button>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* --- TAB 1: BASIC INFO --- */}
            {activeTab === "Basic Info" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm animate-in fade-in duration-300">
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-[#800000] uppercase mb-1">Department Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Department of Anatomy" className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[11px] font-black text-[#800000] uppercase mb-1">Description *</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none h-24 resize-none" placeholder="Enter department academic overview..." />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#800000] uppercase mb-1">Code *</label>
                  <input type="text" name="code" value={formData.code} onChange={handleChange} placeholder="e.g., SMC-ANA" className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#800000] uppercase mb-1">Head of Department *</label>
                  <input type="text" name="hod" value={formData.hod} onChange={handleChange} placeholder="Dr. Name" className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#800000] uppercase mb-1">Established Year</label>
                  <input type="text" name="foundedYear" value={formData.foundedYear} onChange={handleChange} placeholder="2026" className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-[#800000] uppercase mb-1">Faculty Strength</label>
                  <input type="number" name="totalFaculty" value={formData.totalFaculty} onChange={handleChange} placeholder="0" className="w-full p-2.5 border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-[11px] font-black text-[#800000] uppercase mb-1">Logo / Representative Image</label>
                    <input type="file" name="logo" accept="image/*" onChange={handleChange} className="w-full text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#800000] file:text-white hover:file:bg-[#600000] cursor-pointer border border-dashed border-gray-300 p-2" />
                </div>
                <div className="md:col-span-2 flex items-center gap-2">
                  <input type="checkbox" name="isActive" id="isActive" checked={formData.isActive} onChange={handleChange} className="w-4 h-4 accent-[#800000]" />
                  <label htmlFor="isActive" className="text-xs font-bold text-gray-700">Official Department Status: Active</label>
                </div>
              </div>
            )}

            {/* --- TAB 2: PROGRAMS & COURSES --- */}
            {activeTab === "Programs & Courses" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="bg-gray-50 p-5 rounded border border-gray-200 space-y-4">
                  <h4 className="text-[11px] font-black text-[#800000] uppercase">Add New Academic Program</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input type="text" value={currentProgram.name} onChange={(e) => setCurrentProgram({...currentProgram, name: e.target.value})} placeholder="Program Name (MBBS, etc)" className="p-2.5 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-[#800000]" />
                    <input type="text" value={currentProgram.duration} onChange={(e) => setCurrentProgram({...currentProgram, duration: e.target.value})} placeholder="Duration (5 Years)" className="p-2.5 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-[#800000]" />
                    <input type="text" value={currentProgram.degreeType} onChange={(e) => setCurrentProgram({...currentProgram, degreeType: e.target.value})} placeholder="Degree (Undergrad)" className="p-2.5 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-[#800000]" />
                  </div>
                  <div className="flex gap-3">
                    <textarea value={currentProgram.description} onChange={(e) => setCurrentProgram({...currentProgram, description: e.target.value})} placeholder="Short program description..." className="flex-1 p-2.5 text-sm border border-gray-300 rounded h-12 outline-none focus:ring-1 focus:ring-[#800000] resize-none" />
                    <button type="button" onClick={addProgramToList} className="bg-[#800000] text-white px-6 font-bold text-xs uppercase rounded hover:bg-[#600000] transition">Add</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {formData.programs.map((prog, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 bg-white border-l-4 border-[#800000] shadow-sm rounded-r">
                        <div><p className="text-xs font-black text-gray-800">{prog.name}</p><p className="text-[10px] text-gray-500 font-bold uppercase">{prog.degreeType} • {prog.duration}</p></div>
                        <button type="button" onClick={() => removeProgram(idx)} className="text-gray-400 hover:text-red-600 p-1"><Trash2 size={16} /></button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* --- TAB 3: ADDITIONAL DETAILS --- */}
            {activeTab === "Additional Details" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <div>
                  <label className="text-[11px] font-black text-[#800000] uppercase block mb-1">Infrastructure & Facilities</label>
                  <input type="text" name="facilities" value={formData.facilities} onChange={handleChange} placeholder="Anatomy Lab, Museum, Dissection Hall..." className="w-full p-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                </div>
                <div>
                  <label className="text-[11px] font-black text-[#800000] uppercase block mb-1">Key Research Areas</label>
                  <input type="text" name="researchAreas" value={formData.researchAreas} onChange={handleChange} placeholder="Clinical Anatomy, Histopathology..." className="w-full p-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[11px] font-black text-[#800000] uppercase block mb-1">Department Email</label>
                    <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="anatomy@smc.edu.pk" className="w-full p-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                  </div>
                  <div>
                    <label className="text-[11px] font-black text-[#800000] uppercase block mb-1">Contact Extension</label>
                    <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="+92-48-XXXXXXX" className="w-full p-2.5 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#800000] outline-none" />
                  </div>
                </div>
              </div>
            )}

            {/* SMC Actions */}
            <div className="mt-10 flex gap-4 border-t pt-8">
              <button type="submit" className="flex items-center gap-2 bg-[#800000] hover:bg-[#600000] text-white px-10 py-3 rounded shadow-md font-black uppercase text-xs tracking-widest transition active:scale-95">
                <Save size={18} /> Save Department
              </button>
              <button type="button" onClick={resetForm} className="px-10 py-3 text-gray-500 font-bold uppercase text-xs tracking-widest hover:bg-gray-100 rounded transition border border-gray-200">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* SMC Table Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#800000] text-white text-[10px] font-black uppercase tracking-[0.15em]">
            <tr>
              <th className="px-6 py-5">Department Details</th>
              <th className="px-6 py-5">Code</th>
              <th className="px-6 py-5">HOD</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5 text-right">Options</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {depts.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-16 text-center text-gray-400 font-medium">No SMC Departments Registered Yet.</td></tr>
            ) : (
              depts.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      {d.logoPreview ? 
                        <img src={d.logoPreview} className="w-10 h-10 rounded-full border-2 border-[#800000]/10 object-cover" alt="" /> : 
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-[#800000] font-black text-xs border border-gray-200">{d.code?.substring(0,2) || 'SMC'}</div>
                      }
                      <div>
                        <div className="font-black text-gray-800 text-sm leading-tight uppercase tracking-tight">{d.name}</div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase">Sargodha Medical College • {d.foundedYear || 'Est. 2006'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-black text-gray-600">{d.code}</td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-700">{d.hod}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${d.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                      {d.isActive ? "Verified Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-[#800000] hover:bg-[#800000]/5 rounded-full transition-all"><Edit3 size={16} /></button>
                      <button onClick={() => handleDelete(d.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentsAdmin;