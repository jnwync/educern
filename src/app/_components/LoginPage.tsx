import React, { useState } from "react";
import axios from "axios";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginRegisterForm: React.FC = () => {
  const [login, setLogin] = useState<LoginFormData>({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void fetchUsers(login.email, login.password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof LoginFormData) => {
    setLogin(prevState => ({
      ...prevState,
      [field]: e.target.value
    }));
  };

  const fetchUsers = async (email: string, password: string) => {
    try {
      const response = await axios.get("/api/users", { params: { email, password } });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <div className="mt-8 bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={login.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={login.password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
