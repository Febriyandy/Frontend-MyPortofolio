import React, { useState, useEffect } from "react";
import Elemen from "../assets/elemen.png";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import { MdOutlineMail } from "react-icons/md";
import { FaXTwitter } from "react-icons/fa6";
import { FiFacebook } from "react-icons/fi";
import { TbBrandTiktok } from "react-icons/tb";
import { TbBrandDiscord } from "react-icons/tb";
import Foto from "../assets/foto3.jpg";
import Swal from "sweetalert2";

const Kontak = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [pesan, setPesan] = useState("");
  const [msg, setMsg] = useState("");

  const saveData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("no_hp", no_hp);
      formData.append("perusahaan", perusahaan);
      formData.append("pesan", pesan);

      await axios.post(`https://api.portofolio.febriyandy.xyz/kontak`, formData);
      Swal.fire({
        icon: "success",
        title: "Pesan Terkirim!",
        showConfirmButton: false,
        timer: 2000,
      });

      // Kosongkan form setelah berhasil terkirim
      setNama("");
      setEmail("");
      setNo_hp("");
      setPerusahaan("");
      setPesan("");
      setMsg("");

    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        setMsg(errorMessage);

        Swal.fire({
          icon: "error",
          title: "Gagal Mengirim Pesan!",
          text: errorMessage,
        });
      } else {
        console.error("Unexpected error:", error);

        Swal.fire({
          icon: "error",
          title: "Gagal Mengirim Pesan!",
          text: "Terjadi kesalahan",
        });
      }
    }
  };

  useEffect(() => {
    document.title = 'Kontak';
  }, []);

  return (
    <>
      <Navbar />
      <section className="relative h-screen">
        <img
          src={Elemen}
          className="w-full h-full absolute top-0 left-0 object-cover"
          alt=""
        />
        <div className="relative z-10 container md:flex mx-auto max-md:px-5 py-10">
          <div className="md:w-1/2 animate__animated animate__zoomIn flex flex-col">
            <h1 className="md:text-3xl max-md:-mt-2 text-xl md:mt-16 text-[#0D6B91] font-body font-bold  mb-8">
              <span role="img" aria-label="target">
                👋
              </span>{" "}
              Contact Me
            </h1>
            <div className=" items-center gap-5  md:ml-5">
              <img src={Foto} className="md:w-1/3   w-2/3 mx-auto rounded-lg shadow-lg" alt="" />
              <div>
                <h1 className="font-body font-bold text-2xl max-md:pt-4 text-center md:text-4xl md:py-3 text-[#05A9D5]">
                  Febriandi
                </h1>
                <h1 className="font-body font-bold text-3xl md:text-4xl text-center text-[#0D6B91]">
                  Full-stack Developer
                </h1>
                <div className="flex justify-center mt-4 font-body gap-5">
                  <Link
                    to="https://www.facebook.com/febriyandy.f?mibextid=ZbWKwL"
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <FiFacebook />
                  </Link>
                  <Link
                    to="https://www.instagram.com/fbryndy_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <FaInstagram />
                  </Link>
                  <Link
                    to="https://x.com/febriyandyy_?t=nkA8j5TX7XYKwUcCHmvbyQ&s=09"
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <FaXTwitter />
                  </Link>
                  <Link
                    to="https://www.tiktok.com/@febriyandy.f?_t=8mkUNtQPWef&_r=1"
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <TbBrandTiktok />
                  </Link>
                </div>
                <div className="flex justify-center mt-4 font-body gap-5">
                  <Link
                    to="https://www.linkedin.com/in/febriandi-febri-753126222/"
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <CiLinkedin />
                  </Link>
                  <Link
                    to="https://github.com/Febriyandy"
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <LuGithub />
                  </Link>
                  <Link
                    to=""
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <TbBrandDiscord />
                  </Link>
                  <Link
                    to="mailto:febriandini@gmail.com"
                    className="text-2xl p-1 hover:bg-[#0D6B91] duration-300 hover:text-white rounded-md text-[#0D6B91]"
                  >
                    <MdOutlineMail />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div  className="md:w-1/2 animate__animated animate__zoomIn  max-md:z-10 mt-10 mx-auto md:mt-16 p-5 md:px-10 md:py-10 flex flex-col bg-white/10 backdrop-filter backdrop-blur-sm shadow-lg rounded-xl items-center">
          <h1 className="md:text-3xl text-xl mt-15 text-[#0D6B91] font-body font-bold  mb-2">Form Contact Me</h1>
            <form onSubmit={saveData} className="md:w-4/5">
              <input
                type="text"
                id="nama"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama"
                className="w-full py-2 px-3 mb-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#05A9D5] focus:ring-1 focus:ring-[#05A9D5] font-body"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="Alamat Email"
                className="w-full py-2 px-3 mb-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#05A9D5] focus:ring-1 focus:ring-[#05A9D5] font-body"
              />
              <input
                type="tel"
                value={no_hp}
                onChange={(e) => setNo_hp(e.target.value)}
                id="telepon"
                placeholder="628......"
                className="w-full py-2 px-3 mb-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#05A9D5] focus:ring-1 focus:ring-[#05A9D5] font-body"
              />
              <input
                type="text"
                value={perusahaan}
                onChange={(e) => setPerusahaan(e.target.value)}
                id="perusahaan"
                placeholder="Perusahaan (Opsional)"
                className="w-full py-2 px-3 mb-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#05A9D5] focus:ring-1 focus:ring-[#05A9D5] font-body"
              />
              <textarea
                id="pesan"
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Pesan"
                className="w-full h-32 py-1 px-3 mb-3 rounded-lg border border-slate-300 focus:outline-none focus:border-[#05A9D5] focus:ring-1 focus:ring-[#05A9D5] font-body placeholder-top transition-transform duration-300 ease-out focus:placeholder-translate-y-full"
              />
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
