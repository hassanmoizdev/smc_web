import React from "react";

function AddmitionCimg() {
  return (
    <>
      <div
        /* Height settings for mobile (80vh), tablet (50vh), and desktop (60vh) */
        className="relative w-full h-[80vh] lg:h-[60vh] sm:h-[50vh] bg-center bg-cover bg-no-repeat flex justify-center items-center overflow-hidden"
        style={{
          backgroundImage: "url('/images/4.png')",
        }}
      >
        {/* THE "DULL" EFFECT LAYER:
          1. brightness-[0.4]: Dims the image significantly.
          2. grayscale-[20%]: Subtly desaturates the colors to make it look 'dull' and professional.
          3. bg-black/50: Adds a semi-transparent black veil.
        */}
        <div className="absolute inset-0 bg-black/10 backdrop-brightness-[0.4] backdrop-grayscale-[10%]"></div>

        <div className="absolute inset-0 flex justify-center items-center animate-fade-in">
          <h1
            className="
             relative text-white font-black text-center
             text-4xl
             /* Responsive text scaling for iPhone 14 Pro Max and larger screens */
             sm:text-[clamp(26px,8vw,42px)]
             lg:text-[clamp(32px,10vw,72px)]
             animate-slide-up
            
             px-6
            "
          >
            Admission Criteria
          </h1>
        </div>

        {/* Optional: Subtle Maroon Bottom Glow to match site theme */}
        <div className="absolute bottom-0 w-full h-24 "></div>
      </div>
    </>
  );
}

export default AddmitionCimg;
