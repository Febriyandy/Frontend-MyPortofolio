import React, { useState, useEffect } from "react";
import axios from "axios";
import EditUsers from "../components/EditUsers";

const DataUsers = () => {
  const [user, setUser] = useState(null); // Menyimpan data user dengan id = 1
  const [showForm, setShowForm] = useState(false);

  const getUser = async () => {
    try {
      // Fetch user dengan id = 1
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/1`);
      setUser(response.data); // Menyimpan data user
    } catch (error) {
      console.error("Error fetching User data:", error);
    }
  };

  useEffect(() => {
    getUser(); // Memuat data user saat komponen dimuat
  }, []);

  if (!user) {
    return (
      <div className="w-full bg-gray-50 mt-5 rounded-lg shadow-md p-4 text-center">
        Data tidak ditemukan
      </div>
    );
  }

  const handleUpdate = () => {
    setShowForm(true); // Menampilkan form edit
  };

  const handleCloseForm = () => {
    setShowForm(false);
    getUser(); // Memuat ulang data setelah pembaruan
  };

  return (
    <>
      <div className="w-full flex justify-between h-auto bg-white">
        <h1 className="font-body font-semibold text-xl text-[#0D6B91]">
          Data Users
        </h1>
        <button
          onClick={handleUpdate}
          className="bg-[#0D6B91] py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd]"
        >
          Update Data
        </button>
      </div>

      {showForm ? (
        <EditUsers 
          showForm={showForm}
          userId={user.id}
          onClose={handleCloseForm}
        />
      ) : (
        <div className="flex gap-4">
          {/* Table 1: Data 1-10 */}
          <table className="w-1/2 bg-gray-50 mt-5 rounded-lg shadow-md">
            <thead>
              <tr className="text-left">
                <th className="py-3 px-4 text-center">No</th>
                <th className="py-3 px-4 text-center">Keterangan</th>
                <th className="py-3 px-4 text-center">Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-y text-center">1</td>
                <td className="py-2 px-4 border-y">Nama</td>
                <td className="py-2 px-4 border-y">{user.username}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">2</td>
                <td className="py-2 px-4 border-y">Judul Role</td>
                <td className="py-2 px-4 border-y">{user.title_role}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">3</td>
                <td className="py-2 px-4 border-y">Deskripsi</td>
                <td className="py-2 px-4 border-y">{user.deskripsi}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">4</td>
                <td className="py-2 px-4 border-y">Judul Tentang Saya</td>
                <td className="py-2 px-4 border-y">{user.title_about}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">5</td>
                <td className="py-2 px-4 border-y">Deskripsi 1</td>
                <td className="py-2 px-4 border-y">{user.deksripsi_about1}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">6</td>
                <td className="py-2 px-4 border-y">Deskripsi 2</td>
                <td className="py-2 px-4 border-y">{user.deksripsi_about2}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">7</td>
                <td className="py-2 px-4 border-y">Link Email</td>
                <td className="py-2 px-4 border-y">{user.url_email}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">8</td>
                <td className="py-2 px-4 border-y">Link Instagram</td>
                <td className="py-2 px-4 border-y">{user.url_ig}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">9</td>
                <td className="py-2 px-4 border-y">Link Github</td>
                <td className="py-2 px-4 border-y">{user.url_github}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">10</td>
                <td className="py-2 px-4 border-y">Link X</td>
                <td className="py-2 px-4 border-y">{user.url_x}</td>
              </tr>
            </tbody>
          </table>

          {/* Table 2: Data 11-17 */}
          <table className="w-1/2 bg-gray-50 mt-5 rounded-lg shadow-md">
            <thead>
              <tr className="text-left">
                <th className="py-3 px-4 text-center">No</th>
                <th className="py-3 px-4 text-center">Keterangan</th>
                <th className="py-3 px-4 text-center">Data</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-y text-center">11</td>
                <td className="py-2 px-4 border-y">Link Linkedin</td>
                <td className="py-2 px-4 border-y">{user.url_linkedin}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">12</td>
                <td className="py-2 px-4 border-y">Link Tiktok</td>
                <td className="py-2 px-4 border-y">{user.url_tiktok}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">13</td>
                <td className="py-2 px-4 border-y">Link Facebook</td>
                <td className="py-2 px-4 border-y">{user.url_fb}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">14</td>
                <td className="py-2 px-4 border-y">Link Discord</td>
                <td className="py-2 px-4 border-y">{user.url_discord}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">15</td>
                <td className="py-2 px-4 border-y">Copyright</td>
                <td className="py-2 px-4 border-y">{user.copyright}</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">16</td>
                <td className="py-2 px-4 border-y">Foto Utama</td>
                <td className="py-2 px-4 border-y">
                  <img 
                    className="w-28 h-16 object-cover" 
                    src={user.url_photo} 
                    alt="Foto Utama" 
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-y text-center">17</td>
                <td className="py-2 px-4 border-y">Foto Contact</td>
                <td className="py-2 px-4 border-y">
                  <img 
                    className="w-28 h-16 object-cover" 
                    src={user.url_photo_contact} 
                    alt="Foto Contact" 
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DataUsers;