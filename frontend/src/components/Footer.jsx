import React, { useState, useEffect } from "react";
import { SETTINGS_API } from "../api";
import { Link } from "react-router-dom";

function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(SETTINGS_API.SITE)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  const contactData = {
    phone: settings?.phone || "(048) 923-2004",
    email: settings?.email || "principal.smc.health@punjab.gov.pk",
    address: settings?.address || "Faisalbad Road, Sargodha, Pakistan",
  };

  return (
    <>
      <footer
        role="contentinfo"
        className="relative overflow-hidden text-[#f5f5f5] pt-[60px] pb-0 mt-[48px] font-['Poppins',_Arial,_sans-serif] text-[18px] leading-[1.7]"
        style={{
          backgroundImage:
            "linear-gradient(145deg, rgba(10, 10, 10, 0.96) 35%, rgba(139, 0, 0, 0.85) 100%), url('/images/2.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-[1200px] w-full mx-auto px-8 relative z-[100]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b-[1.5px] border-white/10 pb-8 mb-6">
            {/* Column 1: Vision */}
            <div className="flex flex-col gap-3">
              <div className="text-[1.6rem] lg:text-[1.8rem] font-bold text-[#FFD700] uppercase tracking-tight leading-tight">
                <div className="flex items-center gap-2">
                  <i className="fas fa-eye text-[1.4rem]"></i>
                  <span>Our Vision</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span>& Mission</span>
                </div>
              </div>
              <p className="text-[#e0e0e0] text-[0.95rem] leading-[1.6]">
                To transform healthcare through excellence in education,
                research, and clinical practice. We're dedicated to training
                compassionate professionals who will lead innovation in medical
                science and community health.
              </p>
            </div>

            {/* Column 2: Quick Links (UPDATED) */}
            <div className="flex flex-col gap-3">
              <div className="text-[1rem] font-bold text-[#FFD700] mb-[10px] uppercase relative after:content-[''] after:block after:w-[40px] after:h-[3px] after:bg-[#8B0000] after:mt-[6px] after:rounded-[2px]">
                Quick Links
              </div>
              <ul className="list-none p-0 m-0">
                {[
                  "Home",
                  "About Us",
                  "Admissions",
                  "Campus Life",
                  "Terms & Conditions",
                  "Privacy Policy",
                ].map((link) => (
                  <li key={link} className="mb-[10px]">
                    <Link
                      to={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                      className="text-[#f5f5f5] no-underline text-[1rem] transition-all duration-300 hover:text-[#FFD700] hover:pl-[6px] flex items-center"
                    >
                      <i className="fas fa-chevron-right mr-[8px] text-[#8B0000] text-[0.8rem]"></i>{" "}
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="flex flex-col gap-3">
              <div className="text-[1rem] font-bold text-[#FFD700] mb-[10px] uppercase relative after:content-[''] after:block after:w-[40px] after:h-[3px] after:bg-[#8B0000] after:mt-[6px] after:rounded-[2px]">
                Contact Information
              </div>
              <div className="space-y-3">
                <p className="text-[#e0e0e0] text-[0.95rem] flex items-start">
                  <i className="fas fa-phone-alt mt-1 mr-[10px] text-[#FFD700]"></i>
                  <span>
                    <strong>Phone:</strong> <br />
                    {contactData.phone}
                  </span>
                </p>
                <p className="text-[#e0e0e0] text-[0.95rem] flex items-start">
                  <i className="fas fa-envelope mt-1 mr-[10px] text-[#FFD700]"></i>
                  <span className="break-all">
                    <strong>Email:</strong> <br />
                    {contactData.email}
                  </span>
                </p>
                <p className="text-[#e0e0e0] text-[0.95rem] flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-[10px] text-[#FFD700]"></i>
                  <span>
                    <strong>Address:</strong> <br />
                    {contactData.address}
                  </span>
                </p>

                {/* Footer.jsx lines 112, 118, 124 fix */}
                <div className="flex gap-4 mt-4">
                  <a
                    href="https://facebook.com" // Yahan apna page link dalein
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] text-[1.3rem] hover:text-white transition-all hover:-translate-y-1"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] text-[1.3rem] hover:text-white transition-all hover:-translate-y-1"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFD700] text-[1.3rem] hover:text-white transition-all hover:-translate-y-1"
                  >
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Column 4: Form */}
            <div className="flex flex-col gap-3">
              <div className="text-[1rem] font-bold text-[#FFD700] mb-[10px] uppercase relative after:content-[''] after:block after:w-[40px] after:h-[3px] after:bg-[#8B0000] after:mt-[6px] after:rounded-[2px]">
                Send a Message
              </div>
              <form className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-[6px] p-2.5 text-[0.9rem] focus:border-[#FFD700] outline-none placeholder:text-gray-400"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-[6px] p-2.5 text-[0.9rem] focus:border-[#FFD700] outline-none placeholder:text-gray-400"
                  required
                />
                <textarea
                  rows="2"
                  placeholder="Your Message"
                  className="w-full bg-white/10 text-white border border-white/20 rounded-[6px] p-2.5 text-[0.9rem] focus:border-[#FFD700] outline-none resize-none placeholder:text-gray-400"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#800000] via-[#a00000] to-[#FFD700] text-white font-bold py-3 rounded-[8px] transition-all duration-300 hover:brightness-110 flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(0,0,0,0.3)] border-none"
                >
                  <i className="fas fa-paper-plane"></i> Send Message
                </button>
              </form>
            </div>
          </div>

          <div className="text-center text-[#bdbdbd] text-[0.85rem] py-6">
            © {new Date().getFullYear()} Sargodha Medical College. Developed by{" "}
            <a
              href="https://hassanmoizportfolio.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FFD700] font-bold hover:underline"
            >
              Moiz Hassan
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
