import React, { useState, useEffect } from 'react'
import Elemen from "../assets/elemen.png";
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaCalendarDays } from "react-icons/fa6";
import Footer from "../components/Footer";

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);

  const getArtikel = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7800/artikel"
      );
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching Artikel data:", error);
    }
  };

  useEffect(() => {
    getArtikel();
    document.title = 'Artikel';
  }, []);

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : description;
  };

  return (
    <>
    <Navbar/>
    <section className='relative'>
    <img src={Elemen} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
        <div className="relative z-10 container max-md:px-5 md:mx-auto py-10" >
        <h1 className="md:text-3xl max-md:-mt-2 text-xl md:mt-16 md:ml-10 text-[#0D6B91] font-body font-bold  mb-8">
          <span role="img" aria-label="target">📝</span> Article 
        </h1>
        <div data-aos="fade-up"
     data-aos-duration="2000" className="flex justify-center gap-12 flex-wrap">
        {artikel.map((artikel) => (
          <div
            key={artikel.id}
            className="md:w-[330px]  h-auto bg-white rounded-xl shadow-lg p-5"
          >
            <figure className="relative group">
              <img
                src={artikel.link_foto}
                className="w-full md:h-40 rounded-md  object-cover transition-transform duration-300 transform scale-100 group-hover:scale-105"
              />
              
            </figure>
            <h1 className="font-body h-24 text-[#0D6B91] pt-3 font-bold text-lg">
              {artikel.judul}
            </h1>
            <h1 className='font-body font-bold flex items-center gap-2 text-gray-400 py-2'><FaCalendarDays/>{artikel.tanggal}</h1>
            <h3 className="font-body h-24 text-justify">
              {truncateDescription(artikel.isi, 20).replace(/\\n/g, "\n")
                .replace(/\\/g, "")
                .replace(/"/g, "")
                .split("\n")}
            </h3>
            <div className="flex mt-4 float-right">
              
              <a
              href={`/artikel/detail/${artikel.id}`}
                className="flex duration-300 font-body py-1 px-5 bg-white border border-[#0D6B91] hover:bg-[#082F44] hover:text-white text-[#0D6B91] rounded-md shadow-md gap-3 text-lg items-center"
               
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
        </div>
    </section>
    <Footer/>
    </>
  )
}

export default Artikel