import React, { useState, useEffect } from 'react';
import Elemen from "../assets/elemen.png";
import Navbar from '../components/Navbar';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaCalendarDays } from "react-icons/fa6";
import Footer from './Footer';

const DetailArtikel = () => {
  const [artikel, setArtikel] = useState({});
  const [otherArtikel, setOtherArtikel] = useState([]);
  const { id } = useParams();

  const getArtikelById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artikel/${id}`
      );
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const getOtherArtikel = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artikel`
      );
      setOtherArtikel(response.data.filter(item => item.id !== parseInt(id)).slice(0, 3));
    } catch (error) {
      console.error("Error fetching Artikel data:", error);
    }
  };
  

  useEffect(() => {
    document.title = 'Detail Artikel';
    getArtikelById();
    getOtherArtikel();
  }, [id]);

  return (
    <>
      <Navbar />
      <section className='relative'>
        <img src={Elemen} className='w-full h-full absolute top-0 left-0 object-cover' alt="" />
        <div className="relative md:flex max-md:px-5 z-10 container mx-auto py-10">
          <div data-aos="fade-up"
     data-aos-duration="1000" className='md:w-2/3 h-auto mx-auto mt-10 md:mt-16 p-5 md:p-10 bg-white rounded-lg shadow-lg'>
            <div className='flex gap-1 font-body font-semibold md:text-lg text-gray-400'>
              <Link to="/" className='hover:text-[#0D6B91]'>Home /</Link>
              <Link to="/artikel" className='hover:text-[#0D6B91]'>Article /</Link>
              <h1>Detail Article </h1>
            </div>
            {artikel && (
              <div>
                <h1 className='font-bold w-full text-[#0D6B91] font-body text-xl md:text-3xl mt-4'>{artikel.judul}</h1>
                <h1 className='font-body font-bold flex items-center gap-2 text-gray-400 py-2'>
                  <FaCalendarDays />{artikel.tanggal}
                </h1>
                <div className='md:w-5/6 md:h-96 mx-auto max-md:mt-1 mb-5'>
                  <img src={artikel.link_foto} className='w-full h-full rounded-lg object-cover' alt="" />
                </div>
                <div>
                  {artikel.isi && artikel.isi
                    .replace(/\\\\n/g, '\n\n')
                    .replace(/"/g, '')
                    .replace(/\\/g, "")
                    .split('\n')
                    .map((line, index) => (
                      <p className='font-body text-justify' key={index} style={{ marginBottom: '1em' }}>{line}</p>
                    ))}
                </div>
              </div>
            )}

          </div>
          <div data-aos="fade-up"
     data-aos-duration="1000" className='md:w-1/3 mx-auto md:ml-10 mt-7 md:mt-16 p-5 rounded-md shadow-md h-max bg-white'>
            <h1 className='font-bold w-full text-[#0D6B91] font-body text-xl'>Other Articles</h1>
            {otherArtikel.map((item) => (
              <div key={item.id} className='w-full md:h-32 flex gap-3 rounded-md mt-3 shadow-md p-3 items-center'>
                <img src={item.link_foto} className='md:w-24 w-14 h-14 md:h-24  rounded-md object-cover' alt="" />
                <div>
                  <a href={`/artikel/detail/${item.id}`}><h1 className='font-body max-md:text-xs font-semibold'>{item.judul}</h1></a>
                  <h1 className='flex items-center max-md:text-xs gap-2 font-body text-gray-400'><FaCalendarDays/>{item.tanggal}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </>
  );
}

export default DetailArtikel;
