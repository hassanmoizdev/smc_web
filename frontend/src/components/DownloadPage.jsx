import React, { useEffect, useState, useCallback } from "react";
import { Download } from "lucide-react";
import { API_URL, CONTENT_API } from "../api";

const DownloadsPage = () => {
  const [downloadItems, setDownloadItems] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const fetchDownloads = useCallback(async () => {
    try {
      const res = await fetch(CONTENT_API.DOWNLOADS.get);
      const data = await res.json();
      setDownloadItems(data);
    } catch (err) {
      console.error("Error fetching downloads:", err);
    }
  }, []);

  useEffect(() => {
    fetchDownloads();
  }, []);

  // Refactored download handler to bypass cross-origin restrictions
  const handleDownload = useCallback(async (fileUrl, title) => {
    setLoadingId(fileUrl);
    // Construct full URL if it's a relative path, otherwise use as is (for external links)
    const fullUrl = fileUrl.startsWith('http') ? fileUrl : `${API_URL}${fileUrl}`;

    try {
      const response = await fetch(fullUrl);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      // Determine extension from fileUrl
      const extension = fileUrl.split('.').pop().split(/[?#]/)[0];
      // If title already has an extension, use it; otherwise append detected extension
      const filename = title.includes('.') ? title : `${title}.${extension}`;

      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: try opening in new tab
      window.open(fullUrl, "_blank");
    } finally {
      setLoadingId(null);
    }
  }, []);

  return (
    <div className="bg-white py-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-[#8B0000] text-5xl font-bold tracking-tight">
            Downloads
          </h2>
          <p className="mt-4 text-gray-600">  </p>
        </header>

        <div className="max-w-5xl mx-auto space-y-4">
          {downloadItems.length > 0 ? (
            downloadItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center justify-between bg-white shadow-md border-l-[6px] border-[#8B0000] p-6 rounded-sm transition-transform hover:scale-[1.01]"
              >
                <h3 className="text-[#333] text-xl font-bold mb-4 sm:mb-0">
                  {item.title}
                </h3>

                <button
                  onClick={() => handleDownload(item.fileUrl, item.title)}
                  disabled={loadingId === item.fileUrl}
                  className="flex items-center gap-2 bg-[#7A1515] hover:bg-[#8B0000] disabled:bg-gray-400 text-white px-6 py-2.5 rounded-md font-semibold transition-all duration-200"
                >
                  <Download className={loadingId === item.fileUrl ? "animate-bounce" : ""} size={18} strokeWidth={3} />
                  {loadingId === item.fileUrl ? "Processing..." : "Download"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No downloads available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadsPage;