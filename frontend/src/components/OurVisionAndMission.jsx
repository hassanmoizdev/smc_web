import React from "react";

function OurVisionAndMission() {
  return (
    <div className="max-w-[1140px] mx-auto px-[15px] font-['Poppins',_sans-serif]">
      <div className="flex flex-wrap relative min-h-[380px] bottom-[50px] rounded-[10px] overflow-hidden bg-white shadow-[0_6px_18px_rgba(0,0,0,0.25)] animate-fadeInUp max-[992px]:flex-col max-[992px]:bottom-10 max-[576px]:min-h-auto max-[576px]:bottom-[30px]">
        <div className="flex-[1_1_35%] p-0 bg-no-repeat bg-center bg-cover relative overflow-hidden max-[992px]:flex-[1_1_100%] max-[992px]:text-center" style={{ backgroundImage: "url('/images/2.png')" }}>
          <div className="absolute inset-0 bg-red-800/85 flex justify-center items-center text-[clamp(22px,4vw,36px)] font-bold leading-[1.4] uppercase text-center text-white animate-zoomIn max-[576px]:text-[clamp(18px,5vw,26px)] max-[576px]:p-5">
            OUR <br />
            VISION <br />
            &amp; <br />
            MISSION
          </div>
        </div>

        <div className="flex-[1_1_65%] p-[40px_30px] flex flex-col justify-center animate-fadeIn max-[992px]:flex-[1_1_100%] max-[992px]:text-center max-[576px]:p-[25px_18px]">
          <h2 className="text-[clamp(20px,2.2vw,32px)] font-bold text-red-800 mb-[18px] border-l-[5px] border-[#8B0000] pl-3 max-[992px]:border-l-0 max-[992px]:pl-0 max-[992px]:text-center">Our Vision &amp; Mission</h2>
          <p className="text-[clamp(15px,1vw,18px)] leading-[1.7] text-[#333] m-0">
           Sargodha Medical College, Sargodha is committed to provide competency based medical education to produce socially accountable health professionals by fostering critictal thinking effective community, services, and life long learning, enhancing clinical and research skills with ethical and professional values.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurVisionAndMission;
