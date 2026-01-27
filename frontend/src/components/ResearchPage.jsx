import React, { useEffect, useState } from "react";
// Import API constants and API_BASE_URL
import { CONTENT_API, API_BASE_URL, API_URL } from "../api";

function ResearchPage() {
  const [research, setResearch] = useState([]);

  // Extract the root domain for file URLs: API_BASE_URL
  // const baseDomainUrl = API_BASE_URL.replace("/api", "");
  
  const fetchResearch = async () => {
    try {
      // FIXED: Use CONTENT_API.RESEARCH
      const res = await fetch(CONTENT_API.RESEARCH);
      const data = await res.json();
      setResearch(data);
    } catch (err) {
      console.error("Error fetching research:", err);
    }
  };
  useEffect(() => {
    fetchResearch();
  }, []);

  return (
    <div className="max-w-[1000px] mx-auto p-[40px_20px] text-center">
      <div className="section5-title">
        <h2 className="text-[2rem] font-bold text-[#8B0000]/70 mb-[25px] relative inline-block md:text-[1.5rem]">Recent Papers & Projects</h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[20px]">
          {research.length === 0 ? (
            <div className="col-span-full bg-[#fffdf5] border border-dashed border-[#ccc] rounded-[10px] p-[30px] text-center text-[#666] text-[1.1rem] animate-fadeIn">
              <i className="far fa-sad-tear text-[2rem] text-[#8B0000]/70 mb-[10px]"></i>
              <p>No research papers or projects yet.</p>
            </div>
          ) : (
            research.map((item) => (
              <div key={item._id} className="bg-white rounded-[12px] p-[20px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col animate-fadeInUp md:p-[16px]">
                <h3 className="m-[0_0_10px] text-[1.2rem] font-semibold text-[#333] md:text-[1.05rem]">{item.title}</h3>
                <p className="flex-grow text-[0.95rem] text-[#555] m-[0_0_12px] leading-[1.6]">{item.description}</p>
                {item.fileUrl && (
                  <a
                    // FIXED: Use baseDomainUrl to ensure correct file link
                    href={`${API_URL}${item.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.95rem] font-semibold text-[#8B0000] no-underline mb-[8px] transition-colors duration-300 hover:text-[#B22222]"
                  >
                    📄 View File
                  </a>
                )}
                <span className="text-[0.8rem] text-[#888]">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ResearchPage;