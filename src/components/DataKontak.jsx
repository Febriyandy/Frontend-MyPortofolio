import React, { useState, useEffect } from "react";
import { ImBin2 } from "react-icons/im";
import { FaWhatsapp } from 'react-icons/fa';
import axios from "axios";
import Swal from "sweetalert2";

const DataKontak = () => {
  const [kontak, setKontak] = useState([]);

  const getKontak = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/kontak`
      );
      setKontak(response.data);
    } catch (error) {
      console.error("Error fetching Kontak data:", error);
    }
  };

  const deleteKontak = async (id) => {
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
          `${import.meta.env.VITE_API_URL}/kontak/${id}`
        );
        getKontak();
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting Kontak:", error);
    }
  };

  const openWhatsApp = (phoneNumber) => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  };


  useEffect(() => {
    getKontak();
  }, []);


  return (
    <>
      <table className="min-w-full bg-gray-50 mt-5 rounded-lg shadow-md">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-center ">No</th>
            <th className="py-3 px-4 ">Nama</th>
            <th className="py-3 px-4 ">Email</th>
            <th className="py-3 px-4 ">Nomor Handphone</th>
            <th className="py-3 px-4 ">Perusahaan</th>
            <th className="py-3 px-4 ">Pesan</th>
            <th className="py-3 px-4 ">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kontak.length > 0 ? (
            kontak.map((kontak, index) => (
              <tr key={kontak.id}>
                <td className="py-2 px-4 border-y text-center">{index + 1}</td>
                <td className="py-2 px-4 border-y">{kontak.nama}</td>
                <td className="py-2 px-4 border-y">{kontak.email}</td>
                <td className="py-2 px-4 border-y">{kontak.no_hp}</td>
                <td className="py-2 px-4 border-y">{kontak.perusahaan}</td>
                <td className="py-2 px-4 border-y">{kontak.pesan}</td>
                <td className="py-2 px-4 border-y">
                  <div className="flex">
                    <button
                    onClick={() => openWhatsApp(kontak.no_hp)}
                      className="bg-green-500 text-white px-2 py-2 rounded-full mx-2"
                    >
                      <FaWhatsapp  />
                    </button>
                    <button
                      onClick={() => deleteKontak(kontak.id)}
                      className="bg-red-500 text-white px-2 py-2 rounded-full "
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
    </>
  );
};

export default DataKontak;
