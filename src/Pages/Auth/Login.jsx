// src/Pages/Auth/Login.jsx
import { useDispatch } from "react-redux";
import { setToken } from "../../features/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://demo-api.syaifur.io/api/login",
        form,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.code === 200) {
        const token = response.data.data.token;

        // Simpan token di Redux state dan localStorage
        dispatch(setToken(token));
        localStorage.setItem("auth_token", token);

        Swal.fire({
          icon: "success",
          title: "Login Berhasil",
          text: response.data.message,
        });

        navigate("/admin");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Halaman Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border rounded-md p-2"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border rounded-md p-2"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition"
            >
              Login
            </button>
          </div>
          <a href="/register" className="text-center text-blue-500">
            Register
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
