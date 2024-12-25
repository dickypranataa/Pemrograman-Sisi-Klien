import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Mahasiswa = () => {
  const [formData, setFormData] = useState({
    progdi_id: "",
    nim: "",
    nama: "",
    alamat: "",
    umur: "",
  });

  const [token, setToken] = useState("");

  useEffect(() => {
    // Ambil token dari localStorage saat komponen pertama kali dimuat
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Token tidak ditemukan",
        text: "Harap login terlebih dahulu.",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/mahasiswa", // Ganti dengan URL API Anda
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 201) {
        Swal.fire({
          icon: "success",
          title: "Mahasiswa berhasil ditambahkan",
          text: response.data.message,
        });

        setFormData({
          progdi_id: "",
          nim: "",
          nama: "",
          alamat: "",
          umur: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal menambahkan mahasiswa",
        text: error.response?.data?.message || "Terjadi kesalahan, silakan coba lagi",
      });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">Tambah Mahasiswa</h2>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Progdi ID:</label>
              <input
                type="text"
                name="progdi_id"
                value={formData.progdi_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">NIM:</label>
              <input
                type="text"
                name="nim"
                value={formData.nim}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Nama:</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Alamat:</label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Umur:</label>
              <input
                type="number"
                name="umur"
                value={formData.umur}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Tambah Mahasiswa
          </button>
        </form>
      </div>
    </div>
  );
};

export default Mahasiswa;
