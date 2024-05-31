import React, { useState } from "react";
import SignupIcon from "../../medias/auth/authIcon.png";

const api_url = process.env.REACT_APP_DASHBOARD;

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch(`${api_url}/auth/signup/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Signup failed");
        }
        return response.json();
      })
      .then((data) => {
        window.location.href = "/auth/login";
      })
      .catch((error) => {
        console.error("Signup error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex space-x-5">
        <img src={SignupIcon} alt="icon" />
        <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">
          IntelliCity
        </h1>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          Sign Up
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            type="text"
            name="firstname"
            placeholder="firstname"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastname"
            placeholder="lastname"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Sign Up
          </button>
          <p className="text-gray-900 mt-4">
            already have an account?
            <a
              href="/auth/login"
              className="text-sm text-blue-500 -200 hover:underline mt-4"
            >
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
