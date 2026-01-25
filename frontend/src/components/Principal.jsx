import React from "react";

const Principal = () => {
  return (
    <div
      className="
      bg-[#8b0000] text-white
      p-8 md:p-16 md:px-20 md:py-20 
      flex flex-col md:flex-row
      items-center gap-10
    "
    >
      {/* Text Content */}
      <div className="flex-1 max-md:text-center">
        <h3
          className="
          text-[#e9b004] font-bold mb-3 text-[1.2rem]
          tracking-wide
          max-md:text-[1rem]
        "
        >
          Principal/Head of Institution
        </h3>

        <h1
          className="
          text-4xl md:text-5xl font-black mb-6
          uppercase tracking-wide
          max-md:text-2xl max-md:leading-tight
        "
        >
          Prof. Dr. Muhammad Waris Farooka
        </h1>

        <p
          className="
          text-sm md:text-[19px]
          leading-relaxed mb-5 pr-5
          max-md:pr-0 max-md:text-[14px]
        "
        >
          Sargodha Medical College (SMC) is one of the prestigious institutions
          of Punjab situated in the city of Sargodha. Since our inception in
          2006, we are putting our utmost efforts in imparting standardized and
          quality education, and producing talented and proficient healthcare
          professionals, independent intellectuals and dynamic citizens. This
          institution has developed outstandingly accomplishing a stupendous
          success in many directions and reached up to present stage.
        </p>

        <button
          className="
          bg-white text-[#8b0000] font-bold
          py-[11px] px-7 rounded shadow-lg
          hover:bg-gray-100 transition-colors
          uppercase
          max-md:py-3 max-md:px-6
        "
        >
          Read More
        </button>
      </div>

      {/* Image Profile */}
      <div className="flex-shrink-0">
        <div className="border-4 border-white shadow-2xl">
          <img
            src="/images/principal-image.png"
            alt="Prof. Dr. Muhammad Waris Farooka"
            className="
              w-[12rem] h-72 object-cover
              max-md:w-40 max-md:h-56
            "
          />
        </div>
      </div>
    </div>
  );
};

export default Principal;
