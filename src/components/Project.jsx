import React, { useState, useEffect } from "react";
import {
  BsArrowUpRightSquareFill,
  BsArrowRightSquareFill,
} from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import DetailProject from "./DetailProject";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [languageIcons, setLanguageIcons] = useState({});

  const getProject = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/project`
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const getSkills = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/skill`
      );
      setSkills(response.data);
      
      // Create languageIcons object from skills data
      const icons = {};
      response.data.forEach(skill => {
        icons[skill.name.toLowerCase()] = skill.link_foto;
      });
      setLanguageIcons(icons);
    } catch (error) {
      console.error("Error fetching Skills data:", error);
    }
  };

  useEffect(() => {
    getProject();
    getSkills();
  }, []);

  const toggleForm = (id) => {
    setSelectedProjectId(id);
    setShowForm(true);
  };

  const toggleCloseForm = () => {
    setShowForm(false);
    setSelectedProjectId(null);
  };

  const displayedProjects = window.innerWidth < 768 && !showAll 
    ? projects.slice(0, 3) 
    : projects;

  return (
    <div className="container mx-auto py-10">
      <h1 
        data-aos="fade-down"
        data-aos-duration="2000" 
        className="md:text-3xl text-xl text-[#0D6B91] font-body font-bold text-center md:mt-16 mb-8"
      >
        <span role="img" aria-label="target"></span>Project I've Created💼
      </h1>
      <div 
        data-aos="fade-up"
        data-aos-duration="2000" 
        className="flex justify-center gap-12 flex-wrap"
      >
        {displayedProjects.map((project) => (
          <div
            key={project.id}
            className="md:w-[330px] w-4/5 h-auto rounded-xl shadow-lg p-5"
          >
            <figure className="relative group">
              <img
                src={project.link_foto}
                className="w-full border border-[#0D6B91] h-40 rounded-md object-cover"
                alt={project.name}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-transparent rounded-md backdrop-filter backdrop-blur-sm">
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
                  .map((language, index) => {
                    const trimmedLanguage = language.trim().toLowerCase();
                    return (
                      <span
                        key={index}
                        className="inline-flex items-center bg-white border shadow-md rounded-md my-1 px-3 py-1 text-sm gap-1 font-semibold text-gray-700 mr-2"
                      >
                        {languageIcons[trimmedLanguage] && (
                          <img 
                            src={languageIcons[trimmedLanguage]} 
                            alt={language.trim()} 
                            className="w-4 h-4"
                          />
                        )}
                        <span className="ml-1">{language.trim()}</span>
                      </span>
                    );
                  })}
            </div>
            <div className="flex mt-2 gap-3 justify-between">
              <button
                onClick={() => toggleForm(project.id)}
                className="flex font-body duration-300 py-1 px-4 md:px-5 bg-[#0D6B91] border border-[#0D6B91] hover:bg-[#082F44] text-white rounded-md shadow-md gap-3 text-lg items-center"
              >
                Details <BsArrowRightSquareFill />
              </button>
              <Link
                to={project.link_preview}
                className="flex font-body duration-300 py-1 px-4 md:px-5 bg-white border border-[#0D6B91] hover:bg-[#082F44] hover:text-white text-[#0D6B91] rounded-md shadow-md gap-3 text-lg items-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Preview <BsArrowUpRightSquareFill />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {window.innerWidth < 768 && skills.length > 6 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#0D6B91] text-white w-64 max-md:mb-5 px-12 py-2 rounded-md font-body font-semibold hover:bg-opacity-80 transition-all duration-300"
            >
              {showAll ? "Lebih Sedikit" : "Lihat Semuanya"}
            </button>
          </div>
        )}

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