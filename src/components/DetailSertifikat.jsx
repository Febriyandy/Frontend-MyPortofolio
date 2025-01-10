import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdClose } from "react-icons/io";

const DetailSertifikat = ({ showForm, toggleCloseForm, sertifikatId }) => {
  const [sertifikat, setSertifikat] = useState(null);
  const [error, setError] = useState(null);

  const getSertifikatById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/sertifikat/${sertifikatId}`
      );
      setSertifikat(response.data);
    } catch (error) {
      console.error("Error fetching sertifikat data:", error);
      setError("Failed to load certificate details");
    }
  };

  useEffect(() => {
    if (sertifikatId) {
      getSertifikatById();
    }
  }, [sertifikatId]);

  // Function to convert hex color to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    if (!hex) return 'rgba(0, 0, 0, 0.3)';
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  if (!showForm || !sertifikatId || !sertifikat) return null;

  return (
    <div className="fixed inset-0 z-[1000] p-5 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <div 
        className="md:w-2/3 w-full md:h-full h-4/5 backdrop-blur-lg overflow-y-auto shadow-2xl rounded-xl p-5 md:p-7 animate__animated animate__zoomIn"
        style={{
          backgroundColor: hexToRgba(sertifikat.color, 0.5),
          borderColor: sertifikat.color,
        }}
      >
        <div className="flex justify-between items-center mb-5">
          <h1 className="font-body font-bold md:text-xl text-white">
            {sertifikat.bagian}
          </h1>
          <button 
            onClick={toggleCloseForm}
            className="md:text-2xl p-1 duration-300 rounded-md bg-white hover:bg-gray-100"
            aria-label="Close"
          >
            <IoMdClose />
          </button>
        </div>

        {/* Certificate Image */}
        {sertifikat.link_foto && (
          <img 
            src={sertifikat.link_foto} 
            className="w-full shadow-lg rounded-lg object-cover"
            alt={sertifikat.name} 
          />
        )}

        <div className="h-auto md:my-10 max-md:mt-5 md:m-5 md:mx-10">
          <div className="md:flex justify-between gap-5 items-center">
            {sertifikat.link_icon && (
              <img
                src={sertifikat.link_icon}
                className="md:w-36 w-24 rounded-md"
                alt=""
              />
            )}
            <div className="max-md:mt-5">
              <h1 className="font-body font-bold text-white text-xl md:text-2xl">
                {sertifikat.name}
              </h1>
              <h1 className="font-body font-medium text-white md:text-xl">
                {sertifikat.perusahaan}
              </h1>
              <h1 className="font-body font-medium text-white text-base">
                {sertifikat.tanggal_kegiatan}
              </h1>
            </div>
          </div>
          <h1 className="font-bold text-white font-body text-xl md:text-2xl">
            Competencies acquired:
          </h1>
          <ul className="font-body mt-3 text-white list-outside text-base">
            {sertifikat.deskripsi && sertifikat.deskripsi
              .replace(/\\n/g, "\n")
              .replace(/\\/g, "")
              .replace(/"/g, "")
              .split("\n")
              .map((item, index) => (
                <li key={index} className="flex items-center">
                  <span className="bulleted-text mr-2">•</span>
                  <span className="flex-1">{item}</span>
                </li>
              ))}
          </ul>
        </div>
        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailSertifikat;