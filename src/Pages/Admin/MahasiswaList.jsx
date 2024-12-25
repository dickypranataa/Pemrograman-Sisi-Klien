import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const MahasiswaList = () => {
  const [mahasiswaList, setMahasiswaList] = useState([]);
  const [token, setToken] = useState(""); // Token otomatis diambil dari localStorage
  const [selectedMahasiswa, setSelectedMahasiswa] = useState(null); // Mahasiswa yang dipilih untuk edit

  // State untuk menangani data yang diedit
  const [formData, setFormData] = useState({
    nim: "",
    nama: "",
    alamat: "",
    umur: "",
    progdiId: "",
  });

  // Mengambil token dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Token tidak ditemukan",
        text: "Silakan login untuk mendapatkan token.",
      });
    }
  }, []);

  // Mengambil daftar mahasiswa ketika token tersedia
  useEffect(() => {
    if (token) {
      fetchMahasiswaList();
    }
  }, [token]);

  // Mengambil data mahasiswa
  const fetchMahasiswaList = async () => {
    try {
      const response = await axios.get(
        "http://demo-api.syaifur.io/api/mahasiswa",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        setMahasiswaList(response.data.data);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal mengambil data",
          text: response.data.message || "Terjadi kesalahan.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan",
        text: "Tidak dapat mengambil data mahasiswa.",
      });
    }
  };

  // Fungsi untuk mengupdate data mahasiswa
  const handleUpdateMahasiswa = async (id) => {
    try {
      const response = await axios.put(
        `http://demo-api.syaifur.io/api/mahasiswa/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil diperbarui",
          text: "Data mahasiswa berhasil diperbarui.",
        });
        setSelectedMahasiswa(null); // Menutup form setelah update berhasil
        fetchMahasiswaList(); // Ambil data mahasiswa terbaru
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal memperbarui",
          text: response.data.message || "Terjadi kesalahan.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi kesalahan",
        text: "Tidak dapat memperbarui data mahasiswa.",
      });
    }
  };

  // Fungsi untuk menghapus data mahasiswa
  const handleDeleteMahasiswa = async (id) => {
    const result = await Swal.fire({
      title: "Konfirmasi Hapus",
      text: "Apakah Anda yakin ingin menghapus data mahasiswa ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://demo-api.syaifur.io/api/mahasiswa/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.code === 200) {
          Swal.fire({
            icon: "success",
            title: "Berhasil dihapus",
            text: "Data mahasiswa berhasil dihapus.",
          });
          fetchMahasiswaList(); // Ambil data mahasiswa terbaru setelah penghapusan
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal menghapus",
            text: response.data.message || "Terjadi kesalahan.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi kesalahan",
          text: "Tidak dapat menghapus data mahasiswa.",
        });
      }
    }
  };

  // Fungsi untuk menangani perubahan pada form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fungsi untuk membuka form update
  const openUpdateForm = (mahasiswa) => {
    setSelectedMahasiswa(mahasiswa);
    setFormData({
      nim: mahasiswa.nim,
      nama: mahasiswa.nama,
      alamat: mahasiswa.alamat,
      umur: mahasiswa.umur,
      progdiId: mahasiswa.progdi.id,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-8">
        Daftar Mahasiswa
      </h2>

      {selectedMahasiswa && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Update Data Mahasiswa</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateMahasiswa(selectedMahasiswa.id);
            }}
          >
            <div className="mb-4">
              <label htmlFor="nim" className="block text-gray-700">
                NIM
              </label>
              <input
                type="text"
                id="nim"
                name="nim"
                value={formData.nim}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>

            <div className="mb-4">
              <label htmlFor="nama" className="block text-gray-700">
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="alamat" className="block text-gray-700">
                Alamat
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="umur" className="block text-gray-700">
                Umur
              </label>
              <input
                type="number"
                id="umur"
                name="umur"
                value={formData.umur}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
              >
                Konfirmasi Update
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700">NIM</th>
              <th className="px-6 py-3 text-left text-gray-700">Nama</th>
              <th className="px-6 py-3 text-left text-gray-700">Alamat</th>
              <th className="px-6 py-3 text-left text-gray-700">Umur</th>
              <th className="px-6 py-3 text-left text-gray-700">Progdi</th>
              <th className="px-6 py-3 text-left text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {mahasiswaList.length > 0 ? (
              mahasiswaList.map((mahasiswa) => (
                <tr key={mahasiswa.id}>
                  <td className="px-6 py-4 text-gray-900">{mahasiswa.nim}</td>
                  <td className="px-6 py-4 text-gray-900">{mahasiswa.nama}</td>
                  <td className="px-6 py-4 text-gray-900">{mahasiswa.alamat}</td>
                  <td className="px-6 py-4 text-gray-900">{mahasiswa.umur}</td>
                  <td className="px-6 py-4 text-gray-900">
                    {mahasiswa.progdi.nama}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mr-2"
                      onClick={() => openUpdateForm(mahasiswa)}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      onClick={() => handleDeleteMahasiswa(mahasiswa.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MahasiswaList;
