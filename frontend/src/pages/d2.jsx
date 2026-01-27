import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MoveRight, MoveLeft } from "lucide-react";

const D2 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departments = [
    "Gynaecology",
    "Internal Medicine",
    "Pediatrics",
    "Surgery",
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Hero Section */}
      <div
        className="relative h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/images/3.png')`,
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-bold">
          Faculty of Clinical Sciences
        </h1>
      </div>

      {/* Content Card */}
      <div className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white shadow-xl rounded-sm p-8 md:p-12 border-t-4 border-[#8B0000]">
          <h2 className="text-[#8B0000] text-3xl font-bold mb-1">Overview</h2>
          <div className="w-12 h-1 bg-[#8B0000] mb-6"></div>
          <p className="text-gray-700 leading-relaxed mb-12 text-lg">
            Dedicated to advanced medical training and patient care, the Faculty
            of Clinical Sciences offers specialized programs and hands-on
            experience in diverse clinical settings.
          </p>

          <h2 className="text-[#8B0000] text-3xl font-bold mb-1">
            Departments
          </h2>
          <div className="w-12 h-1 bg-[#8B0000] mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {departments.map((dept, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-gray-50 p-4 border-l-4 border-[#8B0000] hover:shadow-md transition-shadow"
              >
                <MoveRight size={18} className="text-[#8B0000]" />
                <span className="font-semibold text-gray-800">{dept}</span>
              </div>
            ))}
          </div>

          <Link
            to="/faculties"
            className="inline-flex items-center gap-2 bg-[#6c757d] text-white px-5 py-2 rounded hover:bg-[#5a6268] transition-colors shadow-md"
          >
            <MoveLeft size={18} /> Back to Faculties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default D2;
