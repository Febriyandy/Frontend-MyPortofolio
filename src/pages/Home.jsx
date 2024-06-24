import React, { useState, useEffect } from "react";
import Elemen from "../assets/elemen.png";
import Navbar from "../components/Navbar";
import { HiOutlineHome } from "react-icons/hi";
import { FaRegUser, FaCertificate } from "react-icons/fa";
import { BiCodeCurly } from "react-icons/bi";
import { FaCodeBranch } from "react-icons/fa6";
import Foto from "../assets/foto.png";
import Foto2 from "../assets/foto2.png";
import Skills from "../components/Skills";
import Project from "../components/Project";
import Sertifikat from "../components/Sertifikat";
import Footer from "../components/Footer";

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

  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              febriandi.
            </h1>
            <h1 className="md:text-6xl text-4xl pb-2 font-bold text-[#05A9D5]">
              Full-stack Developer
            </h1>
            <h1 className="md:text-xl font-medium text-[#0D6B91]">
              I'm a junior programmer and a student of Informatics Engineering
              focusing on web development and software development, and I want
              to develop into a professional programmer.
            </h1>
          </div>
          <div className="md:w-1/2 animate__animated animate__zoomIn  max-md:mt-5 mx-auto">
            <img src={Foto} className="md:w-1/2 w-2/3 md:ml-32 mx-auto" alt="" />
          </div>
        </div>
      </section>

      <section
      data-aos="fade-up"
     data-aos-duration="1000"
        id="about"
        className="md:h-screen md:py-10 bg-white md:flex relative"
        onClick={() => handleMenuItemClick("about")}
      >
        <div  className="md:w-1/2  flex justify-center items-center">
          <img  src={Foto2} className="md:w-2/5 w-2/3 max-md:-mt-56" alt="" />
        </div>
        <div className="md:w-1/2 w-5/6 max-md:mt-10 mx-auto flex flex-col justify-center font-body md:pr-20">
          <h1 className="font-bold text-2xl md:text-4xl text-[#0D6B91]">About Me</h1>
          <h1 className="font-semibold text-lg md:text-2xl py-1 text-[#05A9D5]">
            Hallo, I'm Febriandi <br />A Fullstack Develope 🧑‍💻 based in
            Indonesia🌏
          </h1>
          <h1 className="text-justify text-[#0D6B91]">
            As a junior fullstack developer, I have experience in designing and
            developing responsive and engaging user interfaces (UI) using HTML,
            CSS, and JavaScript, as well as efficient databases. <br /> <br /> I am a
            student in the Informatic Engineering program, with main expertise
            in fullstack development. Additionally, I have skills in graphic
            design and video editing. I hope to continually learn new things to
            create digital applications that can help many people in the future.
            I am able to work independently or as part of a team.
          </h1>
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
