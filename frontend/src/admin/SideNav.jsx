import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  Image as ImageIcon, 
  Newspaper, 
  Download, 
  Bell, 
  FlaskConical, 
  Settings, 
  User, 
  Menu, 
  Building2, 
  X 
} from "lucide-react";

function SideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    // Since we added cookie-parser, you might want to clear cookies on the backend, 
    // but for now, we'll clear local storage as per your logic.
    localStorage.removeItem("admin_token");
    navigate("/admin/login", { replace: true });
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { title: "Slider Settings", path: "/admin/slider", icon: <ImageIcon size={20} /> },
    // { title: "Departments", path: "/admin/departments", icon: <Building2 size={20} /> },
    { title: "News & Events", path: "/admin/news", icon: <Newspaper size={20} /> },
    { title: "Downloads", path: "/admin/downloads", icon: <Download size={20} /> },
    { title: "Notifications", path: "/admin/notifications", icon: <Bell size={20} /> },
    { title: "Research", path: "/admin/research", icon: <FlaskConical size={20} /> },
    { title: "Site Settings", path: "/admin/settings", icon: <Settings size={20} /> },
    { title: "Profile", path: "/admin/profile", icon: <User size={20} /> },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative flex items-center gap-[12px] py-[12px] px-[16px] rounded-xl text-white/90 no-underline transition-all duration-300 hover:bg-white/10 hover:translate-x-2 group ${
      isActive 
        ? "bg-white/20 text-white shadow-lg font-semibold before:h-full" 
        : "before:h-0 hover:before:h-[60%]"
    } before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[4px] before:bg-white before:rounded-r-lg before:transition-all before:duration-300`;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 left-4 z-[1100] p-2 bg-[#800000] text-white rounded-lg shadow-lg md:hidden flex items-center justify-center"
        onClick={toggleMenu}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidenav Container */}
      <AnimatePresence>
        {(isOpen || window.innerWidth > 768) && (
          <motion.aside
            className="fixed top-0 left-0 w-[260px] h-screen bg-[#800000] text-white p-[30px_20px] flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.3)] z-[1000]"
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            {/* Brand Logo Area */}
            <div className="mb-10 px-2">
              <div className="text-[1.5rem] font-black tracking-tighter text-white flex items-center gap-2">
                <div className="w-8 h-8 bg-white text-[#800000] rounded-lg flex items-center justify-center font-bold">S</div>
                SMC ADMIN
              </div>
              <div className="h-[1px] w-full bg-white/20 mt-4"></div>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 custom-scrollbar overflow-hidden">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path} 
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                  {link.title}
                </NavLink>
              ))}
            </nav>

            {/* Logout Footer */}
            <div className="mt-auto pt-6">
              <button
                className="relative overflow-hidden w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-3 px-4 rounded-xl cursor-pointer font-bold transition-all duration-300 flex items-center justify-center gap-3 group shadow-inner"
                onClick={logout}
              >
                <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                <span>Log Out</span>
                
                {/* Visual Polish: Shine effect */}
                <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[30deg] transition-all duration-1000 group-hover:left-[150%]"></div>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default SideNav;