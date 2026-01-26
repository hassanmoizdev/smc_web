import React from "react";
import { Link } from "react-router-dom";

const mockEvents = [
  {
    _id: "1",
    title: "Interview for the post of Demonstrators",
    date: "December 19, 2025",
    description:
      "It is informed that the interviews for the post of demonstrator at Sargodha Medical College, Sargodha is going to be started soon...",
    imageUrl: "/images/inter.jpg", // Updated to your image
  },
  {
    _id: "2",
    title: "Independence Day Flag Raising Ceremony",
    date: "August 14, 2025",
    description:
      "Sargodha Medical College proudly celebrated Pakistan’s 77th Independence Day on 14 August with a dignified flag hoisting ceremony...",
    imageUrl: "/images/indi2.jpg", // Updated to your image
  },
  {
    _id: "3",
    title: "14 August Celebrations at Sargodha Medical College",
    date: "August 14, 2025",
    description:
      "The flag ceremony was held at the college at 9:00 AM, followed by an Independence Day event featuring a variety of student performances...",
    imageUrl: "/images/indi1.jpg", // Updated to your image
  },
];

function LatestNews() {
  return (
    <section className="bg-[#fcfcfc] py-12 md:py-24 px-4 sm:px-6">
      <div className="max-w-[1250px] mx-auto text-center">
        {/* Section Heading */}
        <div className="mb-10 md:mb-16">
          <h2 className="text-[#8B0000] text-[7.5vw] sm:text-4xl md:text-5xl font-black mb-4 relative pb-5 tracking-tighter uppercase inline-block whitespace-nowrap">
            Latest News & Events
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 md:w-20 h-1 md:h-1.5 bg-[#8B0000] rounded-full"></span>
          </h2>
        </div>

        {/* The Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {mockEvents.map((ev) => (
            <div
              key={ev._id}
              className="flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 text-left transition-transform duration-300 hover:-translate-y-2"
            >
              {/* Card Image */}
              <div className="h-52 sm:h-48 md:h-56 w-full overflow-hidden">
                <img
                  src={ev.imageUrl}
                  alt={ev.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                {/* Date */}
                <div className="flex items-center text-[#8B0000] font-bold mb-3 text-[13px] md:text-sm">
                  <i className="far fa-calendar-alt mr-2"></i>
                  <span>{ev.date}</span>
                </div>

                {/* Event Title */}
                <h3 className="text-[20px] md:text-[22px] font-bold text-[#333] mb-3 leading-tight tracking-tight line-clamp-2">
                  {ev.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-[14px] md:text-[15px] leading-relaxed mb-6 flex-grow line-clamp-3">
                  {ev.description}
                </p>

                {/* Read More Button - Matching your Gradient Style */}
                <Link
                  to={`/event/${ev._id}`}
                  className="bg-gradient-to-r from-[#800000] to-[#a00000] text-white py-2.5 px-7 rounded-md font-bold text-xs uppercase self-start hover:brightness-110 transition-all shadow-md"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 md:mt-16">
          <Link
            to="/news-events"
            className="inline-flex items-center gap-2 border-2 border-[#8B0000] text-[#8B0000] py-3 px-8 rounded-lg font-bold text-sm tracking-wide transition-all hover:bg-[#8B0000] hover:text-white uppercase"
          >
            View All News & Events{" "}
            <i className="fas fa-arrow-right text-[10px]"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestNews;
