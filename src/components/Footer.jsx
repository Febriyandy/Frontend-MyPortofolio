import React from 'react'
import Foto from "../assets/foto3.jpg"
import { SiGmail } from "react-icons/si";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <>
    <div className='w-full font-body h-80 border-t border-white bg-[#0E1F2A] p-5 md:p-10 relative bottom-0'>
        <h1 className='md:text-3xl text-xl md:ml-16 font-bold text-white'>👋 Let's get connected!</h1>
        <div className='flex max-md:justify-between mt-4 items-center border-b border-white pb-5'>
            <img src={Foto} className='w-32 md:ml-20 rounded-md' alt="" />
            <div className='pl-5'>
                <h1 className='text-white md:text-2xl font-semibold'>Contact me on :</h1>
                <h1 className='md:text-lg text-sm flex items-center gap-2 text-white border-b-2 border-white py-2'><SiGmail/>febriandinfi@gamil.com</h1>
                <h1 className='md:text-lg text-sm flex items-center gap-2 py-2 text-white'><FaInstagram/>@fbryndy_</h1>
            </div>
        </div>
        <div className='md:flex items-center mt-2 justify-between'>
        <div className='flex py-5 max-md:justify-center gap-14 md:gap-8 items-center'>
            <Link to="https://www.linkedin.com/in/febriandi-febri-753126222/" className='text-2xl text-white'><CiLinkedin/></Link>
            <Link to="https://github.com/Febriyandy" className='text-xl text-white'><LuGithub/></Link>
            <Link to="mailto:febriandini@gmail.com" className='text-2xl text-white'><MdOutlineMail/></Link>
            <Link to="https://x.com/febriyandyy_?t=nkA8j5TX7XYKwUcCHmvbyQ&s=09" className='text-xl text-white'><FaXTwitter/></Link>
        </div>
        <h1 className='font-medium max-md:text-center md:text-xl text-white'>&copy; 2024 by Febriandi</h1>
        </div>
    </div>
    </>
  )
}

export default Footer