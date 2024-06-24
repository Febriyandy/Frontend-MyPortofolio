import React, { useState, useEffect } from 'react';
import Elemen from "../assets/elemen3.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const Auth = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      await axios.post("https://api.portofolio.febriyandy.xyz/login", formData);

      Swal.fire({
        icon: "success",
        title: "Login Berhasil!",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate('/admin'); // Navigasi ke halaman admin
      }, 2000);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        setMsg(errorMessage);

        Swal.fire({
          icon: "error",
          title: "Gagal Masuk!",
          text: errorMessage,
        });
      } else {
        console.error("Unexpected error:", error);

        Swal.fire({
          icon: "error",
          title: "Gagal Masuk!",
          text: "Terjadi kesalahan",
        });
      }
    }
  };

  useEffect(() => {
    document.title = 'Login';
  }, []);


  return (
    <>
      <section className='relative w-full h-screen flex justify-center items-center'>
        <img src={Elemen} className='absolute inset-0 h-full w-full object-cover' alt="" />
        <div className='relative p-5 z-10 w-1/4 h-1/2 rounded-xl shadow-lg bg-white/40 backdrop-filter backdrop-blur-sm items-center flex flex-col '>
        <h1 className='font-body font-bold text-2xl pb-5 text-[#0D6B91]'>Login</h1>
          <form onSubmit={Auth}>
          <input 
          value={username}
           onChange={(e) => setUsername(e.target.value)}
           type="text"
           className='w-full py-2 rounded-md outline-none font-body text-lg px-3'
           placeholder='Masukkan Username'
           />
           <input 
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           type="password"
           className='w-full mt-5 py-2 rounded-md outline-none font-body text-lg px-3'
           placeholder='Masukkan Password'
           />
           <button type='submit' className='w-full bg-[#0D6B91] py-2 text-white font-body font-bold rounded-md mt-10'>Masuk</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
