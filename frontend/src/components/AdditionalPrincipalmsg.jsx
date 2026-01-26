import React from "react";

function AdditionalPrincipalmsg() {
  return (
    <div
      id="full-message"
      className="
        bg-[#f5f5f5] text-[#333] leading-[1.7]
        font-['Poppins',_Arial,_sans-serif]

        /* Mobile (iPhone 14) */
        px-4 py-8

        /* Desktop (UNCHANGED look) */
        md:p-[60px_20px]
      "
    >
      <div className="max-w-[1300px] mx-auto">
        <h2
          className="
            text-[#8B0000] font-bold text-center mb-6

            /* Mobile */
            text-[1.6rem]

            /* Desktop */
            md:text-[2rem] md:mb-[30px]
          "
        >
          Our Vision and Commitment
        </h2>

        <p className="mb-4 text-[0.95rem] md:text-[1rem]">
          As the Principal of Sargodha Medical College, it is my immense
          pleasure to welcome you to our esteemed institution. Since its
          establishment in 2006, SMC has been dedicated to upholding the highest
          standards of medical education and fostering a nurturing environment
          for our students. Our mission extends beyond academics; we aim to
          cultivate compassionate, ethical, and competent healthcare
          professionals who will serve society with distinction.
        </p>

        <p className="mb-4 text-[0.95rem] md:text-[1rem]">
          We continually strive to update our curriculum, integrate modern
          teaching methodologies, and provide state-of-the-art facilities to
          ensure that our graduates are well-equipped to meet the challenges of
          the rapidly evolving healthcare landscape. Our faculty comprises
          highly qualified and experienced professionals who are committed to
          mentorship and academic excellence.
        </p>

        <p className="mb-4 text-[0.95rem] md:text-[1rem]">
          We believe in holistic development, encouraging students to
          participate in extracurricular activities, research, and community
          service. This approach ensures that they not only excel academically
          but also develop into well-rounded individuals and responsible
          citizens.
        </p>

        <p className="mb-4 text-[0.95rem] md:text-[1rem]">
          Thank you for considering Sargodha Medical College as your partner in
          education. We look forward to welcoming you to our vibrant community.
        </p>

        <p
          className="
            mt-6 font-semibold text-[#8B0000]

            /* Mobile */
            text-[1rem]

            /* Desktop */
            md:mt-[30px] md:text-[1.05rem]
          "
        >
          Prof. Dr. Muhammad Waris Farooka <br />
          Principal, Sargodha Medical College
        </p>
      </div>
    </div>
  );
}

export default AdditionalPrincipalmsg;
