import React, { useState, useEffect } from "react";
import { ImBin2 } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProject from "./EditProject";
import Swal from "sweetalert2";

const DataProject = () => {
  const [project, setProject] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const getProject = async () => {
    try {
      const response = await axios.get(
        "https://api.portofolio.febriyandy.xyz/project"
      );
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const deleteProject = async (id) => {
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
          `https://api.portofolio.febriyandy.xyz/deleteproject/${id}`
        );
        getProject();
        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    } catch (error) {
      console.error("Error deleting Project:", error);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

  const toggleForm = (id) => {
    setSelectedProjectId(id);
    setShowForm(true);
  };

  const toggleCloseForm = () => {
    setShowForm(false);
    setSelectedProjectId(null);
  };

  return (
    <>
      <table className="min-w-full bg-gray-50 mt-5 rounded-lg shadow-md">
        <thead>
          <tr className="text-left">
            <th className="py-3 px-4 text-center ">No</th>
            <th className="py-3 px-4 ">Nama Project</th>
            <th className="py-3 px-4 w-96">Deskripsi</th>
            <th className="py-3 px-4 ">Bahasa Pemrograman</th>
            <th className="py-3 px-4 w-40">Foto</th>
            <th className="py-3 px-4 ">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {project.length > 0 ? (
            project.map((project, index) => (
              <tr key={project.id}>
                <td className="py-2 px-4 border-y text-center">{index + 1}</td>
                <td className="py-2 px-4 border-y">{project.name}</td>
                <td className="py-2 px-4 border-y">{project.deskripsi}</td>
                <td className="py-2 px-4 border-y">
                  {project.bahasa_pemrograman &&
                    project.bahasa_pemrograman
                      .replace(/\\|"|\[|\]/g, "")
                      .split(",")
                      .map((language, index) => (
                        <span
                          key={index}
                          className="inline-block my-2 bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                        >
                          {language.trim()}
                        </span>
                      ))}
                </td>

                <td className="py-2 px-4 border-y">
                  <img className="w-40 h-20 object-cover" src={project.link_foto} />
                </td>
                <td className="py-2 px-4 border-y">
                  <div className="flex">
                    <button
                      onClick={() => toggleForm(project.id)}
                      className="bg-blue-500 text-white px-2 py-2 rounded-full ml-2"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
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
        <EditProject
          showForm={showForm}
          toggleCloseForm={toggleCloseForm}
          projectId={selectedProjectId}
        />
      )}
    </>
  );
};

export default DataProject;
