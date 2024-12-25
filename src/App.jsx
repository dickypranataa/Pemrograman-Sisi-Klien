import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLayout from "./Layouts/AdminLayout";
import Mahasiswa from "./Pages/Admin/Mahasiswa";
import MahasiswaList from "./Pages/Admin/MahasiswaList"; // Impor halaman MahasiswaList
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import Dashboard from "./Pages/Admin/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/mahasiswa"
          element={
            <AdminLayout>
              <Mahasiswa />
            </AdminLayout>
          }
        />
        {/* Menambahkan route baru untuk MahasiswaList */}
        <Route
          path="/admin/mahasiswa-list"
          element={
            <AdminLayout>
              <MahasiswaList />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
