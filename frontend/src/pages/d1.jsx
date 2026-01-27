import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const D1 = () => {
  // Page load par top par scroll karne ke liye
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const departments = [
    "Anatomy",
    "Biochemistry",
    "Pharmacology",
    "Physiology",
    "Physiology"
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans pb-20">
      
      {/* Hero Section with Background Image */}
      <div 
        className="relative h-[350px] md:h-[450px] flex items-center justify-center bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('./images/3.png')` 
          
        }}
      >
        <h1 className="text-white text-4xl md:text-[3.4rem] font-extrabold text-center px-4 ">
          Faculty of Basic Sciences
        </h1>
      </div>

      {/* Main Content Card */}
      <div className="max-w-6xl mx-auto px-4 -mt-7 relative z-10">
        <div className="bg-white rounded-lg shadow-2xl p-8 md:p-12 border border-gray-100">
          
          {/* Overview Section */}
          <section className="mb-12">
            <h2 className="text-[#8B0000] text-3xl font-bold mb-4 flex flex-col">
              Overview
              <span className="w-16 h-1 bg-[#8B0000] mt-2 rounded-full"></span>
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed max-w-4xl">
              The Faculty of Basic Sciences provides foundational knowledge in core scientific disciplines, 
              preparing students for advanced studies and research in various fields of medicine and allied health sciences.
            </p>
          </section>

          {/* Departments Section */}
          <section className="mb-12">
            <h2 className="text-[#8B0000] text-3xl font-bold mb-8 flex flex-col">
              Departments
              <span className="w-16 h-1 bg-[#8B0000] mt-2 rounded-full"></span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {departments.map((dept, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-[#fdfdfd] p-5 border-l-[5px] border-[#8B0000] shadow-sm hover:shadow-md hover:bg-white transition-all cursor-pointer group rounded-r-md"
                >
                  <ArrowRight size={18} className="text-[#8B0000] group-hover:translate-x-1 transition-transform" />
                  <span className="text-gray-800 font-bold tracking-tight">{dept}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Back Button */}
          <div className="mt-10">
            <Link 
              to="/departments"
              className="inline-flex items-center gap-2 bg-[#6c757d] hover:bg-[#5a6268] text-white px-8 py-3 rounded-md font-semibold transition-all shadow-lg active:scale-95"
            >
              <ArrowLeft size={18} />
              Back to Faculties
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default D1;