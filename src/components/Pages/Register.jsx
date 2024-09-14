import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { registerAccount } from '../../Utility/api';
import { Mail, Lock, UserPlus } from 'lucide-react';

const Checkmark = ({ isVisible }) => (
  <svg
    className={`w-5 h-5 text-green-500 transition-transform transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
      }`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const Register = () => {
  const navigate = useNavigate();
  const loginRoute = '/login';
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handleChange = (name, value) => {
    setInputs(prevInputs => ({ ...prevInputs, [name]: value }));

    if (name === 'password') {
      setPasswordCriteria({
        minLength: value.length >= 8,
        hasUpperCase: /[A-Z]/.test(value),
        hasLowerCase: /[a-z]/.test(value),
        hasNumber: /[0-9]/.test(value),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const validatePassword = () => {
    return (
      passwordCriteria.minLength &&
      passwordCriteria.hasUpperCase &&
      passwordCriteria.hasLowerCase &&
      passwordCriteria.hasNumber &&
      passwordCriteria.hasSpecialChar
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!inputs.username || !inputs.email || !inputs.password || !inputs.confirmPassword) {
        setErrorMsg('All fields are required.');
        return;
      }
      if (!validatePassword()) {
        setErrorMsg('Password must meet all criteria.');
      } else if (inputs.password !== inputs.confirmPassword) {
        setErrorMsg('Passwords do not match.');
      } else {
        const response = await registerAccount(inputs);
        if (!response.success) {
          setErrorMsg(response.message);
        } else {
          setErrorMsg('Account registered successfully.');
          setTimeout(() => {
            navigate(loginRoute);
          }, 2500);
        }
      }
    } catch (error) {
      console.error('Registration error', error);
      setErrorMsg('Registration error, please try again!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex justify-center items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-8">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-lg p-8">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formBasicUsername">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={(e) => handleChange('username', e.target.value)}
                placeholder="Enter your username"
                className="border rounded-lg p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="formBasicUsername"
                required
              />
              <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formBasicEmail">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={(e) => handleChange('email', e.target.value)}
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
                value={inputs.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="Enter your password"
                className="border rounded-lg p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="formBasicPassword"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="formBasicConfirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="confirmPassword"
                value={inputs.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className="border rounded-lg p-3 w-full pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="formBasicConfirmPassword"
                required
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>

          <div className="mb-2">
            <ul className="text-gray-600 flex flex-col items-start space-y-1">
              <li className="flex items-center">
                <Checkmark isVisible={passwordCriteria.minLength} />
                <span className="ml-2">At least 8 characters</span>
              </li>
              <li className="flex items-center">
                <Checkmark isVisible={passwordCriteria.hasUpperCase} />
                <span className="ml-2">At least one uppercase letter</span>
              </li>
              <li className="flex items-center">
                <Checkmark isVisible={passwordCriteria.hasLowerCase} />
                <span className="ml-2">At least one lowercase letter</span>
              </li>
              <li className="flex items-center">
                <Checkmark isVisible={passwordCriteria.hasNumber} />
                <span className="ml-2">At least one number</span>
              </li>
              <li className="flex items-center">
                <Checkmark isVisible={passwordCriteria.hasSpecialChar} />
                <span className="ml-2">At least one special character</span>
              </li>
            </ul>
          </div>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
              <span className="block sm:inline">{errorMsg}</span>
            </div>
          )}

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg w-full transition duration-300 ease-in-out flex items-center justify-center"
            type="submit"
          >
            <UserPlus className="mr-2" size={18} />
            Register
          </button>

          <p className="text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link to={loginRoute} className="text-blue-500 hover:text-blue-700 font-semibold">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
