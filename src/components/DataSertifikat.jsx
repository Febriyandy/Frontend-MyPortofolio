import React, { useState, useEffect } from "react";
import { ImBin2 } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import EditSertifikat from "./EditSertifikat";
import Swal from "sweetalert2";

const DataSertifikat = () => {
  const [sertifikat, setSertifikat] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedSertifikatId, setSelectedSertifikatId] = useState(null);

  const getSertifikat = async () => {
    try {
      const response = await axios.get(
        "https://api.portofolio.febriyandy.xyz/sertifikat"
      );
      setSertifikat(response.data);
    } catch (error) {
      console.error("Error fetching Sertifikat data:", error);
    }
  };

  const deleteSertifikat = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Konfirmasi Hapus",
        text: "Apakah Anda yakin ingin menghapus data ini?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
        cancelButtonText: "Batal",
      });

      if (result.isConfirmed) {
        await axios.delete(
          `https://api.portofolio.febriyandy.xyz/deletesertifikat/${id}`
        );
        getSertifikat();
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting Sertifikat:", error);
    }
  };

  useEffect(() => {
    getSertifikat();
  }, []);

  const toggleForm = (id) => {
    setSelectedSertifikatId(id);
    setShowForm(true);
  };

  const toggleCloseForm = () => {
    setShowForm(false);
    setSelectedSertifikatId(null);
  };

  return (
    <>
      <table className="min-w-full bg-gray-50 mt-5 rounded-lg shadow-md">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-center ">No</th>
            <th className="py-3 px-4 ">Nama Platform</th>
            <th className="py-3 px-4 ">Perusahaan</th>
            <th className="py-3 px-4 ">Tanggal Kegiatan</th>
            <th className="py-3 px-4 ">Nama Sertifikat</th>
            <th className="py-3 px-4 ">Logo</th>
            <th className="py-3 px-4 ">Foto</th>
            <th className="py-3 px-4 ">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {sertifikat.length > 0 ? (
            sertifikat.map((sertifikat, index) => (
              <tr key={sertifikat.id}>
                <td className="py-2 px-4 border-y text-center">{index + 1}</td>
                <td className="py-2 px-4 border-y">{sertifikat.name}</td>
                <td className="py-2 px-4 border-y">{sertifikat.perusahaan}</td>
                <td className="py-2 px-4 border-y">{sertifikat.tanggal_kegiatan}</td>
                <td className="py-2 px-4 border-y">{sertifikat.bagian}</td>
                <td className="py-2 px-4 border-y">
                  <img className="w-16 h-16 object-cover" src={sertifikat.link_icon} />
                </td>
                <td className="py-2 px-4 border-y">
                  <img className="w-28 h-16 object-cover" src={sertifikat.link_foto} />
                </td>
                <td className="py-2 px-4 border-y">
                  <div className="flex">
                    <button
                      onClick={() => toggleForm(sertifikat.id)}
                      className="bg-blue-500 text-white px-2 py-2 rounded-full ml-2"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => deleteSertifikat(sertifikat.id)}
                      className="bg-red-500 text-white px-2 py-2 rounded-full ml-2"
                    >
                      <ImBin2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-3 px-4 text-center">
                Data tidak ditemukan
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showForm && (
        <EditSertifikat
          showForm={showForm}
          toggleCloseForm={toggleCloseForm}
          sertifikatId={selectedSertifikatId}
        />
      )}
    </>
  );
};

export default DataSertifikat;
