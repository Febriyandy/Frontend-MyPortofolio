import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenuSharp } from "react-icons/io5";
import { BiX } from "react-icons/bi";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const isActivePath = (path) => {
    return location.pathname.startsWith(path);
  };

  const navigationItems = [
    { path: "/home", label: "Home" },
    { path: "/artikel", label: "Article" },
    { path: "/kontak", label: "Contact Me" },
  ];

  return (
    <>
      <nav>
        <div className="lg:hidden">
          <button
            className="text-2xl rounded-md  text-[#0d6c91] mt-5 mr-5 right-0 z-[1000] p-3 bg-white/40 backdrop-filter  backdrop-blur-sm shadow-sm absolute"
            onClick={toggleMenu}
          >
            {menuOpen ? <BiX /> : <IoMenuSharp />}
          </button>
        </div>
        {menuOpen && (
          <div className="w-full h-auto bg-white/40 backdrop-filter  backdrop-blur-sm shadow-sm fixed z-[100] ">
            <div className="h-16"></div>
            <Link to="/home">
              <div className="w-full font-semibold border-b border-[#0d6c91] hover:bg-white duration-300 text-lg text-[#0d6c91]  font-body  py-5 px-5">
                Home
              </div>
            </Link>
            <Link to="/artikel">
              <div className="w-full font-semibold border-b border-[#0d6c91] hover:bg-white duration-300 text-lg text-[#0d6c91]  font-body  py-5 px-5">
                Artikel
              </div>
            </Link>
            <Link to="/kontak">
              <div className="w-full font-semibold border-b border-[#0d6c91] hover:bg-white duration-300 text-lg text-[#0d6c91]  font-body  py-5 px-5">
                Contact Me
              </div>
            </Link>
           
          </div>
        )}
      </nav>
      <nav className="absolute max-md:hidden top-0 left-0 right-0 mt-5 w-1/2 h-16 animate__animated animate__fadeInDown bg-white/40 backdrop-filter backdrop-blur-sm shadow-sm rounded-full z-[1000] mx-auto flex justify-center items-center hover:shadow-xl duration-500">
        <div className="flex justify-between ">
          {navigationItems.map((navItem, index) => (
            <Link
              to={navItem.path}
              key={index}
              className={`font-body text-lg font-medium px-16 py-1.5 ${
                isActivePath(navItem.path)
                  ? "text-[#0d6c91] bg-white/20 backdrop-filter backdrop-blur-sm shadow-md rounded-full"
                  : "text-[#0d6c917c] hover:text-[#0D6B91]"
              }`}
            >
              {navItem.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
