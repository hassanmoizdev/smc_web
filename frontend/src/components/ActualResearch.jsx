import React from "react";

const ActualResearch = () => {
  return (
    <div className="w-full">
      {/* Hero Section with Building Background */}
      <div
        className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/4.png')`,
        }}
      >
        <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-tight text-center px-4">
          Our Research & Publications
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Heading with Maroon Underline */}
          <div className="mb-12">
            <h2 className="text-[#8B0000] text-3xl md:text-4xl font-bold uppercase inline-block relative pb-3">
              Recent Papers & Projects
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-[#8B0000]"></span>
            </h2>
          </div>

          {/* Empty State Box Matching the Screenshot */}
          <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-100 shadow-sm p-12 md:p-20">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-base md:text-lg font-medium">
              <span className="text-2xl">☹</span>
              <p>
                No research papers or projects to display yet. Please check back
                later!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActualResearch;
