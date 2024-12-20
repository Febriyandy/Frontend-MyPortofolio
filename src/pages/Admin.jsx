import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import TambahDataSkill from "../components/TambahDataSkill";
import TambahDataProject from "../components/TambahDataProject";
import DataSkill from "../components/DataSkill";
import DataProject from "../components/DataProject";
import TambahDataSertifikat from "../components/TambahDataSertifikat";
import DataSertifikat from "../components/DataSertifikat";
import TambahDataArtikel from "../components/TambahDataArtikel";
import DataArtikel from "../components/DataArtikel";
import DataKontak from "../components/DataKontak";
import { BiLogOut } from "react-icons/bi";


const Admin = () => {
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showForm1, setShowForm1] = useState(false);
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const navigate = useNavigate();

  const refreshToken = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/token`);
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/token`);
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    document.title = "Admin";
    refreshToken();
  }, []);

  const Logout = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/logout`);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const toggleCloseForm = () => {
    setShowForm(false);
  };

  const toggleForm1 = () => {
    setShowForm1(!showForm1);
  };

  const toggleCloseForm1 = () => {
    setShowForm1(false);
  };

  const toggleForm2 = () => {
    setShowForm2(!showForm2);
  };

  const toggleCloseForm2 = () => {
    setShowForm2(false);
  };

  const toggleForm3 = () => {
    setShowForm3(!showForm3);
  };

  const toggleCloseForm3 = () => {
    setShowForm3(false);
  };

  return (
    <>
      <section className="flex font-body flex-col justify-center items-center">
      <button
              onClick={Logout}
              className="bg-[#0D6B91] py-2 px-10 mt-10 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd]"
            >
              Logout
            </button>
        <h1 className="text-3xl font-bold text-[#0D6B91] pt-10">
          Selamat Datang di Admin Portofolio Febriandi
        </h1>
        <div className="w-full h-auto py-5 px-32">
          <div className="w-full flex justify-between h-auto bg-white">
            <h1 className="font-body font-semibold text-xl text-[#0D6B91]">
              Data Skill
            </h1>
            <button
              onClick={toggleForm}
              className="bg-[#0D6B91] py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd]"
            >
              Tambah Data
            </button>
          </div>
          <div>
            <DataSkill />
          </div>
        </div>
        <div className="w-full h-auto py-5 px-32">
          <div className="w-full flex justify-between h-auto bg-white">
            <h1 className="font-body font-semibold text-xl text-[#0D6B91]">
              Data Project
            </h1>
            <button
              onClick={toggleForm1}
              className="bg-[#0D6B91] py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd]"
            >
              Tambah Data
            </button>
          </div>
          <div>
            <DataProject />
          </div>
        </div>
        <div className="w-full h-auto py-5 px-32">
          <div className="w-full flex justify-between h-auto bg-white">
            <h1 className="font-body font-semibold text-xl text-[#0D6B91]">
              Data Sertifikat
            </h1>
            <button
              onClick={toggleForm2}
              className="bg-[#0D6B91] py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd]"
            >
              Tambah Data
            </button>
          </div>
          <div>
            <DataSertifikat />
          </div>
        </div>
        <div className="w-full h-auto py-5 px-32">
          <div className="w-full flex justify-between h-auto bg-white">
            <h1 className="font-body font-semibold text-xl text-[#0D6B91]">
              Data Artikel
            </h1>
            <button
              onClick={toggleForm3}
              className="bg-[#0D6B91] py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd]"
            >
              Tambah Data
            </button>
          </div>
          <div>
            <DataArtikel />
          </div>
        </div>
        <div className="w-full h-auto pt-5 pb-12 px-32">
          <div className="w-full flex justify-between h-auto bg-white">
            <h1 className="font-body font-semibold text-xl text-[#0D6B91]">
              Data Kontak
            </h1>
          </div>
          <div>
            <DataKontak />
          </div>
        </div>
        <TambahDataSkill
          showForm={showForm}
          toggleCloseForm={toggleCloseForm}
        />
        <TambahDataProject
          showForm={showForm1}
          toggleCloseForm={toggleCloseForm1}
        />
        <TambahDataSertifikat
          showForm={showForm2}
          toggleCloseForm={toggleCloseForm2}
        />
        <TambahDataArtikel
          showForm={showForm3}
          toggleCloseForm={toggleCloseForm3}
        />
      </section>
    </>
  );
};

export default Admin;
