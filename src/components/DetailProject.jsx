import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const DetailProject = ({ showForm, toggleCloseForm, projectId }) => {
  const [project, setProject] = useState(null);
  const [skills, setSkills] = useState([]);
  const [languageIcons, setLanguageIcons] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getSkills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/skill`);
      setSkills(response.data);
      
      // Create languageIcons object from skills data
      const icons = {};
      response.data.forEach(skill => {
        icons[skill.name.toLowerCase()] = skill.link_foto;
      });
      setLanguageIcons(icons);
    } catch (error) {
      setError("Error fetching skills data");
      console.error("Error fetching Skills data:", error);
    }
  };

  const getProjectById = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/project/${projectId}`);
      if (response.data) {
        setProject(response.data);
      }
    } catch (error) {
      setError("Error fetching project data");
      console.error("Error getting project data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSkills();
      if (projectId) {
        await getProjectById();
      }
    };
    
    fetchData();
  }, [projectId]);

  const parseLanguages = (languagesString) => {
    if (!languagesString) return [];
    return languagesString
      .replace(/\\|"|\[|\]/g, "")
      .split(",")
      .map(lang => lang.trim())
      .filter(Boolean);
  };

  if (!showForm || !project) return null;

  return (
    <div className="fixed inset-0 z-[1000] p-5 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div className="md:w-2/3 w-full md:h-full h-4/5 overflow-y-auto bg-white shadow-2xl rounded-xl p-7 animate__animated animate__zoomIn">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-body font-bold md:text-xl text-[#0D6B91]">
            {project.name}
          </h1>
          <button 
            onClick={toggleCloseForm}
            className="md:text-2xl p-1 duration-300 rounded-md hover:bg-gray-100"
            aria-label="Close"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Project Image */}
        {project.link_foto && (
          <img 
            src={project.link_foto} 
            className="w-full shadow-lg rounded-lg object-cover"
            alt={project.name} 
          />
        )}

        {/* Programming Languages */}
        <div className="w-full mt-4 flex flex-wrap gap-2">
          {parseLanguages(project.bahasa_pemrograman).map((language, index) => {
            const trimmedLanguage = language.toLowerCase();
            return (
              <span
                key={index}
                className="inline-flex items-center bg-white border shadow-md rounded-md px-3 py-1 text-sm font-semibold text-gray-700"
              >
                {languageIcons[trimmedLanguage] && (
                  <img 
                    src={languageIcons[trimmedLanguage]} 
                    alt={language} 
                    className="w-4 h-4 mr-1"
                  />
                )}
                {language}
              </span>
            );
          })}
        </div>

        {/* Description */}
        <div className="mt-4">
          <h2 className="text-[#0D6B91] md:text-xl text-lg font-body font-bold">
            Description
          </h2>
          <p className="font-body text-justify mt-2">
            {project.deskripsi}
          </p>
        </div>

        {/* Actions */}
        <div className="flex mt-6 gap-3 items-center">
          <Link
            to={project.link_github}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#0D6B91] text-[#0D6B91] hover:bg-[#082F44] hover:text-white rounded-md shadow-md transition-colors duration-300 font-body"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl" />
            <span>Project Repository</span>
          </Link>
          
          <button
            onClick={toggleCloseForm}
            className="hidden md:flex items-center px-4 py-2 bg-[#0D6B91] border border-[#0D6B91] text-white hover:bg-[#082F44] rounded-md shadow-md transition-colors duration-300 font-body"
          >
            Close
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailProject;