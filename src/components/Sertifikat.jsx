import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsArrowRightSquareFill } from "react-icons/bs";
import DetailSertifikat from "./DetailSertifikat";

const Sertifikat = () => {
  const [sertifikat, setSertifikat] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSertifikatId, setSelectedSertifikatId] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const getSertifikat = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/sertifikat`
      );
      setSertifikat(response.data);
    } catch (error) {
      console.error("Error fetching sertifikat data:", error);
    }
  };

  useEffect(() => {
    getSertifikat();
  }, []);

  const toggleForm = (id) => {
    setSelectedSertifikatId(id);
    setShowForm(true);
  };

  const toggleCloseForm = () => {
    setShowForm(false);
    setSelectedSertifikatId(null);
  };

  const displayedSertifikat = window.innerWidth < 768 && !showAll 
    ? sertifikat.slice(0, 3) 
    : sertifikat;

  const hexToRgba = (hex, opacity) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="container w-full mx-auto h-auto py-10 bg-transparent">
      <h1 
        data-aos="fade-down"
        data-aos-duration="2000" 
        className="md:text-3xl text-xl max-md:px-5 md:mt-16 text-white font-body font-bold text-center mb-8"
      >
        <span role="img" aria-label="target">🏢 </span>
        Certificate and Work Experiences
      </h1>
      <div 
        data-aos="fade-up"
        data-aos-duration="2000" 
        className="flex justify-center gap-12 flex-wrap"
      >
        {displayedSertifikat.map((sertifikat) => (
          <div
            key={sertifikat.id}
            className="md:w-[330px] w-4/5 border-2 h-auto rounded-xl shadow-lg p-5"
            style={{
              backgroundColor: hexToRgba(sertifikat.color, 0.3),
              borderColor: sertifikat.color,
            }}
          >
            <figure className="relative group">
              <img
                src={sertifikat.link_foto}
                className="md:w-[330px] border border-[#0D6B91] h-auto rounded-md object-cover"
                alt={sertifikat.name}
              />
              <div className="mt-5">
                <h1 className="font-body font-bold text-white text-xl md:text-2xl">
                  {sertifikat.name}
                </h1>
                <h1 className="font-body font-medium text-white md:text-xl">
                  {sertifikat.perusahaan}
                </h1>
                <h1 className="font-body font-medium text-white text-base">
                  {sertifikat.tanggal_kegiatan}
                </h1>
                <button
                  onClick={() => toggleForm(sertifikat.id)}
                  style={{
                    backgroundColor: hexToRgba(sertifikat.color, 0.8),
                    borderColor: sertifikat.color,
                  }}
                  className="flex mt-3 font-body duration-300 py-1 px-4 md:px-5 bg-[#0D6B91] border border-[#0D6B91] hover:bg-[#082F44] text-white rounded-md shadow-md gap-3 text-lg items-center"
                >
                  Lihat Detail<BsArrowRightSquareFill />
                </button>
              </div>
            </figure>
          </div>
        ))}
      </div>
      
      {window.innerWidth < 768 && sertifikat.length > 3 && (
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
        <DetailSertifikat
          showForm={showForm}
          toggleCloseForm={toggleCloseForm}
          sertifikatId={selectedSertifikatId}
        />
      )}
    </div>
  );
};

export default Sertifikat;