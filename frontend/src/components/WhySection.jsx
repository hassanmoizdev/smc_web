import React from "react";

function Section1() {
  return (
    <div className="font-['Poppins',_sans-serif] bg-[#f9f9f9] text-[#333] p-[40px_80px] flex flex-col gap-[60px] max-[1200px]:p-[30px_80px] max-[992px]:p-[25px_60px] max-[768px]:p-[20px_35px] max-[768px]:gap-10 max-[576px]:p-[18px_20px] max-[576px]:gap-[30px]">
      <div className="flex flex-wrap items-center gap-10 max-[768px]:flex-col">
        <div className="flex-1 min-w-[280px] animate-fadeInLeft">
          <h2 className="text-[#8B0000] tracking-[-0.02em] leading-[1.2] text-[2.8em] font-bold mb-5 relative animate-fadeInUp max-[1200px]:text-[2.4em] max-[992px]:text-[2.2em] max-[768px]:text-[2em] max-[576px]:text-[1.9em] max-[400px]:text-[1.7em]">
            Why
            <br />
            Choose
            <br />
            SMC
          </h2>
          <p className="tracking-[-0.02em] text-[16px] leading-[1.6] font-normal text-[#666] max-[576px]:text-[15px] max-[400px]:text-[14px]">
            Sargodha Medical College offers an outstanding learning environment
            for our graduates to practice in the modern and ever-growing social
            care and public health sector. The medical College offers MBBS five
            years degree program with due recognition from Pakistan Medical and
            Dental Council and FCPS/MS/MD degree programs in collaboration with
            the University of Health Sciences. Our research and clinical
            practice offer us opportunities for working in partnership with
            healthcare providers in the region to provide a variety of
            high-quality health service.{" "}
          </p>
        </div>

        {/* Image Container: Removed flex-1 on mobile to allow full width */}
        <div className="flex-1 min-w-[280px] w-full text-center relative animate-fadeInRight max-[768px]:min-w-full">
          <img
            src="/images/2.png"
            alt="SMC Campus"
            /* CHANGED: 
         1. max-[768px]:max-w-[100%] -> allows it to fill the width
         2. max-[768px]:top-0 -> removed the top offset on mobile so it doesn't overlap text
      */
            className="max-w-full rounded-xl relative  shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-[1.05] 
      max-[768px]:max-w-[100%] max-[768px]:w-full max-[768px]:mx-auto max-[768px]:top-0"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-10 max-[768px]:flex-col max-[768px]:text-center">
        <div
          className="flex-1 max-w-[420px] min-h-[320px] bg-cover bg-center flex items-center justify-center rounded-[12px] overflow-hidden animate-zoomIn 
  max-[768px]:mx-auto 
  max-[768px]:max-w-full 
  max-[768px]:w-full 
  max-[768px]:min-h-[450px]" /* INCREASED: From 220px to 450px for mobile impact */
          style={{ backgroundImage: "url('/images/2.png')" }}
        >
          <div
            className="flex-1 w-full max-w-[420px] min-h-[320px] bg-cover bg-center flex items-center justify-center rounded-[15px] overflow-hidden relative animate-zoomIn 
  max-[768px]:mx-auto 
  max-[768px]:max-w-full 
  max-[768px]:min-h-[480px]"
            style={{ backgroundImage: "url('/images/2.png')" }}
          >
            {/* Dark Overlay - This makes the maroon box pop */}
            <div className="absolute inset-0 bg-black/30"></div>

            {/* Mission & Vision Box - Standard BG color for maximum compatibility */}
            <div
              className="relative z-20 bg-[#8B0000] text-white text-center p-[40px] rounded-[12px] -rotate-2 shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-transform duration-400 hover:rotate-0 hover:scale-[105%] 
    max-[1200px]:text-[1.4em] 
    max-[1200px]:p-[30px] 
    max-[768px]:text-[1.8em] 
    max-[768px]:p-12 
    max-[576px]:text-[1.5em]"
            >
              {/* Inner Border for that professional institutional look */}
              <div className="border-2 border-white/20 p-4 rounded-lg">
                <span className="font-black tracking-tighter block leading-none">
                  OUR
                </span>
                <span className="font-black tracking-tighter block leading-none mt-1">
                  VISION
                </span>
                <span className="text-[0.8em] block my-2">&</span>
                <span className="font-black tracking-tighter block leading-none">
                  MISSION
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 p-[0_20px] min-w-[280px] animate-fadeInLeft">
          <h2 className="text-[#8B0000] text-[2.8em] font-bold p-[0_22px] mb-5 relative animate-fadeInUp max-[1200px]:text-[2.4em] max-[992px]:text-[2.2em] max-[768px]:text-[2em] max-[576px]:text-[1.9em] max-[400px]:text-[1.7em]">
            Our Vision & Mission
          </h2>
          <p className="text-[17px] leading-[1.6] font-normal text-[#666] max-[576px]:text-[15px] max-[400px]:text-[14px]">
            Sargodha Medical College (SMC), Sargodha is committed to provide
            competency based medical education to produce socially accountable
            health professionals by fostering critical thinking, effective
            community services, and lifelong learning, enhancing clinical and
            research skills with ethical and professional values.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section1;
