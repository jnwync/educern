import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setLoading(true);
      try {
        const { confirmPassword, ...submitData } = formData;
        e;
        const response = await axios.post(
          "http://localhost:3000/users/",
          submitData
        );
        console.log(response.data);
        navigate("/");
      } catch (error) {
        console.log("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
      console.log("Form Data Submitted:", formData);
    } else {
      setErrors(formErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Form validation sa register
  const validateForm = () => {
    let formErrors: Partial<FormData> = {};

    if (!/^[A-Za-z\s]+$/.test(formData.first_name)) {
      formErrors.first_name = "First name should contain only letters.";
    }
    if (!/^[A-Za-z\s]+$/.test(formData.last_name)) {
      formErrors.last_name = "Last name should contain only letters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      formErrors.email = "Invalid email format.";
    }

    if (
      formData.password.length < 8 ||
      formData.password.length > 16 ||
      !/\d/.test(formData.password)
    ) {
      formErrors.password =
        "Password must be 8-16 characters and include at least one number.";
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
    }

    return formErrors;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-sans text-white bg-stone-800">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="m-4 grid w-full max-w-6xl items-center gap-4 rounded-md p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] md:grid-cols-2 bg-stone-900">
            <div
              className="p-8 bg-blue-600 rounded-xl max-md:mt-10 md:h-full lg:p-12"
              style={{
                backgroundImage:
                  "url(https://i.ibb.co/KFsmqv3/Untitled-design-5.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
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
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333] bg-transparent"
                      placeholder="John"
                    />
                    {errors.first_name && (
                      <p className="text-xs text-red-500">
                        {errors.first_name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-8">
                  <label className="block mb-2 text-xs">Last Name</label>
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                      className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333] bg-transparent"
                      placeholder="Smith"
                    />
                    {errors.last_name && (
                      <p className="text-xs text-red-500">{errors.last_name}</p>
                    )}
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
                      className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333] bg-transparent"
                      placeholder="johnsmith@example.com"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
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
                      className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333] bg-transparent"
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
                    {errors.password && (
                      <p className="text-xs text-red-500">{errors.password}</p>
                    )}
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
                      className="w-full border-b border-gray-300 px-2 py-3 text-sm outline-none focus:border-[#333] bg-transparent"
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
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-12">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-blue-700 focus:outline-none"
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
