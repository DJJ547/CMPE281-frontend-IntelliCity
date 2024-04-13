import React, { useState } from "react";
import Map from "../components/Map";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import allDrones from "../mockData/allDrones.json";

const container_height = "65vh";
const container_width = "55vw";

export default function Dashboard() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [droneDetails, setDroneDetails] = useState({
    id: "",
    latitude: "",
    longitude: "",
    status: "",
  });
  const [deleteDroneId, setDeleteDroneId] = useState(""); // New state for delete modal

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDroneDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted drone details:", droneDetails);
    // Reset droneDetails
    setDroneDetails({
      id: "",
      latitude: "",
      longitude: "",
      status: "",
    });
    // Close the modal
    setShowAddModal(false);
  };

  const handleAddDevice = () => {
    setShowAddModal(true);
  };

  const handleDelete = () => {
    console.log("Deleting drone with ID:", deleteDroneId);
    // For now, just log the ID
    setDeleteDroneId(""); // Clear the deleteDroneId state
    setShowDeleteModal(false); // Close the delete modal
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-4 justify-between">
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-out active:scale-90" onClick={handleAddDevice}>
          <img src={ADD} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          ADD
        </button>
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg" onClick={() => setShowDeleteModal(true)}>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/5/5e/Flat_minus_icon_-_red.svg'} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          Delete
        </button>

        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg">
          <img src={'https://upload.wikimedia.org/wikipedia/commons/6/62/Eo_circle_orange_repeat.svg'} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          Update
        </button>

        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg">
          <img src={view} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          View
        </button>
        {/* Other buttons */}
      </div>
      <div className="flex w-auto h-2/3">
        <Map deviceData={allDrones} container_height={container_height} container_width={container_width}/>
        <div className="flex ml-5">
          <div className="flex flex-col w-96 h-96 bg-white shadow-lg">
            <div className="flex justify-between p-2">
              <h2 className="text-lg font-bold">Status</h2>
            </div>
          </div> 
        </div>
      </div>
      {/* Add AddDroneModal */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Drone</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">ID</label>
              <input
                type="text"
                name="id"
                value={droneDetails.id}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Latitude</label>
              <input
                type="text"
                name="latitude"
                value={droneDetails.latitude}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={droneDetails.longitude}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <input
                type="text"
                name="status"
                value={droneDetails.status}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            {/* Other input fields */}
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handleSubmit}>Add</button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setShowAddModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      {/* Add DeleteDroneModal */}
      {showDeleteModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Delete Drone</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Drone ID</label>
              <input
                type="text"
                value={deleteDroneId}
                onChange={(e) => setDeleteDroneId(e.target.value)} // Update deleteDroneId state
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <p>Are you sure you want to delete this drone?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={handleDelete}>Delete</button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={() => setShowDeleteModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
