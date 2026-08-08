import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload } from 'react-icons/fa';

const AdvertisementModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal when component mounts (website load)
    // Using sessionStorage so it doesn't pop up on every single navigation within the same session
    const hasSeenModal = sessionStorage.getItem('hasSeenAdModal');
    if (!hasSeenModal) {
      setIsOpen(true);
      sessionStorage.setItem('hasSeenAdModal', 'true');
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl overflow-hidden my-8 transform transition-all animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="bg-[#8B0000] text-white px-5 py-4 sm:px-6 sm:py-5 flex justify-between items-start sm:items-center gap-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-[#8B0000] opacity-50"></div>
          <h2 className="text-xl sm:text-2xl font-bold flex items-start sm:items-center gap-3 relative z-10 leading-tight">
            <span className="text-2xl sm:text-3xl">📢</span> 
            <span>Faculty Vacancies – Maryam Nawaz Medical College</span>
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-100 hover:bg-white/20 transition-all p-2 rounded-full relative z-10 flex-shrink-0"
            aria-label="Close"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-8 max-h-[65vh] overflow-y-auto text-gray-800 custom-scrollbar">
          <p className="text-lg font-bold mb-5 text-[#8B0000] border-b pb-2">
            Maryam Nawaz Medical College, Mianwali is hiring:
          </p>
          
          <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-lg p-5 mb-7 shadow-inner">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li className="flex items-center gap-3 font-medium"><span className="text-blue-600 text-lg">🔹</span> Professors</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-blue-600 text-lg">🔹</span> Associate Professors</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-blue-600 text-lg">🔹</span> Assistant Professors</li>
              <li className="flex items-center gap-3 font-medium"><span className="text-blue-600 text-lg">🔹</span> Lecturers/Demonstrators</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
            📌 Eligibility & Instructions:
          </h3>
          <ul className="space-y-3 mb-8 text-gray-700 bg-gray-50 p-6 rounded-lg border border-gray-100">
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span><strong>Punjab domicile is mandatory.</strong></span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span>Submit application with attested copies of CNIC, domicile, educational, experience & research documents.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span>Government employees must apply through proper channel with NOC.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span>Recruitment as per Punjab Government Recruitment Policy 2022; all applicable quotas will be observed.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span>Appointment will be on a 3-year contract, extendable on satisfactory performance.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span>Bring original documents at the time of interview.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span>No TA/DA will be admissible.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#8B0000] font-bold">•</span>
              <span>Only shortlisted candidates will be called for interview.</span>
            </li>
          </ul>

          <div className="bg-[#8B0000]/5 border-l-4 border-[#8B0000] p-5 mb-2 rounded-r-lg">
            <p className="flex items-center gap-3 mb-3 text-lg">
              <span className="text-xl">📍</span> 
              <span><strong>Applications:</strong> Admin Office, Sargodha Medical College</span>
            </p>
            <p className="flex items-center gap-3 text-lg">
              <span className="text-xl">📞</span> 
              <span><strong>Queries:</strong> <a href="tel:0489232004" className="text-[#8B0000] hover:underline font-bold">048-9232004</a></span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-5 sm:px-8 flex flex-col sm:flex-row justify-end gap-3 border-t">
          <button 
            onClick={() => setIsOpen(false)}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium sm:mr-auto"
          >
            Close
          </button>
          <a
            href="/docs/Faculty Advertisement of Maryam Nawaz Sharif Medical College, Mianwali (1).pdf"
            download
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#8B0000] text-white rounded-lg hover:bg-red-800 transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaDownload /> Faculty Advertisement
          </a>
          <a
            href="/docs/Non-Teaching Staff (1).pdf"
            download
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <FaDownload /> Non-Teaching Staff
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementModal;
