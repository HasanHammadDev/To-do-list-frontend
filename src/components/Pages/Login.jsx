import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAccount } from "../../Utility/api";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const registerRoute = '/register';
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await loginAccount(credentials);
      if (response.success) {
        navigate('/');
        setIsLoggedIn(true);
      } else {
        setErrorMsg(response.message);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Hasan's Todo List
        </h1>
        <form onSubmit={handleLogin} className="bg-white shadow-2xl rounded-lg p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formBasicEmail">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border rounded-lg p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="formBasicEmail"
                required
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formBasicPassword">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border rounded-lg p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="formBasicPassword"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300 ease-in-out flex items-center justify-center"
            type="submit"
          >
            <LogIn className="mr-2" size={18} />
            Login
          </button>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <span className="block sm:inline">{errorMsg}</span>
            </div>
          )}

          <p className="text-gray-600 text-center mt-6">
            Don't have an account?{" "}
            <Link to={registerRoute} className="text-blue-500 hover:text-blue-700 font-semibold">
              Register New Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;