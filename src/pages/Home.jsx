import React, { useState, useEffect } from "react";
import Elemen from "../assets/elemen.png";
import Navbar from "../components/Navbar";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegUser, FaCertificate } from "react-icons/fa";
import { BiCodeCurly } from "react-icons/bi";
import { FaCodeBranch } from "react-icons/fa6";
import Skills from "../components/Skills";
import Project from "../components/Project";
import Sertifikat from "../components/Sertifikat";
import Footer from "../components/Footer";
import axios from "axios";
import {
  BsArrowUpRightSquareFill,
} from "react-icons/bs";

const MenuItem = ({ icon, sectionId, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    document.title = 'Home';
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const section = document.getElementById(sectionId);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionId]);

  return (
    <div
      className="flex items-center cursor-pointer w-full mb-5"
      onClick={() => onClick(sectionId)}
    >
      <div
        className={`w-12 h-12 ${
          isActive
            ? "bg-[#05A9D5] text-white"
            : "bg-white/40 text-[#05A9D5]  hover:shadow-xl"
        } backdrop-filter backdrop-blur-sm shadow-md rounded-lg flex justify-center items-center`}
      >
        {icon}
      </div>
    </div>
  );
};

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/1`);
      setUser(response.data); 
    } catch (error) {
      console.error("Error fetching User data:", error);
    }
  };

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
      getUser(); 
    }, []);

  return (
    <>
      <Navbar  />
      <section id="home" className="flex  flex-col justify-center relative">
        <img
          src={Elemen}
          className="relative md:h-screen h-[950px] w-full object-cover"
          alt="Background"
        />
        <div className="w-12 max-md:hidden ml-10 z-[1000] h-72 fixed top-1/2 transform -translate-y-1/2 flex flex-col items-center">
          <MenuItem
            icon={<HiOutlineHome className="text-2xl" />}
            sectionId="home"
            onClick={handleMenuItemClick}
          />
          <MenuItem
            icon={<FaRegUser className="text-2xl" />}
            sectionId="about"
            onClick={handleMenuItemClick}
          />
          <MenuItem
            icon={<BiCodeCurly className="text-2xl" />}
            sectionId="skills"
            onClick={handleMenuItemClick}
          />
          <MenuItem
            icon={<FaCodeBranch className="text-2xl" />}
            sectionId="projects"
            onClick={handleMenuItemClick}
          />
          <MenuItem
            icon={<FaCertificate className="text-2xl" />}
            sectionId="certificates"
            onClick={handleMenuItemClick}
          />
        </div>
        <div className=" lg:flex absolute md:top-1/2 md:mt-10 transform top-24  md:-translate-y-1/2">
          <div className="md:w-1/2 animate__animated animate__zoomIn  w-5/6 mx-auto md:ml-44 font-body">
            <h1 className="text-xl font-medium text-[#0D6B91]">
              Hi There, I’m
            </h1>
            <h1 className="text-5xl py-2 font-bold text-[#0D6B91]">
            {user?.username || "Loading..."}
            </h1>
            <h1 className="md:text-6xl text-4xl pb-2 font-bold text-[#05A9D5]">
            {user?.title_role || "Loading..."}
            </h1>
            <h1 className="md:text-xl font-medium text-[#0D6B91]">
            {user?.deskripsi || "Loading..."}
            </h1>
          </div>
          <div className="md:w-1/2 animate__animated animate__zoomIn  max-md:mt-5 mx-auto">
            <img src={user?.url_photo || "Loading..."} className="md:w-1/2 w-2/3 md:ml-32 mx-auto" alt="" />
          </div>
        </div>
      </section>

      <section
        id="about"
        className="md:h-screen bg-white relative md:py-32"
        onClick={() => handleMenuItemClick("about")}
      >
        <div  className="md:w-1/2 w-5/6  mx-auto flex flex-col items-center justify-center font-body">
          <h1 
      data-aos="fade-up"
     data-aos-duration="1000" className="font-bold text-2xl  text-center md:text-4xl text-[#0D6B91]">About Me</h1>
          <h1 
      data-aos="fade-up"
     data-aos-duration="1000" className="font-semibold md:px-20 px-5 mt-5 text-lg  md:text-2xl py-1 text-[#05A9D5] text-center">
          {user?.title_about || "Loading..."}
          </h1>
          <h1 
      data-aos="fade-up"
     data-aos-duration="2000" className="text-center mt-5 text-[#0D6B91]">
          {user?.deksripsi_about1 || "Loading..."}
          </h1>
          <h1 
      data-aos="fade-up"
     data-aos-duration="3000" className="text-center my-5 text-[#0D6B91]">
          {user?.deksripsi_about2 || "Loading..."}
          </h1>
          <a href="https://drive.google.com/file/d/1qzhZA6YdSLKvKuCd7bncCRTCse-naqjj/view?usp=sharing" data-aos="fade-up"
     data-aos-duration="3000" className="border-2 flex max-md:mb-5 gap-3 items-center border-[#0D6B91] py-2 px-5  rounded-lg bg-[#0D6B91] bg-opacity-60 shadow-md text-white"
          >View Resume <BsArrowUpRightSquareFill/></a>
        </div>
      </section>
      <section
        id="skills"
        className="h-auto bg-white"
        onClick={() => handleMenuItemClick("skills")}
      >
        <Skills/>
      </section>
      <section
        id="projects"
        className="h-auto bg-white"
        onClick={() => handleMenuItemClick("projects")}
      >
        <Project/>
      </section>
      <section
        id="certificates"
        className="h-auto bg-[#0E1F2A]"
        onClick={() => handleMenuItemClick("certificates")}
      >
        <Sertifikat/>
      </section>
      <Footer/>
    </>
  );
};

export default Home;
