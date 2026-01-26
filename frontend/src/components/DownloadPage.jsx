import React from "react";
import { Download } from "lucide-react";

const DownloadsPage = () => {
  const downloadItems = [
    {
      id: 1,
      title: "Admission Booklet SMC",
      fileUrl: "/path-to-your-booklet.pdf", // Aapki PDF ya image ka path
    },
  ];

  const handleDownload = (url, filename) => {
    // Hidden link create kar ke download trigger karne ka tarika
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename || "Admission-Booklet-SMC.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading - Exact Maroon Color */}
        <div className="text-center mb-12">
          <h2 className="text-[#8B0000] text-5xl font-bold  tracking-tight">
            Downloads
          </h2>
        </div>

        {/* Download Row - Styled as per Screenshot */}
        <div className="max-w-5xl mx-auto">
          {downloadItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-[0_2px_15px_rgba(0,0,0,0.08)] border-l-[6px] border-[#8B0000] p-6 rounded-sm mb-4"
            >
              {/* File Title */}
              <h3 className="text-[#333] text-xl font-bold">{item.title}</h3>

              {/* Download Button */}
              <button
                onClick={() => handleDownload(item.fileUrl, item.title)}
                className="flex items-center gap-2 bg-[#7A1515] hover:bg-[#8B0000] text-white px-6 py-2.5 rounded-md font-semibold transition-colors duration-200"
              >
                <Download size={18} strokeWidth={3} />
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;
