import React from "react";
import LoginIcon from "../../medias/auth/authIcon.png";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex space-x-5">
        <img src={LoginIcon} alt='icon'/>
        <h1 class="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">
          IntelliCity
        </h1>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Login</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Enter email"
          />
          <input
            type="password"
            name="password"
            className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            placeholder="Password"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Login
          </button>
          <p className="text-gray-900 mt-4">
            Don't have an account?
            <a href="/auth/signup" className="text-sm text-blue-500 -200 hover:underline mt-4">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
