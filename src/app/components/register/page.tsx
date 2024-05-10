"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
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

  const handleClose = () => {
    router.push("/components/login");
  };

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center  px-5 py-5">
      <div className="relative w-full max-w-screen-xl overflow-hidden rounded-3xl bg-gray-100 text-gray-500 shadow-xl">
        <button
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-600"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full md:flex">
          <div className=" hidden w-1/2 bg-[#000842] px-10 py-10 md:block">
            <img
              src="https://i.ibb.co/wMhhRCc/5.png"
              alt="Registration Image"
              className="h-auto w-full rounded-2xl"
            />
          </div>
          <div className="w-full px-5 py-10 md:w-1/2 md:px-10">
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-[#333]">REGISTER</h1>
              <p className="text-[#333]">Enter your information to register</p>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="-mx-3 flex">
                  <div className="mb-5 w-1/2 px-3">
                    <label className="px-1 text-xs font-semibold">
                      First name
                    </label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                        <i className="mdi mdi-account-outline text-lg text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[#333]"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div className="mb-5 w-1/2 px-3">
                    <label className="px-1 text-xs font-semibold">
                      Last name
                    </label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                        <i className="mdi mdi-account-outline text-lg text-gray-400"></i>
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[#333]"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                </div>
                <div className="-mx-3 flex">
                  <div className="mb-5 w-full px-3">
                    <label className="px-1 text-xs font-semibold">Email</label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                        <i className="mdi mdi-email-outline text-lg text-gray-400"></i>
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[#333]"
                        placeholder="johnsmith@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="-mx-3 flex">
                  <div className="mb-5 w-full px-3">
                    <label className="px-1 text-xs font-semibold">
                      Password
                    </label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                        <i className="mdi mdi-lock-outline text-lg text-gray-400"></i>
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[#333]"
                        placeholder="************"
                      />
                    </div>
                  </div>
                </div>
                <div className="-mx-3 flex">
                  <div className="mb-12 w-full px-3">
                    <label className="px-1 text-xs font-semibold">
                      Confirm Password
                    </label>
                    <div className="flex">
                      <div className="pointer-events-none z-10 flex w-10 items-center justify-center pl-1 text-center">
                        <i className="mdi mdi-lock-outline text-lg text-gray-400"></i>
                      </div>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="-ml-10 w-full rounded-lg border-2 border-gray-200 py-2 pl-10 pr-3 outline-none focus:border-[#333]"
                        placeholder="************"
                      />
                    </div>
                  </div>
                </div>
                <div className="-mx-3 flex">
                  <div className="mb-5 w-full px-3">
                    <button
                      type="submit"
                      className="mx-auto block w-full max-w-xs rounded-lg bg-[#000842] px-3 py-3 font-semibold text-white hover:bg-blue-700 focus:bg-blue-700"
                    >
                      REGISTER NOW
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
