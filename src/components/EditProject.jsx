import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EditProject = ({ showForm, toggleCloseForm, projectId }) => {
  const [formData, setFormData] = useState({
    name: "",
    deskripsi: "",
    bahasa_pemrograman: [],
    link_github: "",
    link_preview: "",
    foto: null
  });
  const [skills, setSkills] = useState([]);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    if (image) {
      setFormData(prev => ({ ...prev, foto: image }));
      setPreview(URL.createObjectURL(image));
    }
  };

  const getProjectById = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/project/${projectId}`);
      if (response.data) {
        const { name, deskripsi, bahasa_pemrograman, link_github, link_preview, link_foto } = response.data;
        
        // Clean and parse the bahasa_pemrograman data
        const cleanedSkills = bahasa_pemrograman
          ? bahasa_pemrograman.replace(/\\|"|\[|\]/g, "")
              .split(",")
              .map(skill => skill.trim())
              .filter(Boolean)
          : [];

        setFormData({
          name: name || "",
          deskripsi: deskripsi || "",
          bahasa_pemrograman: cleanedSkills,
          link_github: link_github || "",
          link_preview: link_preview || "",
          foto: null
        });
        setPreview(link_foto || "");
      }
    } catch (error) {
      setError("Error fetching project data");
      console.error("Error getting data:", error);
    }
  };

  const getSkills = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/skill`);
      setSkills(response.data);
    } catch (error) {
      setError("Error fetching skills");
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    getSkills();
    if (projectId) {
      getProjectById();
    }
  }, [projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (value, checked) => {
    setFormData(prev => ({
      ...prev,
      bahasa_pemrograman: checked
        ? [...prev.bahasa_pemrograman, value]
        : prev.bahasa_pemrograman.filter(skill => skill !== value)
    }));
  };

  const editData = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "bahasa_pemrograman") {
          formDataToSend.append(key, JSON.stringify(value));
        } else if (value != null) {
          formDataToSend.append(key, value);
        }
      });

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/updateproject/${projectId}`,
        formDataToSend
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
      setError("Failed to update project");
      console.error("Error editing data:", error);
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 z-[1000] p-5 bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <form onSubmit={editData} className="w-2/3 h-full bg-white shadow-2xl rounded-xl p-7 overflow-y-auto">
        <h1 className="text-xl font-medium pb-3">Edit Data Project</h1>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-1/2">
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
              type="text"
              placeholder="Masukan Nama Project"
            />
            <textarea
              name="deskripsi"
              value={formData.deskripsi}
              onChange={handleInputChange}
              className="w-full h-44 py-3 mt-5 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
              placeholder="Deskripsi"
            />
            <input
              name="link_github"
              value={formData.link_github}
              onChange={handleInputChange}
              className="w-full my-5 py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
              type="text"
              placeholder="Masukan Link Repository"
            />
            <input
              name="link_preview"
              value={formData.link_preview}
              onChange={handleInputChange}
              className="w-full py-3 border border-[#0D6B91] bg-white shadow-md rounded-md outline-none px-3"
              type="text"
              placeholder="Masukan Link Preview"
            />
            <div className="flex gap-3 justify-end mt-4">
              <button
                type="button"
                className="bg-gray-500 py-2 px-6 text-white text-lg rounded-md shadow-md hover:bg-gray-600"
                onClick={toggleCloseForm}
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
          
          <div className="w-full md:w-1/2">
            <label className="font-medium block mb-3">
              Pilih Bahasa Pemrograman Yang Digunakan
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {skills.map((skill) => (
                <label key={skill.id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={skill.name}
                    checked={formData.bahasa_pemrograman.includes(skill.name)}
                    onChange={(e) => handleCheckboxChange(skill.name, e.target.checked)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2">{skill.name}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-8">
              <div className="w-2/3 border border-[#0D6B91] h-36 rounded-md bg-white">
                {preview && (
                  <img
                    className="rounded-md object-cover w-full h-36"
                    src={preview}
                    alt="Preview"
                  />
                )}
              </div>
              <div className="mt-3 relative">
                <label className="border border-[#0D6B91] cursor-pointer py-2 px-20 rounded-md shadow-md inline-block">
                  Pilih File Foto
                  <input
                    type="file"
                    onChange={loadImage}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        
        {error && (
          <p className="text-red-500 text-sm mt-3">{error}</p>
        )}
      </form>
    </div>
  );
};

export default EditProject;