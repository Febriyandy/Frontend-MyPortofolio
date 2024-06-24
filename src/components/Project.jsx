import React, { useState, useEffect } from "react";
import {
  BsArrowUpRightSquareFill,
  BsArrowRightSquareFill,
} from "react-icons/bs";
import {
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaPhp,
  FaBootstrap,
  FaReact as FaFlutter,
} from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { IoLogoJavascript } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import DetailProject from "./DetailProject";

const languageIcons = {
  html: <FaHtml5 className="text-orange-500" />,
  css: <FaCss3Alt className="text-blue-500" />,
  javascript: <IoLogoJavascript className="text-yellow-500" />,
  tailwindcss: <RiTailwindCssFill className="text-teal-500" />,
  bootstrap: <FaBootstrap className="text-purple-500" />,
  "react js": <FaReact className="text-blue-300" />,
  php: <FaPhp className="text-purple-500" />,
  flutter: <FaFlutter className="text-blue-400" />,
  nodejs: <FaNodeJs className="text-green-500" />,
};

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const getProject = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7800/project"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const toggleForm = (id) => {
    setSelectedProjectId(id);
    setShowForm(true);
  };

  const toggleCloseForm = () => {
    setShowForm(false);
    setSelectedProjectId(null);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  return (
    <div className="container mx-auto py-10">
      <h1 data-aos="fade-down"
     data-aos-duration="2000" className="md:text-3xl text-xl text-[#0D6B91] font-body font-bold text-center mb-8">
        <span role="img" aria-label="target"></span>Project I've Created💼
      </h1>
      <div data-aos="fade-up"
     data-aos-duration="2000" className="flex justify-center gap-12 flex-wrap">
        {projects.map((project) => (
          <div
            key={project.id}
            className="md:w-[330px] w-4/5 h-auto rounded-xl shadow-lg p-5"
          >
            <figure className="relative group">
              <img
                src={project.link_foto}
                className="w-full border border-[#0D6B91] md:h-40 rounded-md  object-cover"
                alt={project.name}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-transparent rounded-md backdrop-filter backdrop-blur-sm ">
                <Link
                  to={project.link_github}
                  className="text-white text-2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-10 h-10 p-2 rounded-full bg-white text-[#0D6B91]" />
                </Link>
              </div>
            </figure>
            <h1 className="font-body text-[#0D6B91] pt-3 font-bold md:text-lg">
              {project.name}
            </h1>
            <div className="w-full h-20">
              {project.bahasa_pemrograman &&
                project.bahasa_pemrograman
                  .replace(/\\|"|\[|\]/g, "")
                  .split(",")
                  .map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-white shadow-md rounded-md my-1 px-3 py-1 text-sm gap-1 font-semibold text-gray-700 mr-2"
                    >
                      {languageIcons[language.trim().toLowerCase()]}
                      <span className="ml-1">{language.trim()}</span>
                    </span>
                  ))}
            </div>
            <h3 className="font-body md:h-24 text-justify">
              {truncateDescription(project.deskripsi, 15)}
            </h3>
            <div className="flex mt-4 gap-3 justify-between">
              <button
              onClick={() => toggleForm(project.id)}
               className="flex font-body duration-300 py-1 px-3 md:px-5 bg-[#0D6B91] border border-[#0D6B91] hover:bg-[#082F44] text-white rounded-md shadow-md gap-3 text-lg items-center">
                Details <BsArrowRightSquareFill />
              </button>
              <Link
                to={project.link_preview}
                className="flex font-body duration-300 py-1 px-3 md:px-5 bg-white border border-[#0D6B91] hover:bg-[#082F44] hover:text-white text-[#0D6B91] rounded-md shadow-md gap-3 text-lg items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview <BsArrowUpRightSquareFill />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <DetailProject
          showForm={showForm}
          toggleCloseForm={toggleCloseForm}
          projectId={selectedProjectId}
        />
      )}
    </div>
  );
};

export default Project;
