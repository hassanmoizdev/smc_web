import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  FileText,
  ShieldAlert,
  Clock,
  GraduationCap,
} from "lucide-react";

const TermsConditions = () => {
  // Page load par top par scroll karne ke liye
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to="/home"
            className="flex items-center gap-2 text-[#8B0000] font-bold hover:opacity-80 transition-all"
          >
            <Home size={22} />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <div className="text-gray-400 text-sm font-medium">
            Sargodha Medical College
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-[#8B0000]/5 rounded-full mb-4">
            <FileText size={40} className="text-[#8B0000]" />
          </div>
          <h1 className="text-[#8B0000] text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Terms & Conditions
          </h1>
          <p className="text-gray-500 font-medium italic">
            Last Updated: January 2026
          </p>
          <div className="w-24 h-1.5 bg-[#8B0000] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Content Cards */}
        <div className="space-y-8">
          {/* 1. Admission Policy */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#8B0000]">
              <GraduationCap size={28} />
              <h2 className="text-2xl font-bold uppercase tracking-wide">
                1. Admission & Eligibility
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Admissions at <strong>Sargodha Medical College (SMC)</strong>{" "}
                are granted strictly on merit according to the rules of{" "}
                <strong>University of Health Sciences (UHS) Lahore</strong>.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Submission of fake or tampered documents will result in
                  permanent blacklisting.
                </li>
                <li>
                  Candidates must meet the minimum PMC/UHS aggregate
                  requirements.
                </li>
                <li>
                  The college reserves the right to cancel admission at any
                  stage if information is found incorrect.
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Attendance & Conduct */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#8B0000]">
              <Clock size={28} />
              <h2 className="text-2xl font-bold uppercase tracking-wide">
                2. Attendance & Discipline
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Students are required to maintain high standards of discipline
                and punctuality:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>75% Attendance</strong> in both lectures and clinical
                  rotations is mandatory to sit in professional exams.
                </li>
                <li>
                  Political activity, unionizing, or any form of protest on
                  campus is strictly prohibited.
                </li>
                <li>
                  Students must strictly follow the prescribed dress code and
                  display their ID cards at all times.
                </li>
              </ul>
            </div>
          </div>

          {/* 3. Fee Policy */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-[#8B0000]">
              <ShieldAlert size={28} />
              <h2 className="text-2xl font-bold uppercase tracking-wide">
                3. Fee & Refund Policy
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Fees must be paid within the timeline issued by the accounts
                office:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Late fee fines will be applicable after the due date.</li>
                <li>
                  Refunds are processed according to the UHS/Government of
                  Punjab refund policy.
                </li>
              </ul>
            </div>
          </div>

          {/* Footer of Terms */}
          <div className="bg-[#8B0000] text-white p-8 rounded-2xl text-center">
            <p className="text-lg font-medium">
              By using our portal or downloading the Admission Booklet, you
              agree to follow the official rules of SMC Sargodha.
            </p>
            <Link
              to="/home"
              className="mt-6 inline-block bg-white text-[#8B0000] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              I Understand, Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
