import React, { useState, useEffect } from 'react';
import { FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';

const AdvertisementModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal when component mounts (website load)
    // Using sessionStorage so it doesn't pop up on every single navigation within the same session
    const hasSeenModal = sessionStorage.getItem('hasSeenNoticeModal_pget2026');
    if (!hasSeenModal) {
      setIsOpen(true);
      sessionStorage.setItem('hasSeenNoticeModal_pget2026', 'true');
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] border border-gray-100 transform transition-all animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#8B0000] text-white px-4 py-3 sm:px-5 sm:py-3.5 flex justify-between items-center relative overflow-hidden shrink-0 shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-red-950 via-[#8B0000] to-red-900 opacity-60"></div>
          <div className="flex items-center gap-2.5 relative z-10">
            <span className="text-xl sm:text-2xl animate-pulse">📢</span> 
            <h2 className="text-base sm:text-lg font-bold tracking-wide leading-tight">
              Important Announcement
            </h2>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-100 hover:bg-white/20 transition-all p-2 rounded-full relative z-10 flex-shrink-0"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Body - Notice Image */}
        <div className="p-3 sm:p-4 max-h-[72vh] overflow-y-auto bg-gray-50 flex flex-col items-center">
          <a 
            href="/images/image.png" 
            target="_blank" 
            rel="noopener noreferrer"
            title="Click to view full image in a new tab"
            className="group block relative w-full rounded-xl overflow-hidden shadow-md bg-white border border-gray-200 cursor-zoom-in"
          >
            <img 
              src="/images/image.png" 
              alt="University of Health Sciences Lahore - Corrigendum: Postgraduate Entrance Test (PGET) 2026 Extension in Application Submission Date"
              className="w-full h-auto object-contain block transition-transform duration-300 group-hover:scale-[1.01]"
              loading="eager"
            />
            <div className="absolute bottom-2 right-2 bg-black/60 hover:bg-black/80 text-white text-xs px-2.5 py-1 rounded-md backdrop-blur-sm opacity-90 transition-opacity flex items-center gap-1.5 pointer-events-none">
              <FaExternalLinkAlt size={11} />
              <span>Tap / Click to expand</span>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="bg-white px-4 py-3 sm:px-5 sm:py-3.5 flex flex-wrap items-center justify-between gap-2.5 border-t border-gray-200 shrink-0">
          <button 
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
          
          <div className="flex items-center gap-2">
            <a
              href="/images/image.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FaExternalLinkAlt size={12} />
              <span>View Full</span>
            </a>
            <a
              href="/images/image.png"
              download="UHS_PGET_2026_Corrigendum.png"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-[#8B0000] text-white rounded-lg hover:bg-red-800 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <FaDownload size={12} />
              <span>Download Notice</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertisementModal;
