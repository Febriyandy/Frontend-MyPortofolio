import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditSertifikat = ({ showForm, toggleCloseForm, sertifikatId }) => {
  const [name, setName] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [tanggal_kegiatan, setTanggal_kegiatan] = useState("");
  const [bagian, setBagian] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [icon, setIcon] = useState(null);
  const [foto, setFoto] = useState(null);
  const [color, setColor] = useState("");
  const [msg, setMsg] = useState("");
  const [preview, setPreview] = useState("");
  const [preview1, setPreview1] = useState("");

  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFoto(image);
    setPreview(URL.createObjectURL(image));
  };
  const loadImage1 = (e) => {
    const image = e.target.files[0];
    setIcon(image);
    setPreview1(URL.createObjectURL(image));
  };

  
  const getSertifikatById = async () => {
    try {
      const response = await axios.get(`https://api.portofolio.febriyandy.xyz/sertifikat/${sertifikatId}`);
      if (response.data) {
        const data = response.data;
        const deskripsi = parseAndReplaceNewlines(data.deskripsi || "");

        setName(data.name || "");
        setPerusahaan(data.perusahaan || "");
        setTanggal_kegiatan(data.tanggal_kegiatan || "");
        setBagian(data.bagian || "");
        setDeskripsi(deskripsi);
        setColor(data.color);
        setIcon(data.link_icon || null);
        setPreview1(data.link_icon || "");
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
    if (sertifikatId) {
      getSertifikatById();
    }
  }, [sertifikatId]);

  const editData = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("perusahaan", perusahaan);
      formData.append("tanggal_kegiatan", tanggal_kegiatan);
      formData.append("bagian", bagian);
      formData.append("deskripsi", JSON.stringify(deskripsi));
      formData.append("color", color); 
      formData.append("icon", icon);
      formData.append("foto", foto);

      await axios.patch(
        `https://api.portofolio.febriyandy.xyz/updatesertifikat/${sertifikatId}`,
        formData
      );
      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diedit!",
        showConfirmButton: false,
        timer: 2000,
    });

    setTimeout(() => {
        navigate("/Admin");
        window.location.reload();
    }, 2000);
} catch (error) {
    console.error("Error editing data:", error);
    setMsg("Failed to update skill");
}
};

  return (
    <>
      {showForm && (
        <form onSubmit={editData}>
          <div className="fixed  z-[1000] top-0 left-0 p-5 w-full h-screen bg-transparent backdrop-filter backdrop-blur-sm shadow-sm flex items-center justify-center">
            <div className="w-2/3 h-full bg-white shadow-2xl rounded-xl p-7">
              <h1 className="text-xl font-medium pb-3">
                Edit Data Sertifikat
              </h1>
              <div className="flex">
                <div className="w-1/2 pr-5">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Nama Platform"
                  />

                  <input
                    value={perusahaan}
                    onChange={(e) => setPerusahaan(e.target.value)}
                    className="w-full my-5 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Nama Perusahaan"
                  />
                  <input
                    value={tanggal_kegiatan}
                    onChange={(e) => setTanggal_kegiatan(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Tanggal Kegiatan"
                  />
                  <input
                    value={bagian}
                    onChange={(e) => setBagian(e.target.value)}
                    className="w-full my-5 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Masukan Nama Sertifikat"
                  />
                  <div className="w-full h-48 flex">
                    <div className="">
                      <div className="w-full border border-[#0D6B91] h-28 rounded-md bg-white">
                        {preview ? (
                          <figure className="">
                            <img
                              className="rounded-md object-cover w-full h-28 "
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
                    <div className="ml-9">
                      <div className="w-40 border border-[#0D6B91] h-28 rounded-md bg-white">
                        {preview1 ? (
                          <figure className="">
                            <img
                              className="rounded-md object-cover w-full h-28 "
                              src={preview1}
                            />
                          </figure>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="mt-3">
                        <span className="border absolute border-[#0D6B91] cursor-pointer py-2 px-8 rounded-md shadow-md">
                          Pilih File Logo
                        </span>
                        <input
                          onChange={loadImage1}
                          type="file"
                          id="fileInput"
                          className="h-10 w-40 opacity-0 bg-blue-200 z-[1000] relative cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 pl-5">
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full h-96 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Deskripsi Kegiatan"
                  />
                  <div className="flex gap-3 float-right">
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full py-3 mt-4 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Color Icon"
                  />
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

export default EditSertifikat;
