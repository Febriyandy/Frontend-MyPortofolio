import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahDataProject = ({ showForm, toggleCloseForm }) => {
  const [name, setName] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [bahasa_pemrograman, setBahasa_pemrograman] = useState("");
  const [link_github, setLink_github] = useState("");
  const [link_preview, setLink_preview] = useState("");
  const [foto, setFoto] = useState(null);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFoto(image);
    setPreview(URL.createObjectURL(image));
  };

  const skills = [
    "  HTML  ",
    "  CSS  ",
    "  JavaScript  ",
    "  TailwindCSS  ",
    "  Bootstrap  ",
    "  React JS  ",
    "  PHP  ",
    "  Flutter  ",
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setBahasa_pemrograman((prevSkills) => [...prevSkills, value]);
    } else {
      setBahasa_pemrograman((prevSkills) =>
        prevSkills.filter((skill) => skill !== value)
      );
    }
  };
  

  const saveData = async (e) => {
    e.preventDefault();
  
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("deskripsi", deskripsi);
      formData.append("bahasa_pemrograman", JSON.stringify(bahasa_pemrograman)); // Convert to JSON string
      formData.append("link_github", link_github);
      formData.append("link_preview", link_preview);
      formData.append("foto", foto);
  
      await axios.post(
        `${import.meta.env.VITE_API_URL}/tambahproject`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Ditambahkan!",
        showConfirmButton: false,
        timer: 2000,
      });
  
      setTimeout(() => {
        navigate("/admin");
        window.location.reload();
      }, 2000);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.msg;
        setMsg(errorMessage);
  
        Swal.fire({
          icon: "error",
          title: "Gagal Menambah Data!",
          text: errorMessage,
        });
      } else {
        console.error("Unexpected error:", error);
  
        Swal.fire({
          icon: "error",
          title: "Gagal Menambah Data!",
          text: "Terjadi kesalahan",
        });
      }
    }
  };
  

  return (
    <>
      {showForm && (
        <form onSubmit={saveData}>
          <div className="fixed  z-[1000] top-0 left-0 p-5 w-full h-screen bg-transparent backdrop-filter backdrop-blur-sm shadow-sm flex items-center justify-center">
            <div className="w-2/3 h-4/5 bg-white shadow-2xl rounded-xl p-7">
              <h1 className="text-xl font-medium pb-3">Tambah Data Project</h1>
              <div className="flex">
                <div className="w-1/2 pr-5">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Nama Project"
                  />
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full py-3 mt-5 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Deskripsi"
                  />
                  <input
                    value={link_github}
                    onChange={(e) => setLink_github(e.target.value)}
                    className="w-full my-5 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Link Repository"
                  />
                  <input
                    value={link_preview}
                    onChange={(e) => setLink_preview(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Link Preview"
                  />
                  <div className="flex gap-3 float-right">
                <button
                  className="bg-[#0D6B91] bottom-0 py-2 px-6  text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd] mt-4"
                  onClick={toggleCloseForm}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#0D6B91] py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd] mt-4"
                >
                  Simpan
                </button>
              </div>
                </div>
                <div className="w-1/2 pl-5">
                  <label className="font-medium " htmlFor="">
                    Pilih Bahasa Pemrograman Yang Digunakan
                  </label>
                  <div className="flex flex-wrap mt-5">
                    {skills.map((skill) => (
                      <div key={skill} className="w-1/3 mb-2">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            value={skill}
                            onChange={handleCheckboxChange}
                            className="form-checkbox h-5 w-5 text-blue-600"
                          />
                          <span className="ml-2">{skill}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="w-full h-48">
                      <div className="w-2/3 border border-[#0D6B91] h-36 rounded-md bg-white">
                      {preview ? (
                          <figure className="">
                            <img
                              className="rounded-md object-cover w-full h-36 "
                              src={preview}
                            />
                          </figure>
                        ) : (
                          ""
                        )}

                      </div>
                      <div className="mt-3">
                        <span className="border absolute border-[#0D6B91] cursor-pointer py-2 px-20 rounded-md shadow-md">Pilih File Foto</span>
                        <input
                          onChange={loadImage}
                          type="file"
                          id="fileInput"
                          className="h-10 w-64 opacity-0 bg-blue-200 z-[1000] relative cursor-pointer"
                        />
                      </div>
                    </div>
                </div>
              </div>

              <div className="flex justify-between">
                
              </div>
              
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default TambahDataProject;
