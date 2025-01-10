import React, { useState, useEffect } from 'react';
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from "axios";

const Footer = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/1`);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching User data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <div className="w-full h-80 bg-[#0E1F2A] flex items-center justify-center">
      <p className="text-white">Loading...</p>
    </div>;
  }

  return (
    <div className='w-full font-body h-auto min-h-80 border-t border-white bg-[#0E1F2A] p-5 md:p-10 relative bottom-0'>
      <h1 className='md:text-3xl text-xl md:ml-16 font-bold text-white'>
        👋 Let&apos;s get connected!
      </h1>
      
      <div className='flex max-md:justify-between mt-4 items-center border-b border-white pb-5'>
        <img 
          src={user?.url_photo_contact} 
          className='w-32 md:ml-20 rounded-md' 
          alt="Contact" 
        />
        <div className='pl-5'>
          <h1 className='text-white md:text-2xl font-semibold'>Contact me on:</h1>
          <h1 className='md:text-lg text-sm flex items-center gap-2 text-white border-b-2 border-white py-2'>
          {user?.url_email && (
            <Link 
              to={`mailto:${user.url_email}`} 
              className='text-2xl text-white hover:text-gray-300 transition-colors'
            >
              <MdOutlineMail />
            </Link>
          )}
            {user?.url_email}
          </h1>
          <h1 className='md:text-lg text-sm flex items-center gap-2 py-2 text-white'>
            
            {user?.url_ig && (
            <Link 
              to={user.url_ig} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='text-2xl text-white hover:text-gray-300 transition-colors'
            >
             <FaInstagram />
            </Link>
          )}
            @febriyandy_
          </h1>
        </div>
      </div>

      <div className='md:flex items-center mt-2 justify-between'>
        <div className='flex py-5 max-md:justify-center gap-14 md:gap-8 items-center'>
          {user?.url_linkedin && (
            <Link 
              to={user.url_linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='text-2xl text-white hover:text-gray-300 transition-colors'
            >
              <CiLinkedin />
            </Link>
          )}
          
          {user?.url_github && (
            <Link 
              to={user.url_github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className='text-xl text-white hover:text-gray-300 transition-colors'
            >
              <LuGithub />
            </Link>
          )}
          
          {user?.url_email && (
            <Link 
              to={`mailto:${user.url_email}`} 
              className='text-2xl text-white hover:text-gray-300 transition-colors'
            >
              <MdOutlineMail />
            </Link>
          )}
          
          {user?.url_x && (
            <Link 
              to={user.url_x}
              target="_blank" 
              rel="noopener noreferrer" 
              className='text-xl text-white hover:text-gray-300 transition-colors'
            >
              <FaXTwitter />
            </Link>
          )}
        </div>
        
        <h1 className='font-medium max-md:text-center md:text-xl text-white'>
          &copy; {new Date().getFullYear()} by Febriandi
        </h1>
      </div>
    </div>
  );
};

export default Footer;