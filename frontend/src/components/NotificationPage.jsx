import React from "react";
import { ExternalLink } from "lucide-react";

const NotificationsPage = () => {
  const notifications = [
    {
      id: 1,
      title: "PTM NOTICE",
      image: "/images/noti.jpg", // Preview ke liye
      fileUrl: "/images/noti.jpg", // Click par khulne/download ke liye
    },
  ];

  const handleAction = (url) => {
    // Ye image ko doosray tab mein open karega jahan se right-click karke download ho sakti hai
    //const newTab = window.open(url, "_blank", "noopener,noreferrer");

    // Agar aap chahte hain ke click karte hi direct download trigger ho (bina show kiye):
    /*
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Notification-Image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    */
  };

  return (
    <div className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[#8B0000] text-4xl md:text-5xl font-extrabold uppercase inline-block relative pb-4">
            Notifications
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-[4px] bg-[#8B0000]"></span>
          </h2>
        </div>

        {/* Card Layout */}
        <div className="flex justify-center md:justify-start">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden border border-gray-100 flex flex-col items-center p-4 transition-all hover:shadow-2xl"
              style={{ width: "280px" }}
            >
              {/* Image Preview Area */}
              <div
                className="w-full h-[280px] bg-gray-50 rounded-lg overflow-hidden border border-gray-200 mb-6 cursor-pointer group relative"
                onClick={() => handleAction(item.fileUrl)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-top transition-transform group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
              </div>

              {/* Notice Title */}
              <h3 className="text-[#8B0000] text-2xl font-black uppercase mb-6 text-center">
                {item.title}
              </h3>

              {/* View & Download Button */}
              <button
                onClick={() => handleAction(item.fileUrl)}
                className="w-full bg-[#8B0000] text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 font-bold text-lg hover:bg-[#700000] transition-colors"
              >
                View More
                <ExternalLink size={20} strokeWidth={3} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
