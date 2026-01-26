import React from "react";

function Vision() {
  return (
    <>
      <div
        /* Banner size: 80vh for mobile, 50vh for tablets, 60vh for desktop */
        className="relative w-full h-[80vh] lg:h-[60vh] sm:h-[50vh] bg-center bg-cover bg-no-repeat flex justify-center items-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/2.png')",
        }}
      >
        {/* THE "DULL" EFFECT LAYER: Matches your Admission component exactly */}
        <div className="absolute inset-0 bg-black/10 backdrop-brightness-[0.4] backdrop-grayscale-[10%]"></div>

        {/* CONTENT LAYER */}
        <div className="absolute inset-0 flex flex-col justify-center items-center animate-fade-in px-6">
          {/* Subtle Gold Subtitle */}
          <p className="text-[#FFD700] font-bold tracking-[4px] uppercase text-xs md:text-sm mb-4 animate-slide-up">
            Sargodha Medical College
          </p>

          <h1
            className="
             relative text-white font-black text-center
             text-4xl
             /* Responsive text scaling */
             sm:text-[clamp(26px,8vw,42px)]
             lg:text-[clamp(32px,10vw,72px)]
             animate-slide-up
           
            "
          >
            Our Vision & Mission
          </h1>

          {/* Decorative Gold Line */}
          <div className="mt-6 flex items-center gap-3 animate-slide-up">
            <span className="h-[2px] w-10 bg-[#FFD700]/50"></span>
            <i className="fas fa-eye text-[#FFD700] text-xl"></i>
            <span className="h-[2px] w-10 bg-[#FFD700]/50"></span>
          </div>
        </div>

        {/* The Professional Maroon Bottom Glow */}
        <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-[#8B0000]/40 to-transparent"></div>
      </div>
    </>
  );
}

export default Vision;
