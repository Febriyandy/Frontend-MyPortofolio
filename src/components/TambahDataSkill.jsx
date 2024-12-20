import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TambahDataSkill = ({ showForm, toggleCloseForm }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [foto, setFoto] = useState(null);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFoto(image);
    setPreview(URL.createObjectURL(image));
  };

  const saveData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("level", level);
      formData.append("category", category);
      formData.append("foto", foto);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/tambahskill`,
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
          <div className="fixed z-[1000] top-0 left-0 p-5 w-full h-screen bg-transparent backdrop-filter backdrop-blur-sm shadow-sm flex items-center justify-center">
            <div className="w-1/3 h-4/5 bg-white shadow-2xl rounded-xl p-7">
              <h1 className="text-xl font-medium pb-3">Tambah Data Skills</h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                type="text"
                placeholder="Masukan Nama Skill"
              />
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full py-3 border border-[#0D6B91] bg-white shadow-md my-5 rounded-md outline-none px-3"
                name=""
                id=""
              >
                <option value="" hidden>
                  Pilih Level
                </option>
                <option value="Basic">Basic</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                name=""
                id=""
              >
                <option value="" hidden>
                  Pilih Kategori
                </option>
                <option value="Front-End Dev">Front-End Dev</option>
                <option value="Back-End Dev">Back-End Dev</option>
                <option value="Design">Design</option>
              </select>
              <div className="flex justify-between">
                <div className="mt-5">
                  <span className="border absolute border-[#0D6B91] cursor-pointer py-3 px-14 rounded-md shadow-md">Pilih File Icon</span>
                  <input onChange={loadImage}
                          type="file"
                          id="fileInput"  className="h-12 w-52 z-[1000] custom-file-input absolute  opacity-0 cursor-pointer"/>
                </div>
                <div className="w-20 h-20 mt-5 mb-3">
                  {preview ? (
                    <figure className="">
                      <img
                        className="rounded-md w-20 h-20 object-cover"
                        src={preview}
                      />
                    </figure>
                  ) : (
                    ""
                  )}
                </div>
              </div>
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
          </div>
        </form>
      )}
    </>
  );
};

export default TambahDataSkill;
