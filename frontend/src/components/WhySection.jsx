import React from "react";

function Section1() {
  return (
    <div className="font-['Poppins',_sans-serif] bg-[#f9f9f9] text-[#333] p-[40px_80px] flex flex-col gap-[60px] max-[1200px]:p-[30px_80px] max-[992px]:p-[25px_60px] max-[768px]:p-[20px_35px] max-[768px]:gap-10 max-[576px]:p-[18px_20px] max-[576px]:gap-[30px]">
      <div className="flex flex-wrap items-center gap-10 max-[768px]:flex-col">
        <div className="flex-1 min-w-[280px] animate-fadeInLeft">
          <h2 className="text-[#8B0000] tracking-[-0.02em] leading-[1.2] text-[2.8em] font-bold mb-4 relative animate-fadeInUp max-[1200px]:text-[2.4em] max-[992px]:text-[2.2em] max-[768px]:text-[2em] max-[576px]:text-[1.9em] max-[400px]:text-[1.7em]">
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

        <div className="flex-1 min-w-[300px] w-full text-center relative animate-fadeInRight max-[768px]:min-w-full">
          <img
            src="/images/2.png"
            alt="SMC Campus"
     
            className="max-w-full rounded-xl relative  shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-transform duration-500 hover:scale-[1.02] 
      max-[768px]:max-w-[100%] max-[768px]:w-full max-[768px]:mx-auto max-[768px]:top-0"
          />
        </div>
      </div>
    </div>
  );
}

export default Section1;
