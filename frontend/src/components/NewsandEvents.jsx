import React, { useEffect, useState } from "react";
// Import API constants and API_BASE_URL
import { CONTENT_API, API_BASE_URL, API_URL } from "../api";

function NewsandEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract the root domain for file URLs: API_BASE_URL
  const baseDomainUrl = API_URL;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(CONTENT_API.EVENTS);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-[1100px] mx-auto p-[40px_20px] text-center">
      <div className="mb-[25px]">
        <h2 className="text-[2rem] font-bold text-[#8B0000] relative inline-block md:text-[1.6rem]">News & Events</h2>
      </div>

      <div className="mb-[30px]">
        {loading ? (
          <p className="text-center">Loading events...</p>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-[22px]">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-[12px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col animate-fadeInUp">
                <img
                  // FIXED: Use baseDomainUrl (API_BASE_URL) for image path
                  src={`${baseDomainUrl}${event.imageUrl || "/images/default.jpg"}`}
                  alt={event.title}
                  className="w-full h-[180px] object-cover"
                />
                <div className="p-[18px] flex flex-col flex-grow text-left">
                  <div className="text-[0.9rem] text-[#888] mb-[10px] flex items-center gap-[6px]">
                    <i className="far fa-calendar-alt"></i>{" "}
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="text-[1.2rem] font-semibold mb-[10px] text-[#333] md:text-[1.05rem]">{event.title}</h3>
                  <p className="flex-grow text-[0.95rem] text-[#555] mb-[15px] leading-[1.6] md:text-[0.9rem]">
                    {event.description?.slice(0, 150)}...
                  </p>
                  <a href={`/event/${event._id}`} className="self-start p-[8px_14px] bg-[#8B0000] text-white text-[0.9rem] font-semibold rounded-[6px] no-underline transition-colors duration-300 hover:bg-[#660000]">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No events available right now.</p>
        )}
      </div>

      {/* Facebook Embed (from backend or static fallback) */}
      {/* <div className="grid grid-cols-1 gap-[22px]">
        <div className="flex justify-center mt-[20px] px-[15px] w-full md:px-[10px]">
          <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid02RNcgap3nebD4Wr5ZrgXdMo7h3A1Pri9EQzFL7hPLgT3Wv39cYZCiFRCmtWJVNPsul%26id%3D61577878923296&show_text=true&width=500" width="500" height="250" style={{ border: "none", overflow: "hidden" }} scrolling="no" frameborder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="SMC Facebook Page"
          ></iframe>
        </div>
      </div> */}

      <div className="grid grid-cols-1 gap-[22px]">
        <div className="flex justify-center mt-[20px] px-[15px] w-full md:px-[10px]">
          <iframe
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F61577878923296&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true"
            width="500"
            height="600"
            style={{ border: "none", overflow: "hidden" }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="SMC Facebook Page"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default NewsandEvents;