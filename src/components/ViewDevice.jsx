import React, { useState } from "react";

export default function ViewDevice(props) {
  const [mapCenterLatInput, setMapCenterLatInput] = useState("");
  const [mapCenterLngInput, setMapCenterLngInput] = useState("");
  const [id, setId] = useState("");
  function handleMapCenterLatChange(e) {
    setMapCenterLatInput(e.target.value);
  }
  function handleMapCenterLngChange(e) {
    setMapCenterLngInput(e.target.value);
  }
  function handleIdChange(e) {
    setId(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    console.log(id);
    props.callback_view_device(mapCenterLatInput, mapCenterLngInput, id);
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg w-1/5 h-auto p-8">
        <button
          onClick={props.onClick}
          className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-800 text-3xl font-bold focus:outline-none border-none"
        >
          &times;
        </button>
        <h1 className="text-2xl font-bold text-center mb-4">Devices</h1>
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <label className="block">
            <input
              type="text"
              value={mapCenterLatInput}
              onChange={handleMapCenterLatChange}
              placeholder="Enter latitude"
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <label className="block">
            <input
              type="text"
              value={mapCenterLngInput}
              onChange={handleMapCenterLngChange}
              placeholder="Enter longitude"
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />

            <input
              type="text"
              value={id}
              onChange={handleIdChange}
              placeholder="Enter Device ID"
              className="mt-1 block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            GO
          </button>
        </form>
      </div>
    </div>
  );
}
