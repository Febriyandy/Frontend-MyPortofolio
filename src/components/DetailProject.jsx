import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
import { IoMdClose } from "react-icons/io";

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

const DetailProject = ({ showForm, toggleCloseForm, projectId }) => {
  const [project, setProject] = useState(null);
  const navigate = useNavigate();

  const getProjectById = async () => {
    try {
      const response = await axios.get(`http://localhost:7800/project/${projectId}`);
      if (response.data) {
        setProject(response.data);
      }
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  useEffect(() => {
    if (projectId) {
      getProjectById();
    }
  }, [projectId]);

  return (
    <>
      {showForm && project && (
        <div className="fixed z-[1000] top-0 left-0 p-5 w-full h-screen bg-transparent backdrop-filter backdrop-blur-sm shadow-sm flex items-center justify-center">
          <div className="md:w-1/2 animate__animated animate__zoomIn w-full md:h-full h-4/5 overflow-y-auto bg-white shadow-2xl rounded-xl p-7">
          <div className="w-full flex justify-between items-center">
          <h1 className="font-body font-bold md:text-xl pb-3 text-[#0D6B91]">{project.name}</h1>
          <button 
          onClick={toggleCloseForm}
          className="md:text-2xl mb-5 p-1 duration-300 rounded-md hover:bg-gray-100"><IoMdClose/></button>
          </div>
            <img src={project.link_foto} className="w-full shadow-lg rounded-lg" alt={project.name} />
            <div className="w-full mt-4">
              {project.bahasa_pemrograman &&
                project.bahasa_pemrograman
                  .replace(/\\|"|\[|\]/g, "")
                  .split(",")
                  .map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-white shadow-lg rounded-md my-1 px-3 py-1 text-sm gap-1 font-semibold text-gray-700 mr-2"
                    >
                      {languageIcons[language.trim().toLowerCase()]}
                      <span className="ml-1">{language.trim()}</span>
                    </span>
                  ))}
            </div>
            <h1 className="text-[#0D6B91] md:text-xl text-lg font-body font-bold mt-2">Description</h1>
            <h3 className="font-body  text-justify mt-2">
              {project.deskripsi}
            </h3>
            <div className="flex mt-4 gap-2 md:gap-3 max-md:justify-between">
            <Link
                to={project.link_github}
                className="flex duration-300 font-body py-1 px-1 md:px-5 bg-white border border-[#0D6B91] hover:bg-[#082F44] hover:text-white text-[#0D6B91] rounded-md shadow-md gap-3 text-lg items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub /> Project Repository 
              </Link>
              <button
              onClick={toggleCloseForm}
               className="flex duration-300 font-body px-2 py-1 md:px-5 bg-[#0D6B91] border border-[#0D6B91] hover:bg-[#082F44] text-white rounded-md shadow-md gap-3 text-lg items-center">
                Close
              </button>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailProject;
