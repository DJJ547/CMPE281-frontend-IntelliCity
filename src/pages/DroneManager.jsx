import React, { useState } from "react";
import Map from "../components/Map";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import allDrones from "../mockData/allDrones.json";

const container_height = "65vh";
const container_width = "55vw";

export default function DroneManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    drone_id: "",
    latitude: "",
    longitude: "",
    altitude: "",
    timestamp: "",
    district_id: ""
  });
  const [deleteFormData, setDeleteFormData] = useState({
    drone_id: ""
  });
const [updateFormData, setUpdateFormData] = useState({
  update_drone_id: "",
  update_latitude: "",
  update_longitude: "",
  update_altitude: "",
  update_timestamp: "",
  update_district_id: ""
});

const [showViewModal, setShowViewModal] = useState(false);
const [viewDroneData, setViewDroneData] = useState({
  drone_id: ""
});

//return map component selected marker coodinates
const [selectLat, setSelectLat] = useState(null);
const [selectLng, setSelectLng] = useState(null);


const handleUpdateInputChange = (e) => {
  const { name, value } = e.target;
  setUpdateFormData((prevUpdateFormData) => ({
    ...prevUpdateFormData,
    [name]: value
  }));
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value
  }));
};

  /*const handleInputChange = (e, formType) => {
    const { name, value } = e.target;
    if (formType === 'add') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    } else if (formType === 'update') {
      setUpdateFormData((prevUpdateFormData) => ({
        ...prevUpdateFormData,
        [name]: value
      }));
    }
  };
  */
  

  const handleDeleteInputChange = (e) => {
    const { name, value } = e.target;
    setDeleteFormData((prevDeleteFormData) => ({
      ...prevDeleteFormData,
      [name]: value
    }));
  };

  const handleAddDevice = () => {
    setShowAddForm(true);
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/addDevice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add drone");
      }
  
      console.log("Drone added successfully");
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding drone:", error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      drone_id: "",
      latitude: "",
      longitude: "",
      altitude: "",
      timestamp: "",
      district_id: ""
    });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/DeleteDevice", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deleteFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to delete drone");
      }

      console.log("Drone deleted successfully");
      setDeleteFormData({
        drone_id: ""
      });
      setShowDeleteForm(false);
    } catch (error) {
      console.error("Error deleting drone:", error.message);
    }
  };

  const handleUpdateDevice = () => {
    setShowUpdateForm(true);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/UpdateDevice", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateFormData),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update drone");
      }
  
      console.log("Drone updated successfully");
      // Reset the update form after update
      setUpdateFormData({
        update_drone_id: "",
        update_latitude: "",
        update_longitude: "",
        update_altitude: "",
        update_timestamp: "",
        update_district_id: ""
      });
      setShowUpdateForm(false); // Hide update form after successful update
    } catch (error) {
      console.error("Error updating drone:", error.message);
      // Handle error as needed
    }
  };
 
  const closeUpdateForm = () => {
    setShowUpdateForm(false);
  };
  const closeUpdateForm1 = () => {
    setShowUpdateForm(false);
  };
  const closeUpdateForm2= () => {
    setShowUpdateForm(false);
  };
  const handleViewDevice = async () => {
    try {
      // Prompt the user to enter the drone ID
      const droneId = prompt("Enter the Drone ID:");
    
      if (!droneId) {
        // If the user cancels or leaves the input empty, do nothing
        return;
      }
    
      // Fetch the drone details using the entered drone ID
      const response = await fetch("http://127.0.0.1:8000/GetDevice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ drone_id: droneId }), // Send the entered drone ID
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch drone data");
      }
  
      // Parse the response data
      const data = await response.json();
      setViewDroneData(data); // Update the state with fetched data
      setShowViewModal(true); // Show the modal with fetched data
    } catch (error) {
      console.error("Error fetching drone data:", error.message);
      // Handle error as needed
    }
  };
  
  const closeViewModal = () => {
    setShowViewModal(false);
  };
  
  

  
  
  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-4 justify-between">
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-out active:scale-90" onClick={handleAddDevice}>
          <img src={ADD} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          ADD
        </button>
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg" onClick={() => setShowDeleteForm(true)}>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/5/5e/Flat_minus_icon_-_red.svg'} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          Delete
        </button>
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg" onClick={handleUpdateDevice}>
          <img src={'https://upload.wikimedia.org/wikipedia/commons/6/62/Eo_circle_orange_repeat.svg'} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          Update
        </button>
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg"onClick={() => handleViewDevice()}>
          <img src={view} alt="Drone" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          View
        </button>
      </div>
     {/* <div className="flex w-auto h-2/3">
        <Map getMapCoordinates={getMapCoordinates} deviceData={allDrones} container_height={container_height} container_width={container_width}/>
        <div className="flex ml-5">
          <div className="flex flex-col w-96 h-96 bg-white shadow-lg">
            <div className="flex justify-between p-2">
              <h2 className="text-lg font-bold">Status</h2>
            </div>
          </div> 
        </div>
  </div>*/}
      {/*<Map deviceData={allDrones} container_height={container_height} container_width={container_width}/>*/}
      {showAddForm && (
        <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col w-96 h-110 bg-white shadow-lg">
            <div className="flex justify-between p-2">
              <h2 className="text-lg font-bold">Add Drone Details</h2>
            </div>
            <form className="p-4">
              <div className="mb-4">
                <label htmlFor="drone_id" className="block text-sm font-medium text-gray-700">Drone ID</label>
                <input type="text" id="drone_id" name="drone_id" value={formData.drone_id} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="mb-4">
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
                <input type="text" id="latitude" name="latitude" value={formData.latitude} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="mb-4">
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
                <input type="text" id="longitude" name="longitude" value={formData.longitude} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="mb-4">
                <label htmlFor="altitude" className="block text-sm font-medium text-gray-700">Altitude</label>
                <input type="text" id="altitude" name="altitude" value={formData.altitude} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="mb-4">
                <label htmlFor="timestamp" className="block text-sm font-medium text-gray-700">Timestamp</label>
                <input type="text" id="timestamp" name="timestamp" value={formData.timestamp} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="mb-4">
                <label htmlFor="district_id" className="block text-sm font-medium text-gray-700">District ID</label>
                <input type="number" id="district_id" name="district_id" value={formData.district_id} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <button type="button" onClick={handleFormSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Drone
              </button>
              <button
          onClick={closeUpdateForm}
          className="inline-flex justify-center py-2 px-4 ml-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Close
        </button>
            </form>
          </div>
        </div>
      )}
      {showDeleteForm && (
        <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col w-96 h-50 bg-white shadow-lg">
            <div className="flex justify-between p-2">
              <h2 className="text-lg font-bold">Delete Drone</h2>
            </div>
            <form className="p-4">
              <div className="mb-4">
                <label htmlFor="delete_drone_id" className="block text-sm font-medium text-gray-700">Drone ID</label>
                <input
                  type="number"
                  id="delete_drone_id"
                  name="delete_drone_id"
                  value={deleteFormData.drone_id}
                  onChange={(e) => setDeleteFormData({ ...deleteFormData, drone_id: e.target.value })}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete Drone
              </button>
              <button
          onClick={closeUpdateForm1}
          className="inline-flex justify-center py-2 px-4 ml-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Close
        </button>
            </form>
          </div>
        </div>
      )}

{showUpdateForm && (
  <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="flex flex-col w-96 h-110 bg-white shadow-lg">
      <div className="flex justify-between p-2">
        <h2 className="text-lg font-bold">Update Drone Details</h2>
      </div>
      <form className="p-4">
        <div className="mb-4">
          <label htmlFor="update_drone_id" className="block text-sm font-medium text-gray-700">Drone ID</label>
          <input
            type="number"
            id="update_drone_id"
            name="update_drone_id"
            value={updateFormData.update_drone_id}
            onChange={(e) => handleUpdateInputChange(e)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="update_latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
          <input
            type="number"
            id="update_latitude"
            name="update_latitude"
            value={updateFormData.update_latitude}
            onChange={(e) => handleUpdateInputChange(e)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="update_longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
          <input
            type="number"
            id="update_longitude"
            name="update_longitude"
            value={updateFormData.update_longitude}
            onChange={(e) => handleUpdateInputChange(e)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="update_altitude" className="block text-sm font-medium text-gray-700">Altitude</label>
          <input
            type="number"
            id="update_altitude"
            name="update_altitude"
            value={updateFormData.update_altitude}
            onChange={(e) => handleUpdateInputChange(e)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="update_timestamp" className="block text-sm font-medium text-gray-700">TimeStamp</label>
          <input
            type="text"
            id="update_timestamp"
            name="update_timestamp"
            value={updateFormData.update_timestamp}
            onChange={(e) => handleUpdateInputChange(e)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="update_district_id" className="block text-sm font-medium text-gray-700">District ID</label>
          <input
            type="number"
            id="update_district_id"
            name="update_district_id"
            value={updateFormData.update_district_id}
            onChange={(e) => handleUpdateInputChange(e)}
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>        
        <button
          type="button"
          onClick={handleUpdate}
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Update Drone
        </button>
        <button
          onClick={closeUpdateForm2}
          className="inline-flex justify-center py-2 px-4 ml-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Close
        </button>
      </form>
    </div>
  </div>
)}
<div className="flex w-auto h-2/3">
  <Map getMapCoordinates={getMapCoordinates} deviceData={allDrones} container_height={container_height} container_width={container_width}/>
  <div className="flex ml-5">
    <div className="flex flex-col w-96 h-96 bg-white shadow-lg status-container">
      <div className="flex justify-between p-2">
        <h2 className="text-lg font-bold">Status</h2>
      </div>
      {showViewModal && (
        <div className="p-4">
          <p><strong>Drone ID:</strong> {viewDroneData.drone_id}</p>
          <p><strong>Latitude:</strong> {viewDroneData.latitude}</p>
          <p><strong>Longitude:</strong> {viewDroneData.longitude}</p>
          <p><strong>Altitude:</strong> {viewDroneData.altitude}</p>
          <p><strong>Timestamp:</strong> {viewDroneData.timestamp}</p>
          <p><strong>District ID:</strong> {viewDroneData.district_id}</p>
        </div>
      )}
    </div> 
  </div>
</div>

    </div>
  );
}



