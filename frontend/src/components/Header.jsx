import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { SETTINGS_API } from "../api";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState(null);

  // Reusable nav link class
  const navClass = (isActive) =>
    `block px-0 py-1 text-[#333] hover:text-[#8b0000] font-serif
     hover:underline hover:underline-offset-10 hover:decoration-2
     ${isActive ? "text-[#8b0000] underline underline-offset-10 decoration-2" : ""}`;

  useEffect(() => {
    fetch(SETTINGS_API.SITE)
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error("Error fetching settings:", err));
  }, []);

  return (
    <>
      {/* TOP BAR Email and Phone */}
      <div className="bg-[#8b0000] text-white text-[14px] py-2 font-bold ">
        <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center flex-wrap">
          <div className="flex gap-5 flex-wrap">
            <span>
              <i className="fas fa-phone mr-1.5"></i>
              {settings?.phone || "(048) 9232004"}
            </span>
            <span>
              <i className="fas fa-envelope mr-1.5"></i>
              {settings?.email || " principal.smc.health@punjab.gov.pk"}
            </span>
          </div>
          <div className="flex gap-4">
            {settings?.socialLinks?.facebook && (
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#ddd]"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            )}
            {settings?.socialLinks?.instagram && (
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#ddd]"
              >
                <i className="fab fa-instagram"></i>
              </a>
            )}
            {settings?.socialLinks?.linkedin &&
              settings.socialLinks.linkedin !== "#" && (
                <a
                  href={settings.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#ddd]"
                >
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 bg-[#fefefe]  py-2.5 z-[1000] px-3 md:px-0">
        <div className="max-w-[1300px] text-[15px] mx-auto px-0 flex gap-36 justify-between sm:justify-normal items-center relative">
          {/* Logo */}
          <NavLink to="/" className="z-[1100]">
            <img src="/images/logo.png" alt="Logo" className="md:h-24 h-20 w-auto" />
          </NavLink>

          {/* Hamburger */}
          <button
            className="block lg:hidden text-2xl z-[1100]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* MENU */}
          <ul
            className={`flex flex-col lg:flex-row w-full gap-4 lg:w-auto bg-white lg:bg-transparent absolute lg:static top-full left-0 lg:top-auto lg:left-auto z-[1000] ${
              menuOpen ? "block" : "hidden lg:flex"
            }`}
          >
            {/* HOME */}
            <li>
              <NavLink
                to="/Home"
                className={({ isActive }) => navClass(isActive)}
              >
                HOME
              </NavLink>
            </li>

            {/* ABOUT US DROPDOWN */}
            <li className="lg:relative group">
              <NavLink
                to="/vision-mission"
                className={() =>
                  navClass(
                    path.startsWith("/vision-mission") ||
                      path.startsWith("/principal-message")
                  )
                }
              >
                ABOUT US <i className="fas fa-chevron-down text-[10px]" />
              </NavLink>

              {/* Desktop dropdown */}
              <ul className="hidden lg:absolute lg:top-full rounded lg:min-w-[150px] lg:p-2 bg-white border border-[#eee] flex-col group-hover:flex shadow-md">
                <li>
                  <NavLink
                    to="/vision-mission"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    Vision & Mission
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/principal-message"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    Principal's Message
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* ADMISSIONS DROPDOWN */}
            <li className="lg:relative group">
              <NavLink
                to="/admission-criteria"
                className={() => navClass(path.startsWith("/admission"))}
              >
                ADMISSIONS <i className="fas fa-chevron-down text-[10px]" />
              </NavLink>

              {/* Desktop dropdown */}
              <ul className="hidden lg:absolute lg:top-full rounded lg:min-w-[150px] lg:p-2 bg-white border border-[#eee] flex-col group-hover:flex shadow-md">
                <li>
                  <NavLink
                    to="/admission-criteria"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    Admission Criteria
                  </NavLink>
                </li>
              
              </ul>
            </li>

            {/* OTHER LINKS */}
            {/* DEPARTMENTS DROPDOWN */}
            <li className="lg:relative group">
              <NavLink
                to="/departments"
                className={() =>
                  navClass(
                    path.startsWith("/faculty-basic") ||
                      path.startsWith("/faculty-clinical") ||
                      path === "/departments"
                  )
                }
              >
                DEPARTMENTS{" "}
                <i className="fas fa-chevron-down text-[10px] ml-1" />
              </NavLink>

              {/* Desktop dropdown */}
              <ul className="hidden lg:absolute lg:top-full lg:p-2 rounded lg:min-w-[200px] bg-white border border-[#eee] flex-col group-hover:flex shadow-md z-[1000]">
                <li>
                  <NavLink
                    to="/faculty-basic"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    Faculty of Basic Sciences
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/faculty-clinical"
                    className={({ isActive }) => navClass(isActive)}
                  >
                    Faculty of Clinical Sciences
                  </NavLink>
                </li>
              </ul>
            </li>

            <li>
              <NavLink
                to="/research"
                className={({ isActive }) => navClass(isActive)}
              >
                RESEARCH
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/news-events"
                className={({ isActive }) => navClass(isActive)}
              >
                NEWS & EVENTS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notifications"
                className={({ isActive }) => navClass(isActive)}
              >
                NOTIFICATIONS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/downloads"
                className={({ isActive }) => navClass(isActive)}
              >
                DOWNLOADS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact-us"
                className={({ isActive }) => navClass(isActive)}
              >
                CONTACT US
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
