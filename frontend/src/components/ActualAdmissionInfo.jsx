import React, { useState } from "react";

function AdmissionsPage() {
  // 1. Logic to handle button switching
  const [activeTab, setActiveTab] = useState("undergraduate");

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-['Poppins',_sans-serif] pb-20">
     

      {/* 3. WHITE CONTENT CARD (Matches the SS layout) */}
      <div className="max-w-[1100px] mx-auto mt-10  z-20 bg-white shadow-2xl rounded-xl p-8 md:p-12">
        {/* TAB BUTTONS (Working Toggle) */}
        <div className="flex justify-center items-center gap-6 mb-12 border-b pb-8">
          <button
            onClick={() => setActiveTab("undergraduate")}
            className={`px-6 py-2 rounded-md font-semibold  transition-all  tracking-wide ${
              activeTab === "undergraduate"
                ? "bg-[#8B0000] text-white shadow-md"
                : "text-gray-500 hover:text-[#8B0000]"
            }`}
          >
            Undergraduate Programs
          </button>
          <button
            onClick={() => setActiveTab("postgraduate")}
            className={`px-6 py-2 rounded-md font-semibold transition-all  tracking-wide ${
              activeTab === "postgraduate"
                ? "bg-[#8B0000] text-white shadow-md"
                : "text-gray-500 hover:text-[#8B0000]"
            }`}
          >
            Postgraduate Programs
          </button>
        </div>

        {/* 4. DYNAMIC CONTENT AREA */}
        <div className="animate-fadeIn">
          {activeTab === "undergraduate" ? (
            <div>
              <h2 className="text-[#8B0000] text-3xl md:text-5xl font-black text-center uppercase mb-2">
                Undergraduate Programs
              </h2>
              <div className="w-20 h-1.5 bg-[#8B0000] mx-auto mb-16 rounded-full"></div>

              {/* B.Sc. Allied Health Sciences */}
              <div className="mb-12">
                <h3 className="text-[#8B0000] text-2xl font-bold border-b-2 border-[#8B0000]/20 pb-2 mb-4">
                  B.Sc. (Hons.) Allied Health Sciences (4 years)
                </h3>
                <p className="text-gray-700 leading-relaxed text-[15px]">
                  Entry level for all B.Sc. Allied Health Sciences Programs
                  should be uniform and it shall be F.Sc. Pre-Medical or F.Sc.
                  in relevant technology from a Board of Intermediate &
                  Secondary Education / equivalent (as determined by the Inter
                  Board Committee of Chairmen, Islamabad), with at least{" "}
                  <strong className="text-black font-bold text-[16px]">
                    50 % unadjusted marks
                  </strong>
                  , w.e.f. academic year 2010.
                </p>
                <p className="mt-4 text-gray-700">
                  There shall be no age restriction for admission in B.Sc.
                  (Hons.) Allied Health Sciences courses.
                </p>
              </div>

              {/* B.Sc. Nursing (4 years) */}
              <div className="mb-12">
                <h3 className="text-[#8B0000] text-2xl font-bold border-b-2 border-[#8B0000]/20 pb-2 mb-4">
                  B.Sc. Nursing (4 years)
                </h3>
                <ul className="space-y-3 list-disc pl-5 text-gray-700">
                  <li>Selection will be purely on merit.</li>
                  <li>
                    Requisite qualification: F.Sc. Pre-medical (with at least{" "}
                    <strong className="text-black font-bold">
                      50% unadjusted marks
                    </strong>
                    ).
                  </li>
                  <li>Age limit shall be 17 to 25 years.</li>
                  <li>
                    The decision of selection board / committee of respective
                    institution will be final.
                  </li>
                </ul>
              </div>

              {/* B.Sc. Nursing (2 years) */}
              <div className="mb-12">
                <h3 className="text-[#8B0000] text-2xl font-bold border-b-2 border-[#8B0000]/20 pb-2 mb-4">
                  B.Sc. Nursing (2 years)
                </h3>
                <ul className="space-y-3 list-disc pl-5 text-gray-700">
                  <li>
                    Diploma in General Nursing registered with Pakistan Nursing
                    Council.
                  </li>
                  <li>
                    Diploma in Midwifery / for male nurses 1-year specialized
                    course registered with Pakistan Nursing Council.
                  </li>
                  <li>
                    Minimum of{" "}
                    <strong className="text-black font-bold">
                      02 years' experience
                    </strong>
                    .
                  </li>
                  <li>Age limit & gender not applicable.</li>
                  <li>Admission test, interview by the Institute concerned.</li>
                </ul>
              </div>
            </div>
          ) : (
            /* Postgraduate Programs Section - Updated from Screenshots */
            <div className="animate-fadeIn">
              <h2 className="text-[#8B0000] text-3xl md:text-5xl font-black text-center uppercase mb-2">
                Postgraduate Programs
              </h2>
              <div className="w-20 h-1.5 bg-[#8B0000] mx-auto mb-12 rounded-full"></div>

              <div className="space-y-10 text-left">
                {/* MS/MD Section */}
                <section>
                  <h3 className="text-[#8B0000] text-2xl font-bold border-b border-gray-200 pb-1 mb-4">
                    MS/MD
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm md:text-base">
                    <li>MBBS/equivalent qualification registered with PMDC.</li>
                    <li>
                      Completed one year House Job, with at least six months in
                      the particular discipline.
                    </li>
                    <li>
                      One-year experience in particular specialty/Internal
                      Medicine or General Surgery* /Allied medical or surgical
                      discipline* in the given order of preference.
                    </li>
                    <li>
                      Passed Entry Test conducted by the University & aptitude
                      interview by the Institute concerned.
                    </li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-dotted border-gray-300">
                    <p className="text-gray-500 font-bold italic text-sm mb-2">
                      Note:
                    </p>
                    <ul className="text-gray-600 text-sm space-y-1 italic">
                      <li>
                        • 4 years for MS (General Surgery) & MD (Internal
                        Medicine).
                      </li>
                      <li>• 5 years for MS and MD in specialties.</li>
                    </ul>
                  </div>
                </section>

                {/* MDS Section */}
                <section>
                  <h3 className="text-[#8B0000] text-2xl font-bold border-b border-gray-200 pb-1 mb-4">
                    MDS
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 text-sm md:text-base">
                    <li>BDS/equivalent qualification registered with PMDC.</li>
                    <li>Completed one year House Job.</li>
                    <li>Passed Entry Test & interview.</li>
                  </ul>
                </section>

                {/* M.Phil Section */}
                <section>
                  <h3 className="text-[#8B0000] text-2xl font-bold border-b border-gray-200 pb-1 mb-4">
                    M.Phil
                  </h3>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    To be eligible for admission to M. Phil., a candidate shall
                    possess an MBBS / BDS degree. Any other higher degree e.g.,
                    M.Sc. in relevant field can be recognized by the University
                    as equivalent.
                  </p>
                  <p className="font-bold text-gray-800 text-sm mb-2">
                    Admissions shall be made on the basis of merit:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>
                      • <strong className="text-black">60%</strong>{" "}
                      Qualifications with previous academic record & relevant
                      experience.
                    </li>
                    <li>
                      • <strong className="text-black">10%</strong> Entry Test.
                    </li>
                    <li>
                      • <strong className="text-black">30%</strong> Interview.
                    </li>
                  </ul>
                </section>

                {/* M.Sc. Nursing Section */}
                <section>
                  <h3 className="text-[#8B0000] text-2xl font-bold border-b border-gray-200 pb-1 mb-4">
                    M.Sc. Nursing
                  </h3>
                  <ul className="list-disc pl-6 space-y-3 text-gray-700 text-[15px]">
                    <li>
                      Bachelor of Science in Nursing (4 years) or B.Sc. Nursing
                      (Post RN) from recognized institution/affiliated to a
                      University approved by HEC.
                    </li>
                    <li>
                      Minimum <strong className="text-black">01 year</strong>{" "}
                      clinical or nursing administration experience.
                    </li>
                    <li>Registered with Pakistan Nursing Council (PNC).</li>
                    <li>Open domicile & Open gender.</li>
                    <li>
                      Entrance Test (English language, Mathematics, Aptitude
                      test, General/current events).
                    </li>
                  </ul>
                  <p className="mt-3 text-[12px] font-bold text-gray-500 italic uppercase">
                    Note: Only those candidates who pass the entrance test shall
                    be eligible to appear in interview.
                  </p>
                </section>

                {/* M.Sc. Medical Laboratory Technology - All Black/Gray SS Style */}
                <section>
                  <h3 className="text-[#8B0000] text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-4 ">
                    M.Sc. Medical Laboratory Technology
                  </h3>
                  <ul className="list-disc pl-6 space-y-3 text-gray-700 text-[15px]">
                    <li>
                      First or high 2nd division in B.Sc. Medical Laboratory
                      Technology/B.Sc. (Hons.) Chemistry/Biology/
                      Biotechnology/MBBS.
                    </li>
                    <li>Entry Test/Interview.</li>
                  </ul>
                </section>

                {/* Postgraduate Clinical Diplomas */}
                <section>
                  <h3 className="text-[#8B0000] text-2xl font-bold border-b-2 border-gray-200 pb-2 mb-6">
                    Postgraduate Clinical Diplomas (2 Years)
                  </h3>
                  <p className="text-gray-800 leading-relaxed mb-8">
                    <strong className="text-black font-bold uppercase tracking-tight text-[14px]">
                      General Requirements:
                    </strong>{" "}
                    MBBS or equivalent qualification registered with PMDC.
                    Securing pass %age in the Entry Test as determined by
                    University of Health Sciences (UHS) and qualifying the
                    interview successfully. Enrollment in any other program of
                    the University is not allowed during the diploma.
                  </p>

                  <div className="space-y-10">
                    {/* DA */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DA (Diploma in Anesthesiology)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <li className="italic text-gray-600">
                          One year experience in Anesthesiology as Medical
                          Officer or House Officer in a recognized institution.
                        </li>
                      </ul>
                    </div>

                    {/* Dip. Card. */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        Dip. Card. (Diploma in Cardiology)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <li className="italic text-gray-600">
                          One year experience in General Medicine as Medical
                          Officer or House Officer.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Cardiology and six months in
                          allied specialty.
                        </li>
                      </ul>
                    </div>

                    {/* Dch Card. */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DCH (Diploma in Child Health)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <li className="italic text-gray-600">
                          One year experience in Paediatrics as Medical Officer
                          or House Officer.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Paediatrics and six months in
                          allied specialty as Medical Officer or House Officer.
                        </li>
                        <li className="italic text-gray-600">
                          One year experience in General Medicine as Medical
                          Officer or House Officer.
                        </li>
                      </ul>
                    </div>

                    {/* DCP (Diploma in Clinical Pathology) */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DCP (Diploma in Clinical Pathology)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1">
                          Specific criteria for DCP (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in Pathology as a Demonstrator in
                          a recognized teaching institution.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Pathology as a Demonstrator
                          and six months house job in one of the major clinical
                          disciplines (Medicine/Surgery/ Gynae. & Obst.).
                        </li>
                        <li className="italic text-gray-600">
                          Two years experience of working in a reputable
                          accredited Pathology lab with all 4 pathology
                          disciplines, belonging to non-teaching institution.
                        </li>
                      </ul>
                    </div>

                    {/* DGO (Diploma in Gynaecology & Obstetrics) */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DGO (Diploma in Gynaecology & Obstetrics)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1">
                          Specific criteria for DGO (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in Gynecology & Obstetrics as
                          Medical Officer or House Officer.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Gynecology & Obstetrics and
                          six months in allied specialty as Medical Officer or
                          House Officer.
                        </li>
                      </ul>
                    </div>
                    {/* DLO (Diploma in Laryngology & Otology - ENT) */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DLO (Diploma in Laryngology & Otology - ENT)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1">
                          Specific criteria for DLO (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in ENT as Medical Officer or House
                          Officer.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in ENT and six months in allied
                          specialty as Medical Officer or House Officer.
                        </li>
                        <li className="italic text-gray-600">
                          One year experience in Surgery as Medical Officer or
                          House Officer.
                        </li>
                      </ul>
                    </div>
                    {/* DMJ (Diploma in Medical Jurisprudence) */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DMJ (Diploma in Medical Jurisprudence)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1 text-black">
                          Specific criteria for DMJ (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          Two years experience as Demonstrator in the Department
                          of Forensic Medicine & Toxicology of a Medical College
                          recognized by PMDC.
                        </li>
                        <li className="italic text-gray-600">
                          Four years experience as Casualty Medical Officer in a
                          Govt. DHQ/THQ Hospital allied specialty as Medical
                          Officer or House Officer.
                        </li>
                      </ul>
                    </div>

                    {/* DMRD (Diploma in Medical Radiodiagnosis) */}
                    <div className="mt-8">
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DMRD (Diploma in Medical Radiodiagnosis)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1 text-black">
                          Specific criteria for DMRD (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in Radiology as Medical Officer or
                          House Officer from a recognized institution.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Radiology and six months in
                          General Medicine/Surgery as Medical Officer or House
                          Officer.
                        </li>
                      </ul>
                    </div>
                    {/* DMRT (Diploma in Medical Radiotherapy) */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DMRT (Diploma in Medical Radiotherapy)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1">
                          Specific criteria for DMRT (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in Radiotherapy as Medical Officer
                          or House Officer from a recognized institution.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Radiotherapy and six months
                          in General Medicine/Surgery as Medical Officer or
                          House Officer.
                        </li>
                      </ul>
                    </div>

                    {/* DOMS (Diploma in Ophthalmic Medicine & Surgery) */}
                    <div className="mt-8">
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DOMS (Diploma in Ophthalmic Medicine & Surgery)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1">
                          Specific criteria for DOMS (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in Ophthalmology as Medical
                          Officer or House Officer from a recognized
                          institution.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Ophthalmology and six months
                          in General Medicine/Surgery as Medical Officer or
                          House Officer.
                        </li>
                      </ul>
                    </div>

                    {/* DPM (Diploma in Psychological Medicine) */}
                    <div>
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DPM (Diploma in Psychological Medicine)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1">
                          Specific criteria for DPM (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in Psychiatry as Medical Officer
                          or House Officer from a recognized institution.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in Psychiatry and six months in
                          General Medicine as Medical Officer or House Officer.
                        </li>
                        <li className="italic text-gray-600">
                          One year experience in General Medicine as Medical
                          Officer or House Officer.
                        </li>
                      </ul>
                    </div>

                    {/* DTCD (Diploma in Tuberculosis & Chest Diseases) */}
                    <div className="mt-8">
                      <h4 className="font-bold text-black text-lg uppercase tracking-tight mb-2">
                        DTCD (Diploma in Tuberculosis & Chest Diseases)
                      </h4>
                      <ul className="list-disc pl-6 text-[15px] text-gray-800 space-y-2">
                        <li>
                          Securing pass %age in the Entry Test as determined by
                          UHS and qualifying the interview successfully.
                        </li>
                        <p className="font-bold text-black text-[14px] mt-2 mb-1">
                          Specific criteria for DTCD (2 years):
                        </p>
                        <li className="italic text-gray-600">
                          One year experience in TB & Chest Diseases as Medical
                          Officer or House Officer from a recognized
                          institution.
                        </li>
                        <li className="italic text-gray-600">
                          Six months experience in TB & Chest Diseases and six
                          months in General Medicine as Medical Officer or House
                          Officer.
                        </li>
                        <li className="italic text-gray-600">
                          One year experience in General Medicine as Medical
                          Officer or House Officer.
                        </li>
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* 5. THE DISCLAIMER (Exact match to SS) */}
          <div className="mt-16 pt-8 border-t border-dashed border-gray-300">
            <div className="flex gap-4 items-start bg-gray-50 p-6 rounded-lg">
              <i className="fas fa-info-circle text-gray-800 mt-1"></i>
              <p className="text-[14px] text-gray-600 italic leading-relaxed">
                <strong>Disclaimer:</strong> The admission criteria provided
                here are based on general UHS guidelines. For the most accurate,
                up-to-date, and program-specific requirements, please refer to
                the official University of Health Sciences (UHS) prospectus and
                website for the current admission cycle.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdmissionsPage;
