import React from "react";

function Vision() {
  return (
    <div className="relative w-full h-[50vh] bg-center bg-cover bg-no-repeat flex justify-center items-center overflow-hidden max-[992px]:h-[40vh] max-[576px]:h-[35vh]" style={{ backgroundImage: "url('/images/2.png')" }}>
      <div className="absolute inset-0 bg-[rgba(139,0,0,0.7)] flex justify-center items-center animate-fadeIn">
        <h1 className="relative color-white text-[clamp(28px,6vw,64px)] text-center font-bold tracking-[1px] animate-fadeInUp max-[992px]:text-[clamp(24px,5vw,48px)] max-[576px]:text-[clamp(20px,6vw,36px)]">Our Vision &amp; Mission</h1>
      </div>
    </div>
  );
}

export default Vision;
