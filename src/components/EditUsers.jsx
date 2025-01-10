import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditUsers = ({ showForm, onClose, userId }) => {
  const [username, setUsername] = useState("");
  const [titleRole, setTitleRole] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [titleAbout, setTitleAbout] = useState("");
  const [deskripsiAbout1, setDeskripsiAbout1] = useState("");
  const [deskripsiAbout2, setDeskripsiAbout2] = useState("");
  const [urlEmail, setUrlEmail] = useState("");
  const [urlIg, setUrlIg] = useState("");
  const [urlGithub, setUrlGithub] = useState("");
  const [urlX, setUrlX] = useState("");
  const [urlLinkedin, setUrlLinkedin] = useState("");
  const [urlTiktok, setUrlTiktok] = useState("");
  const [urlFb, setUrlFb] = useState("");
  const [urlDiscord, setUrlDiscord] = useState("");
  const [copyright, setCopyright] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoContact, setPhotoContact] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [previewPhotoContact, setPreviewPhotoContact] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const loadMainPhoto = (e) => {
    const image = e.target.files[0];
    setPhoto(image);
    setPreviewPhoto(URL.createObjectURL(image));
  };

  const loadContactPhoto = (e) => {
    const image = e.target.files[0];
    setPhotoContact(image);
    setPreviewPhotoContact(URL.createObjectURL(image));
  };

  const getUsersById = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/${userId}`);
      if (response.data) {
        const data = response.data;
        setUsername(data.username || "");
        setTitleRole(data.title_role || "");
        setDeskripsi(data.deskripsi || "");
        setTitleAbout(data.title_about || "");
        setDeskripsiAbout1(data.deksripsi_about1 || "");
        setDeskripsiAbout2(data.deksripsi_about2 || "");
        setUrlEmail(data.url_email || "");
        setUrlIg(data.url_ig || "");
        setUrlGithub(data.url_github || "");
        setUrlX(data.url_x || "");
        setUrlLinkedin(data.url_linkedin || "");
        setUrlTiktok(data.url_tiktok || "");
        setUrlFb(data.url_fb || "");
        setUrlDiscord(data.url_discord || "");
        setCopyright(data.copyright || "");
        setPreviewPhoto(data.url_photo || "");
        setPreviewPhotoContact(data.url_photo_contact || "");
      }
    } catch (error) {
      console.error("Error getting data:", error);
    }
  };


  useEffect(() => {
    if (userId) {
      getUsersById();
    }
  }, [userId]);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("title_role", titleRole);
      formData.append("deskripsi", deskripsi);
      formData.append("title_about", titleAbout);
      formData.append("deksripsi_about1", deskripsiAbout1);
      formData.append("deksripsi_about2", deskripsiAbout2);
      formData.append("url_email", urlEmail);
      formData.append("url_ig", urlIg);
      formData.append("url_github", urlGithub);
      formData.append("url_x", urlX);
      formData.append("url_linkedin", urlLinkedin);
      formData.append("url_tiktok", urlTiktok);
      formData.append("url_fb", urlFb);
      formData.append("url_discord", urlDiscord);
      formData.append("copyright", copyright);
      if (photo) formData.append("photo", photo);
      if (photoContact) formData.append("foto", photoContact);

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Data Berhasil Diupdate!",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        navigate("/admin");
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error updating user:", error);
      setMsg("Gagal mengupdate data");
    }
  };

  return (
    <>
      {showForm && (
        <form onSubmit={updateUser}>
          <div className="fixed z-[1000] top-0 left-0 p-5 w-full h-screen bg-transparent backdrop-filter backdrop-blur-sm shadow-sm flex items-center justify-center">
            <div className="w-2/3 h-full bg-white shadow-2xl rounded-xl p-7 overflow-y-auto">
              <h1 className="text-xl font-medium pb-3">Edit Data User</h1>
              <div className="flex">
                <div className="w-1/2 pr-5">
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    value={titleRole}
                    onChange={(e) => setTitleRole(e.target.value)}
                    className="w-full my-3 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Title Role"
                  />
                  <textarea
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    placeholder="Deskripsi"
                  />
                  <input
                    value={titleAbout}
                    onChange={(e) => setTitleAbout(e.target.value)}
                    className="w-full my-3 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Title About"
                  />
                  <textarea
                    value={deskripsiAbout1}
                    onChange={(e) => setDeskripsiAbout1(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    placeholder="Deskripsi About 1"
                  />
                  <textarea
                    value={deskripsiAbout2}
                    onChange={(e) => setDeskripsiAbout2(e.target.value)}
                    className="w-full my-3 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    placeholder="Deskripsi About 2"
                  />
                  <input
                    value={urlEmail}
                    onChange={(e) => setUrlEmail(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL Email"
                  />
                  <input
                    value={urlIg}
                    onChange={(e) => setUrlIg(e.target.value)}
                    className="w-full my-3 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL Instagram"
                  />
                </div>
                <div className="w-1/2 pl-5">
                  <input
                    value={urlGithub}
                    onChange={(e) => setUrlGithub(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL Github"
                  />
                  <input
                    value={urlX}
                    onChange={(e) => setUrlX(e.target.value)}
                    className="w-full my-3 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL X"
                  />
                  <input
                    value={urlLinkedin}
                    onChange={(e) => setUrlLinkedin(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL LinkedIn"
                  />
                  <input
                    value={urlTiktok}
                    onChange={(e) => setUrlTiktok(e.target.value)}
                    className="w-full my-3 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL TikTok"
                  />
                  <input
                    value={urlFb}
                    onChange={(e) => setUrlFb(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL Facebook"
                  />
                  <input
                    value={urlDiscord}
                    onChange={(e) => setUrlDiscord(e.target.value)}
                    className="w-full my-3 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="URL Discord"
                  />
                  <input
                    value={copyright}
                    onChange={(e) => setCopyright(e.target.value)}
                    className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
                    type="text"
                    placeholder="Copyright"
                  />
                  <div className="flex gap-4 mt-3">
                    <div>
                      <div className="w-40 h-40 border border-[#0D6B91] rounded-md">
                        {previewPhoto && (
                          <img
                            src={previewPhoto}
                            alt="Main Photo"
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                      </div>
                      <div className="mt-2">
                        <label className="border border-[#0D6B91] cursor-pointer py-2 px-4 rounded-md shadow-md">
                          Pilih Foto Utama
                          <input
                            type="file"
                            onChange={loadMainPhoto}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <div className="w-40 h-40 border border-[#0D6B91] rounded-md">
                        {previewPhotoContact && (
                          <img
                            src={previewPhotoContact}
                            alt="Contact Photo"
                            className="w-full h-full object-cover rounded-md"
                          />
                        )}
                      </div>
                      <div className="mt-2">
                        <label className="border border-[#0D6B91] cursor-pointer py-2 px-4 rounded-md shadow-md">
                          Pilih Foto Contact
                          <input
                            type="file"
                            onChange={loadContactPhoto}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#0D6B91] py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-[#15a4dd]"
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

export default EditUsers;