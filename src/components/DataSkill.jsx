import React, { useState, useEffect } from 'react';
import { ImBin2 } from "react-icons/im";
import { MdEdit } from "react-icons/md";
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditSkill from './EditSkill';
import Swal from 'sweetalert2';

const DataSkill = () => {
    const [skill, setSkill] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState(null);

    const getSkill = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/skill`);
            setSkill(response.data);
        } catch (error) {
            console.error("Error fetching skill data:", error);
        }
    };

    const deleteSkill = async (id) => {
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
            await axios.delete(`${import.meta.env.VITE_API_URL}/deleteskill/${id}`);
            getSkill();
            Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
          }
        } catch (error) {
          console.error("Error deleting Skill:", error);
        }
      };

    useEffect(() => {
        getSkill();
    }, []);

    const toggleForm = (id) => {
        setSelectedSkillId(id);
        setShowForm(true);
    };

    const toggleCloseForm = () => {
        setShowForm(false);
        setSelectedSkillId(null);
    };

    return (
        <>
            <table className="min-w-full bg-gray-50 mt-5 rounded-lg shadow-md">
                <thead>
                    <tr className="text-left">
                        <th className="py-3 px-4 text-center ">No</th>
                        <th className="py-3 px-4 ">Nama Skill</th>
                        <th className="py-3 px-4 ">Level</th>
                        <th className="py-3 px-4 ">Kategori</th>
                        <th className="py-3 px-4 ">Icon</th>
                        <th className="py-3 px-4 ">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {skill.length > 0 ? (
                        skill.map((skill, index) => (
                            <tr key={skill.id}>
                                <td className="py-2 px-4 border-y text-center">
                                    {index + 1}
                                </td>
                                <td className="py-2 px-4 border-y">{skill.name}</td>
                                <td className="py-2 px-4 border-y">{skill.level}</td>
                                <td className="py-2 px-4 border-y">{skill.category}</td>
                                <td className="py-2 px-4 border-y"><img className='w-12' src={skill.link_foto} /></td>
                                <td className="py-2 px-4 border-y">
                                    <div className="flex">
                                        <button
                                            onClick={() => toggleForm(skill.id)}
                                            className="bg-blue-500 text-white px-2 py-2 rounded-full ml-2"
                                        >
                                            <MdEdit />
                                        </button>
                                        <button
                                            onClick={() => deleteSkill(skill.id)}
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
                <EditSkill showForm={showForm} toggleCloseForm={toggleCloseForm} skillId={selectedSkillId} />
            )}
        </>
    );
};

export default DataSkill;
