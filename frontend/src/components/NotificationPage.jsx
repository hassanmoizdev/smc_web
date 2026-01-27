import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { CONTENT_API, API_URL } from '../api';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${CONTENT_API.NOTIFICATIONS}`);
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-[#8B0000] text-3xl md:text-4xl font-extrabold uppercase inline-block relative pb-2">
            Notifications
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-[#8B0000]"></span>
          </h2>
        </div>

        {/* Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {notifications.map((item) => {
            const isExpanded = expandedId === item.id;
            
            return (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col p-3 transition-all duration-300 hover:shadow-xl ${
                  isExpanded ? "w-full sm:col-span-2 md:col-span-3 lg:col-span-4" : "w-[260px]"
                }`}
              >
                <div className={`${isExpanded ? "flex flex-col md:flex-row gap-5" : "flex flex-col"}`}>
                  {/* Image Preview Area */}
                  <div
                    className={`${
                      isExpanded ? "md:w-1/4 h-[220px]" : "w-full h-[200px]"
                    } bg-gray-50 rounded-md overflow-hidden border border-gray-100 cursor-pointer group relative`}
                    onClick={() => toggleExpand(item.id)}
                  >
                    <img
                      src={`${API_URL}${item.imageUrl}`}
                      alt={item.title}
                      className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Content Area */}
                  <div className={`flex-1 flex flex-col ${isExpanded ? "mt-0 justify-center" : "mt-3 text-center"}`}>
                    <h3 className={`text-[#8B0000] font-bold uppercase leading-tight mb-2 ${isExpanded ? "text-2xl" : "text-base"}`}>
                      {item.title}
                    </h3>

                    {/* Expandable Message Section */}
                    {isExpanded && (
                      <div className="text-gray-700 mb-4 animate-fadeIn">
                        <p className="text-sm md:text-base leading-relaxed">
                          {item.message || "No additional details available."}
                        </p>
                        {item.fileUrl && (
                            <a 
                                href={item.fileUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 mt-3 text-[#8B0000] text-sm font-bold hover:underline"
                            >
                                View Details <ExternalLink size={14} />
                            </a>
                        )}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => toggleExpand(item.id)}
                      className="w-full bg-[#8B0000] text-white py-2 px-4 rounded md text-sm font-bold hover:bg-[#700000] transition-colors mt-auto flex items-center justify-center gap-1"
                    >
                      {isExpanded ? "Less" : "View"}
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;