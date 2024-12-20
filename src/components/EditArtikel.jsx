import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditArtikel = ({ showForm, toggleCloseForm, artikelId }) => {
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [isi, setIsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [foto, setFoto] = useState(null);
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFoto(image);
    setPreview(URL.createObjectURL(image));
  };
  
  const getArtikelById = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/artikel/${artikelId}`);
      if (response.data) {
        const data = response.data;
        const isi = parseAndReplaceNewlines(data.isi || "");

        setJudul(data.judul || "");
        setTanggal(data.tanggal || "");
        setKategori(data.kategori || "");
        setIsi(isi);
        setFoto(data.link_foto || null);
        setPreview(data.link_foto || "");
      }
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };

  const parseAndReplaceNewlines = (jsonString) => {
    try {
      const parsedData = JSON.parse(jsonString);
      if (typeof parsedData === "string") {
        return parsedData
          .replace(/\\r\\n/g, "\n") // Mengganti \r\n dengan newline
          .replace(/"/g, '')        // Menghilangkan tanda kutip ganda
          .replace(/\\/g, '');      // Menghilangkan backslash
      }
    } catch (error) {
      console.error("Error parsing JSON string:", error);
    }
    return "";
  };
  

  useEffect(() => {
    if (artikelId) {
      getArtikelById();
    }
  }, [artikelId]);
  

  const editData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("judul", judul);
      formData.append("tanggal", tanggal);
      formData.append("kategori", kategori);
      formData.append("isi", JSON.stringify(isi)); 
      formData.append("foto", foto);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/updateartikel/${artikelId}`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diedit!",
        showConfirmButton: false,
        timer: 2000,
    });

    setTimeout(() => {
        navigate("/admin");
        window.location.reload();
    }, 2000);
} catch (error) {
    console.error("Error editing data:", error);
    setMsg("Failed to update Artikel");
}
};

  return (
    <>
      {showForm && (
        <form onSubmit={editData}>
          <div className="fixed  z-[1000] top-0 left-0 p-5 w-full h-screen bg-transparent backdrop-filter backdrop-blur-sm shadow-sm flex items-center justify-center">
            <div className="w-2/3 h-full bg-white shadow-2xl rounded-xl p-7">
              <h1 className="text-xl font-medium pb-3">
                Edit Data Artikel
              </h1>
              <div className="flex">
                <div className="w-1/2 pr-5">
                  <input
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Judul Arikel"
                  />

                  <input
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    className="w-full my-5 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="date"
                    placeholder="Masukan Tanggal"
                  />
                  <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value)}
                className="w-full py-3 border border-[#0D6B91] bg-white shadow-md my-5 rounded-md outline-none px-3"
                name=""
                id=""
              >
                <option value="" hidden>
                  Pilih Kategori
                </option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="TailwindCSS">TailwindCSS</option>
                <option value="Bootstrap">Bootstrap</option>
                <option value="React JS">React JS</option>
                <option value="PHP">PHP</option>
                <option value="Flutter">Flutter</option>
                <option value="Node JS">Node JS</option>
                <option value="My SQL">My SQL</option>
                <option value="Firebase">Firebase</option>
                <option value="Git">Git</option>
                <option value="Figma">Figma</option>
                <option value="Canva">Canva</option>
                <option value="PixelLab">PixelLab</option>
              </select>
                 <div className="w-2/3 mt-5 border border-[#0D6B91] h-32 rounded-md bg-white">
                        {preview ? (
                          <figure className="">
                            <img
                              className="rounded-md object-cover w-full h-32 "
                              src={preview}
                            />
                          </figure>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="mt-3">
                        <span className="border absolute border-[#0D6B91] cursor-pointer py-2 px-12 rounded-md shadow-md">
                          Pilih File Foto
                        </span>
                        <input
                          onChange={loadImage}
                          type="file"
                          id="fileInput"
                          className="h-10 w-48 opacity-0 bg-blue-200 z-[1000] relative cursor-pointer"
                        />
                      </div>
                </div>
                <div className="w-1/2 pl-5">
                  <textarea
                    value={isi}
                    onChange={(e) => setIsi(e.target.value)}
                    className="w-full h-96 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Isi Artikel"
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
              </div>

              <div className="flex justify-between"></div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default EditArtikel;
