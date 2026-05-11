import React from "react";

const learningOutcomes = [
  {
    title: "Knowledge & Competence",
    description: "Demonstrate medical knowledge to diagnose, manage, and prevent common health problems.",
    icon: "fa-book-medical"
  },
  {
    title: "Clinical Skills",
    description: "Perform essential clinical skills safely and effectively, guided by evidence-based practice.",
    icon: "fa-user-md"
  },
  {
    title: "Community Orientation & Social Accountability",
    description: "Deliver community-focused, equitable, and preventive healthcare.",
    icon: "fa-users"
  },
  {
    title: "Lifelong Learning & Critical Thinking",
    description: "Adopt habits of reflection, critical thinking, and self-directed learning.",
    icon: "fa-lightbulb"
  },
  {
    title: "Research & Innovation",
    description: "Apply basic research skills and contribute to evidence-based medicine.",
    icon: "fa-microscope"
  },
  {
    title: "Professionalism & Ethics",
    description: "Uphold integrity, compassion, and ethical responsibility.",
    icon: "fa-balance-scale"
  },
  {
    title: "Communication & Teamwork",
    description: "Communicate effectively and work collaboratively in healthcare teams.",
    icon: "fa-hands-helping"
  }
];

function LearningOutcomes() {
  return (
    <div className="bg-gray-50 py-20 font-['Poppins',_sans-serif]">
      <div className="max-w-[1140px] mx-auto px-[15px]">
        <div className="text-center mb-16">
          <p className="text-red-800 font-bold tracking-[3px] uppercase text-sm mb-2">Excellence in Education</p>
          <h2 className="text-[clamp(24px,3.5vw,42px)] font-black text-gray-900 mb-4 uppercase leading-tight">
            Learning Outcomes <br className="hidden md:block" /> 
            <span className="text-red-800">for Sargodha Medical College</span>
          </h2>
          <div className="w-24 h-1.5 bg-red-800 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningOutcomes.map((outcome, index) => (
            <div 
              key={index} 
              className="group bg-white p-10 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border-b-4 border-transparent hover:border-red-800 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] hover:-translate-y-2 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-800 text-3xl mb-6 group-hover:bg-red-800 group-hover:text-white transition-colors duration-500">
                <i className={`fas ${outcome.icon}`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-start">
                <span className="text-red-800/20 text-4xl font-black mr-3 leading-none">{index + 1}</span>
                {outcome.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {outcome.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningOutcomes;
