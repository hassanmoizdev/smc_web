import React from "react";

function OurFaculties() {
  return (
    <div className="p-[60px_20px] max-[576px]:p-[40px_16px] bg-white font-['Poppins',_sans-serif] text-[#333] animate-fadeIn overflow-x-hidden">
      <h2 className="text-[#8B0000] text-[clamp(1.8rem,_4vw,_2.8rem)] font-bold mb-14 max-[576px]:mb-10 text-center relative animate-slideDown max-[768px]:text-[2rem] max-[576px]:text-[1.7rem] after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:-translate-x-1/2 after:w-0 after:h-[5px] after:bg-[#8B0000] after:rounded-[4px] after:animate-underlineAnim after:[animation-delay:0.6s]">
        Our Faculties
      </h2>

      <div className="flex flex-wrap justify-center gap-[10rem] max-[992px]:gap-[30px] max-[576px]:gap-[24px]">
        {/* Card 1 */}
        <div className="flex-[1_1_300px] max-w-[400px] min-w-[250px] flex max-[992px]:flex-[1_1_calc(50%-20px)] max-[576px]:flex-[1_1_100%]">
          <div className="bg-white rounded-[6px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out flex flex-col overflow-hidden w-full animate-fadeInUp hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] group">
            <img
              src="/images/3.png"
              alt="Faculty of Basic Sciences"
              className="w-full h-[220px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.05] max-[768px]:h-[180px] max-[576px]:h-[150px]"
            />
            <div className="p-5 max-[576px]:p-4 flex flex-col flex-grow">
              <h5 className="text-[clamp(1.2rem,_2.5vw,_1.6rem)] font-bold text-[#8B0000] mb-2.5 max-[768px]:text-[1.3rem] max-[576px]:text-[1.2rem]">
                Faculty of Basic Sciences
              </h5>
              <p className="text-[1rem] max-[576px]:text-[0.95rem] text-[#525151] mb-[15px] flex-grow !leading-[1.6] max-[576px]:!leading-[1.5] line-clamp-3">
                The Faculty of Basic Sciences provides foundational knowledge in
                core scientific disciplines, preparing students for advanced
                studies and research in ...
              </p>
              <a
                href="/faculty-detail/1"
                className="bg-[#8B0000] text-white border-none py-2.5 px-5 w-fit max-[576px]:self-center rounded-[5px] font-semibold no-underline transition-all duration-300 hover:bg-[#660000] hover:-translate-y-[2px]"
              >
                View Details
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="flex-[1_1_300px] max-w-[400px] min-w-[250px] flex max-[992px]:flex-[1_1_calc(50%-20px)] max-[576px]:flex-[1_1_100%]">
          <div className="bg-white rounded-[6px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out flex flex-col overflow-hidden w-full animate-fadeInUp hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] group">
            <img
              src="/images/4.png"
              alt="Faculty of Clinical Sciences"
              className="w-full h-[220px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.05] max-[768px]:h-[180px] max-[576px]:h-[150px]"
            />
            <div className="p-5 max-[576px]:p-4 flex flex-col flex-grow">
              <h5 className="text-[clamp(1.2rem,_2.5vw,_1.6rem)] font-bold text-[#8B0000] mb-2.5 max-[768px]:text-[1.3rem] max-[576px]:text-[1.2rem]">
                Faculty of Clinical Sciences
              </h5>
              <p className="text-[1rem] max-[576px]:text-[0.95rem] text-[#525151] mb-[15px] flex-grow !leading-[1.6] max-[576px]:!leading-[1.5] line-clamp-3">
                Dedicated to advanced medical training and patient care, the
                Faculty of Clinical Sciences offers specialized programs and
                hands-on experience in diver...
              </p>
              <a
                href="/faculty-detail/2"
                className="bg-[#8B0000] text-white border-none py-2.5 px-5 w-fit max-[576px]:self-center rounded-[5px] font-semibold no-underline transition-all duration-300 hover:bg-[#660000] hover:-translate-y-[2px]"
              >
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OurFaculties;
