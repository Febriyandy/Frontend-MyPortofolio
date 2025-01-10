import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { 
  FaInstagram, 
  FaXTwitter 
} from "react-icons/fa6";
import { 
  CiLinkedin 
} from "react-icons/ci";
import { 
  LuGithub 
} from "react-icons/lu";
import { 
  MdOutlineMail 
} from "react-icons/md";
import { 
  FiFacebook 
} from "react-icons/fi";
import { 
  TbBrandTiktok,
  TbBrandDiscord 
} from "react-icons/tb";

import Navbar from "../components/Navbar";
import elementBg from "../assets/elemen.png";

const INITIAL_FORM_STATE = {
  nama: "",
  email: "",
  no_hp: "",
  perusahaan: "",
  pesan: ""
};

const Kontak = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Kontak";
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/1`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      await axios.post(`${import.meta.env.VITE_API_URL}/kontak`, formDataToSend);
      
      Swal.fire({
        icon: "success",
        title: "Pesan Terkirim!",
        showConfirmButton: false,
        timer: 2000
      });

      setFormData(INITIAL_FORM_STATE);
      setError("");
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "Terjadi kesalahan";
      setError(errorMessage);
      
      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim Pesan!",
        text: errorMessage
      });
    }
  };

  const renderSocialLink = (url, Icon, label) => {
    if (!url) return null;
    
    return (
      <Link
        to={url}
        className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
        aria-label={label}
      >
        <Icon />
      </Link>
    );
  };

  if (loading) {
    return (
      <div className="w-full h-80 bg-[#0E1F2A] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="relative h-screen">
        <img
          src={elementBg}
          className="w-full h-full absolute top-0 left-0 object-cover"
          alt="Background pattern"
        />
        <div className="relative z-10 container md:flex mx-auto max-md:px-5 py-10">
          {/* Profile Section */}
          <div className="md:w-1/2 animate__animated animate__zoomIn flex flex-col">
            <h1 className="md:text-3xl max-md:-mt-2 text-xl md:mt-16 text-[#0D6B91] font-body font-bold mb-8">
              <span role="img" aria-label="wave">👋</span> Contact Me
            </h1>
            <div className="items-center gap-5 md:ml-5">
              <img 
                src={user?.url_photo_contact} 
                className="md:w-1/3 w-2/3 mx-auto rounded-lg shadow-lg" 
                alt={`${user?.username}'s profile`}
              />
              <div className="text-center mt-4">
                <h1 className="font-body font-bold text-2xl max-md:pt-4 md:text-4xl md:py-3 text-[#05A9D5]">
                  {user?.username}
                </h1>
                <h2 className="font-body font-bold text-3xl md:text-4xl text-[#0D6B91]">
                  {user?.title_role}
                </h2>
                
                {/* Social Media Links - First Row */}
                <div className="flex justify-center mt-4 font-body gap-5">
                  {renderSocialLink(user?.url_fb, FiFacebook, "Facebook")}
                  {renderSocialLink(user?.url_ig, FaInstagram, "Instagram")}
                  {renderSocialLink(user?.url_x, FaXTwitter, "Twitter")}
                  {renderSocialLink(user?.url_tiktok, TbBrandTiktok, "TikTok")}
                </div>
                
                {/* Social Media Links - Second Row */}
                <div className="flex justify-center mt-4 font-body gap-5">
                  {renderSocialLink(user?.url_linkedin, CiLinkedin, "LinkedIn")}
                  {renderSocialLink(user?.url_github, LuGithub, "GitHub")}
                  {renderSocialLink(user?.url_discord, TbBrandDiscord, "Discord")}
                  {renderSocialLink(`mailto:${user?.url_email}`, MdOutlineMail, "Email")}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="md:w-1/2 animate__animated animate__zoomIn max-md:z-10 mt-10 mx-auto md:mt-16 p-5 md:px-10 md:py-10 flex flex-col bg-white/10 backdrop-filter backdrop-blur-sm shadow-lg rounded-xl items-center">
            <h2 className="md:text-3xl text-xl mt-15 text-[#0D6B91] font-body font-bold mb-2">
              Form Contact Me
            </h2>
            <form onSubmit={handleSubmit} className="md:w-4/5">
              {Object.entries(formData).map(([key, value]) => (
                key !== "pesan" ? (
                  <input
                    key={key}
                    type={key === "email" ? "email" : key === "no_hp" ? "tel" : "text"}
                    id={key}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full py-2 px-3 mb-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#05A9D5] focus:ring-1 focus:ring-[#05A9D5] font-body"
                    required={key !== "perusahaan"}
                  />
                ) : (
                  <textarea
                    key={key}
                    id={key}
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Pesan"
                    className="w-full h-32 py-1 px-3 mb-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#05A9D5] focus:ring-1 focus:ring-[#05A9D5] font-body placeholder-top transition-transform duration-300 ease-out focus:placeholder-translate-y-full"
                    required
                  />
                )
              ))}
              
              <div className="mt-2 flex justify-center">
                <button
                  type="submit"
                  className="font-body py-2 px-7 w-full rounded-md text-white hover:bg-[#0D6B91] bg-[#05A9D5]"
                >
                  Kirim
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Kontak;