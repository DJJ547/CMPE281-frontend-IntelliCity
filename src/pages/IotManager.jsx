import React, { useState } from "react";
import {
  PlusCircleIcon,
  TrashIcon,
  PencilIcon,
  EyeIcon,
} from "@heroicons/react/16/solid";
import Map from "../components/Map";
import allIots from "../mockData/allIots.json";
import { districts } from "../utils/mapDistrictCoordinates";

const container_height = "70vh";
const container_width = "80vw";

export default function IotManager() {
  const [showForm, setShowForm] = useState(false);
  //return map component selected marker coodinates
  const [selectLat, setSelectLat] = useState(null);
  const [selectLng, setSelectLng] = useState(null);

  //==================For View Button============================
  //these are the map center states
  const [mapCenterLat, setMapCenterLat] = useState(districts[0].lat);
  const [mapCenterLng, setMapCenterLng] = useState(districts[0].lng);

  //this is the map center call back function
  const updateMapCoordinates = (lat, lng) => {
    console.log("lat", lat);
    console.log("lng", lng);
    setMapCenterLat(lat);
    setMapCenterLng(lng);
  };

  //this is the map zoom state
  const [mapZoom, setMapZoom] = useState(6);
  //this is the map zoom call back function
  const updateMapZoom = (zoom) => {
    setMapZoom(zoom);
  };
  //==============================================================

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleSaveClick = () => {
    // Handle save logic here
    setShowForm(false);
  };

  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex space-x-2">
        <button
          onClick={handleAddClick}
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <span>Add</span>
        </button>
        <button className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded">
          <TrashIcon className="h-5 w-5" />
          <span>Delete</span>
        </button>
        <button className="flex items-center space-x-2 bg-yellow-500 text-white px-4 py-2 rounded">
          <PencilIcon className="h-5 w-5" />
          <span>Update</span>
        </button>
        <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded">
          <EyeIcon className="h-5 w-5" />
          <span>View</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded space-y-4">
            <label className="block">
              <span className="text-gray-700">ID:</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Latitude:</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Longitude:</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Status:</span>
              <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option value="active">Active</option>
                <option value="defective">Defective</option>
                <option value="disabled">Disabled</option>
              </select>
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleSaveClick}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-auto h-2/3">
        <Map
          centerLatState={mapCenterLat}
          centerLngState={mapCenterLng}
          mapZoomState={mapZoom}
          updateMapCoordinatesCallback={updateMapCoordinates}
          updateMapZoomCallback={updateMapZoom}
          getMapCoordinates={getMapCoordinates}
          deviceData={allIots}
          container_height={container_height}
          container_width={container_width}
        />
      </div>
    </div>
  );
}
