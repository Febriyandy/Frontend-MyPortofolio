import React, { useState, useEffect } from "react";
import { ImBin2 } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import EditArtikel from "./EditArtikel";
import Swal from "sweetalert2";

const DataArtikel = () => {
  const [artikel, setArtikel] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedArtikelId, setSelectedArtikelId] = useState(null);

  const getArtikel = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/artikel`
      );
      setArtikel(response.data);
    } catch (error) {
      console.error("Error fetching Artikel data:", error);
    }
  };

  const deleteArtikel = async (id) => {
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
          `${import.meta.env.VITE_API_URL}/deleteartikel/${id}`
        );
        getArtikel();
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting Artikel:", error);
    }
  };

  useEffect(() => {
    getArtikel();
  }, []);

  const toggleForm = (id) => {
    setSelectedArtikelId(id);
    setShowForm(true);
  };

  const toggleCloseForm = () => {
    setShowForm(false);
    setSelectedArtikelId(null);
  };

  return (
    <>
      <table className="min-w-full bg-gray-50 mt-5 rounded-lg shadow-md">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-center ">No</th>
            <th className="py-3 px-4 ">Judul</th>
            <th className="py-3 px-4 ">Tanggal</th>
            <th className="py-3 px-4 ">Kategori</th>
            <th className="py-3 px-4 ">Foto</th>
            <th className="py-3 px-4 ">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {artikel.length > 0 ? (
            artikel.map((artikel, index) => (
              <tr key={artikel.id}>
                <td className="py-2 px-4 border-y text-center">{index + 1}</td>
                <td className="py-2 px-4 border-y">{artikel.judul}</td>
                <td className="py-2 px-4 border-y">{artikel.tanggal}</td>
                <td className="py-2 px-4 border-y">{artikel.kategori}</td>
                <td className="py-2 px-4 border-y">
                  <img className="w-28 h-16 object-cover" src={artikel.link_foto} />
                </td>
                <td className="py-2 px-4 border-y">
                  <div className="flex">
                    <button
                      onClick={() => toggleForm(artikel.id)}
                      className="bg-blue-500 text-white px-2 py-2 rounded-full ml-2"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => deleteArtikel(artikel.id)}
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
        <EditArtikel
          showForm={showForm}
          toggleCloseForm={toggleCloseForm}
          artikelId={selectedArtikelId}
        />
      )}
    </>
  );
};

export default DataArtikel;
