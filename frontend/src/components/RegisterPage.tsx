import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // try {
    //   // You need to send the formData object to your backend API
    //   const response = await axios.post("/api/register", formData);
    //   setMessage(response.data.message);
    //   router.push("/login");
    // } catch (error) {
    //   setMessage("An error occurred. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
    console.log("Form Data Submitted:", formData);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="font-sans text-[#333]">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="m-4 grid w-full max-w-6xl items-center gap-4 rounded-md p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] md:grid-cols-2">
          <div className="w-full py-4 sm:px-6 md:max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="mb-12">
                <h3 className="text-3xl font-extrabold">Register</h3>
                <p className="mt-4 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="ml-1 font-semibold text-blue-600 whitespace-nowrap hover:underline"
                  >
                    Login here!
                  </Link>
                </p>
              </div>
              <div>
                <label className="block mb-2 text-xs">First Name</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333]"
                    placeholder="John"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="block mb-2 text-xs">Last Name</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333]"
                    placeholder="Smith"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="block mb-2 text-xs">Email</label>
                <div className="relative flex items-center">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333]"
                    placeholder="johnsmith@example.com"
                  />
                </div>
              </div>
              <div className="mt-8">
                <label className="block mb-2 text-xs">Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333]"
                    placeholder="************"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 h-[18px] w-[18px] cursor-pointer"
                    viewBox="0 0 128 128"
                  ></svg>
                </div>
              </div>
              <div className="mt-8">
                <label className="block mb-2 text-xs">Confirm Password</label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333]"
                    placeholder="************"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 h-[18px] w-[18px] cursor-pointer"
                    viewBox="0 0 128 128"
                  ></svg>
                </div>
              </div>
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-blue-700 focus:outline-none"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
          <div className="p-8 bg-blue-600 rounded-xl max-md:mt-10 md:h-full lg:p-12">
            <img
              src="https://i.ibb.co/pKq73Lx/educern-4.png"
              className="object-contain w-full h-full transform -scale-x-100 rounded-3xl"
              alt="login-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
