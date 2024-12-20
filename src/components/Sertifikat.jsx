import React, { useEffect, useState } from "react";
import axios from "axios";

const Sertifikat = () => {
  const [sertifikat, setSertifikat] = useState([]);

  const getSertifikat = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/sertifikat`
      );
      setSertifikat(response.data);
    } catch (error) {
      console.error("Error fetching skill data:", error);
    }
  };

  useEffect(() => {
    getSertifikat();
  }, []);

  // Function to convert hex color to rgba with opacity
  const hexToRgba = (hex, opacity) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="container w-full mx-auto h-auto py-10 bg-transparent">
      <h1 data-aos="fade-down"
     data-aos-duration="2000" className="md:text-3xl text-xl max-md:px-5 text-white font-body font-bold text-center mb-8">
        <span  role="img" aria-label="target">
          🏢{" "}
        </span>
        Certificate and Work Experiences
      </h1>
      {sertifikat.map((sertifikat, index) => (
        <div
        data-aos="fade-up"
     data-aos-duration="2000"
          key={index}
          className="w-5/6 h-auto my-10 md:flex mx-auto rounded-xl border-4"
          style={{
            backgroundColor: hexToRgba(sertifikat.color, 0.3),
            borderColor: sertifikat.color,
          }}
        >
          <div className="md:w-1/2 h-full md:my-10 m-5 md:mx-10">
            <div className="md:flex gap-5 items-center">
              <img
                src={sertifikat.link_icon}
                className="w-36  rounded-md"
                alt=""
              />
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
            <div
            style={{ backgroundColor: sertifikat.color }}
             className="text-white  font-body mt-5 py-2 md:py-4 px-4 md:px-8 rounded-md absolute">
              <h1>{sertifikat.bagian}</h1>
            </div>
            <div>
              <img
                src={sertifikat.link_foto}
                className="md:mt-24 mt-20 rounded-lg shadow-md"
                alt=""
              />
            </div>
          </div>
          <div className="md:w-1/2 h-full md:p-10 px-5 pb-5">
            <h1 className="font-bold text-white font-body text-xl md:text-2xl">
              Competencies acquired:
            </h1>
            <ul className="font-body mt-3 text-white list-outside text-base">
              {sertifikat.deskripsi
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
        </div>
      ))}
    </div>
  );
};

export default Sertifikat;
