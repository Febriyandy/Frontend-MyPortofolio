import React, { useEffect, useState } from "react";
import axios from "axios";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const getSkills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/skill`);
      setSkills(response.data);
    } catch (error) {
      console.error("Error fetching skill data:", error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  const displayedSkills = window.innerWidth < 768 && !showAll 
    ? skills.slice(0, 6) 
    : skills;

  return (
    <div className="relative bg-[#0E1F2A]">
      <div className="relative z-10 container mx-auto md:py-28 pt-10">
        <h1
          data-aos="fade-down"
          data-aos-duration="1000"
          className="text-2xl md:text-4xl text-white font-body font-bold text-center mb-8"
        >
          <span role="img" aria-label="target">
            🎯
          </span>
          My Skills and Tools
        </h1>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="md:grid-cols-4 grid grid-cols-2  gap-5 md:px-28 px-5 justify-center"
        >
          {displayedSkills.map((skill) => (
            <div
              key={skill.id}
              className="flex bg-[#0D6B91] bg-opacity-35  cursor-pointer items-center gap-2 border-2 border-[#0D6B91] rounded-md shadow-md w-auto h-auto p-2 relative group"
            >
              <img src={skill.link_foto} className="h-10" alt={skill.name} />
              <div className="flex flex-col">
                <h1 className="font-body text-white font-semibold transform transition-transform duration-700 md:group-hover:-translate-y-2">
                  {skill.name}
                </h1>
                <h1 className="font-body max-md:hidden font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-7">
                  {skill.level}
                </h1>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show "See All" button only on mobile when there are more than 5 skills */}
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
      </div>
    </div>
  );
};

export default Skills;