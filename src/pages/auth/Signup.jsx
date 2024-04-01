import React, { useState } from "react";
import SignupIcon from '../../medias/auth/authIcon.png'

export default function Signup() {
  const [password, setPassword] = React.useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex space-x-5">
        <img src={SignupIcon} alt='icon'/>
        <h1 class="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">
          IntelliCity
        </h1>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Sign Up</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="email"
          />
          <input
            type="text"
            name="firstname"
            placeholder="first name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="password"
            onChange={handlePasswordChange}
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
