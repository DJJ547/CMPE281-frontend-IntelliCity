import React, { useState, useEffect } from "react";
import Map from "../components/Map";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import { districts } from "../utils/mapDistrictCoordinates";
import StreamingDrone from "../components/StreamingDrone";



const container_height = "65vh";
const container_width = "55vw";

export default function DroneManager() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    latitude: "",
    longitude: "",
    altitude: "",
    timestamp: "",
    dist_id: "",
    status: "",
  });
  const [deleteFormData, setDeleteFormData] = useState({
    id: ""
  });
  const [updateFormData, setUpdateFormData] = useState({
    update_id: "",
    update_latitude: "",
    update_longitude: "",
    update_altitude: "",
    update_timestamp: "",
    update_dist_id: "",
    update_status: "",
  });

  const [showViewModal, setShowViewModal] = useState(false);
  const [viewDroneData, setViewDroneData] = useState({
    id: "",
    latitude: "",
    longitude: "",
    altitude: "",
    timestamp: "",
    dist_id: "",
    status: "",
  });

  const [statusMessage, setStatusMessage] = useState("");

  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null); // State to store the selected video URL

  const [incidents, setIncidents] = useState([]);
  
  const [updateUI, setUpdateUI] = useState(false);
  const [Devices, setDevices] = useState({
    drones: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    },
  });
  //const [searched_data, setSearchedData] = useState([]);
  //const [screenshot, setscreenshot] = useState("");
  //const [streamvideo, setstreamvideo] = useState("");

  const [selectedDevice, setSelectedDevice] = useState(null);

 //return map component selected marker coodinates
  const [selectLat, setSelectLat] = useState(null);
  const [selectLng, setSelectLng] = useState(null);

  //==================For View Button============================
  //these are the map center states
  const [mapCenterLat, setMapCenterLat] = useState(districts[0].lat);
  const [mapCenterLng, setMapCenterLng] = useState(districts[0].lng);

  //this is the map center call back function
  const updateMapCoordinates = (lat, lng) => {
    setMapCenterLat(lat);
    setMapCenterLng(lng);
  };

  //this is the map zoom state
  const [mapZoom, setMapZoom] = useState(6);
  //this is the map zoom call back function
  const updateMapZoomOnView = () => {
    setMapZoom(15);
  };

  //this is the map selected marker state
  const [selectedMarker, setSelectedMarker] = useState("");
  //this is the map selected marker call back function
  const updateSelectedMarker = (marker) => {
    setSelectedMarker(marker);
  };
  //==============================================================
  //==============================================================
  // Function to fetch video URL for a given drone ID
  const fetchVideoUrlForDrone = async (droneId) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/getVideoUrls", {
        //const response = await fetch("http://127.0.0.1:8000/StreamVideo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: droneId }),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch video URL");
      }
      const data = await response.json();
      console.log(data.videourl)
      setSelectedVideoUrl(data.videourl);
      console.log(selectedVideoUrl)

    } catch (error) {
      console.error("Error fetching video URL for drone:", error.message);
    }
  };
  useEffect(() => {
        const fetchDevices = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/getAllDevices",
            { method: "GET" }
          );
          const data = await response.json();
          console.log(data)
          // Only update the state if the data has changed
          if (JSON.stringify(data) !== JSON.stringify(Devices)) {
            setDevices(data);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      };
      const fetchIncidences = async () => {
        try {
          const response = await fetch(
            "http://localhost:8000/api/GetAllIncidences/",
            { method: "GET" }
          );
          const data = await response.json();
          setIncidents(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
  
      fetchDevices();
      fetchIncidences();
      return () => {
        const cleanup = async () => {
          try {
            const response = await fetch(
              "http://localhost:8000/api/StopStream/",
              {
                method: "GET",
              }
            );
            const data = await response.json();
            console.log(data)
          } catch (error) {
            console.error("Error:", error);
          }
        };
        cleanup();
      };
    }, [updateUI, mapCenterLat, mapCenterLng, mapZoom, selectedMarker, selectedVideoUrl])


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

  const handleAddDevice = () => {
    setShowAddForm(true);
    clearStatusAndModal();
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

      setStatusMessage("Drone added successfully");
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      setStatusMessage(`Error adding drone: ${error.message}`);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      latitude: "",
      longitude: "",
      altitude: "",
      timestamp: "",
      dist_id: "",
      status: "",
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

      setStatusMessage("Drone deleted successfully");
      setDeleteFormData({
        id: ""
      });
      setShowDeleteForm(false);
    } catch (error) {
      setStatusMessage(`Error deleting drone: ${error.message}`);
    }
  };

  const handleUpdateDevice = () => {
    setShowUpdateForm(true);
    clearStatusAndModal();
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

      setStatusMessage("Drone updated successfully");
      setUpdateFormData({
        update_id: "",
        update_latitude: "",
        update_longitude: "",
        update_altitude: "",
        update_timestamp: "",
        update_dist_id: "",
        update_status: "",
      });
      setShowUpdateForm(false);
    } catch (error) {
      setStatusMessage(`Error updating drone: ${error.message}`);
    }
  };

  const handleViewDevice = async () => {
    try {
      const droneId = prompt("Enter the Drone ID:");

      if (!droneId) {
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/GetDevice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: droneId }),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to fetch drone data");
        
      }

      const data = await response.json();
      console.log(data)

      setViewDroneData(data);
      setShowViewModal(true);
      fetchVideoUrlForDrone(droneId);
      setMapCenterLat(data.latitude)
      setMapCenterLng(data.longitude)
      setMapZoom(15)
      setSelectedMarker(data)
    } catch (error) {
      setStatusMessage(`Error fetching drone data: ${error.message}`);
    }
  };

  const clearStatusAndModal = () => {
    setStatusMessage("");
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
      
      {showAddForm && (
        <div className="absolute top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col w-96 h-110 bg-white shadow-lg">
            <div className="flex justify-between p-2">
              <h2 className="text-lg font-bold">Add Drone Details</h2>
            </div>
            <form className="p-4">
              <div className="mb-4">
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">Drone ID</label>
                <input type="text" id="id" name="id" value={formData.id} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
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
                <label htmlFor="dist_id" className="block text-sm font-medium text-gray-700">District ID</label>
                <input type="number" id="dist_id" name="dist_id" value={formData.dist_id} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <input type="text" id="status" name="status" value={formData.status} onChange={handleInputChange} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <button type="button" onClick={handleFormSubmit} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Add Drone
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setStatusMessage("");
                }}
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
                <label htmlFor="delete_id" className="block text-sm font-medium text-gray-700">Drone ID</label>
                <input
                  type="number"
                  id="delete_id"
                  name="delete_id"
                  value={deleteFormData.id}
                  onChange={(e) => setDeleteFormData({ ...deleteFormData, id: e.target.value })}
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
                onClick={() => {
                  setShowDeleteForm(false);
                  setStatusMessage("");
                }}
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
                <label htmlFor="update_id" className="block text-sm font-medium text-gray-700">Drone ID</label>
                <input
                  type="number"
                  id="update_id"
                  name="update_id"
                  value={updateFormData.update_id}
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
                <label htmlFor="update_dist_id" className="block text-sm font-medium text-gray-700">District ID</label>
                <input
                  type="number"
                  id="update_dist_id"
                  name="update_dist_id"
                  value={updateFormData.update_dist_id}
                  onChange={(e) => handleUpdateInputChange(e)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>        
              <div className="mb-4">
                <label htmlFor="update_status" className="block text-sm font-medium text-gray-700">Status</label>
                <input
                  type="number"
                  id="update_status"
                  name="update_status"
                  value={updateFormData.update_status}
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
                onClick={() => {
                  setShowUpdateForm(false);
                  setStatusMessage("");
                }}
                className="inline-flex justify-center py-2 px-4 ml-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="flex w-auto h-2/3">
      <Map
          centerLatState={mapCenterLat}
          centerLngState={mapCenterLng}
          mapZoomState={mapZoom}
          selectedMarkerState={selectedMarker}
          updateSelectedMarkerCallback={updateSelectedMarker}
          updateMapCoordinatesCallback={updateMapCoordinates}
          updateMapZoomCallback={updateMapZoomOnView}
          getMapCoordinates={getMapCoordinates}
          incidentData={incidents}
          deviceData={Devices}
          container_height={container_height}
          container_width={container_width}
        />        
        <div className="flex ml-5">
          <div className="flex flex-col w-96 h-96 bg-white shadow-lg status-container">
            <div className="flex justify-between p-2">
              <h2 className="text-lg font-bold">Status</h2>
            </div>
            <p>{statusMessage}</p>
            {showViewModal && (
              <div className="p-4">
                <p><strong>Drone ID:</strong> {viewDroneData.id}</p>
                <p><strong>Latitude:</strong> {viewDroneData.latitude}</p>
                <p><strong>Longitude:</strong> {viewDroneData.longitude}</p>
                <p><strong>Altitude:</strong> {viewDroneData.altitude}</p>
                <p><strong>District ID:</strong> {viewDroneData.dist_id}</p>
              </div>
            )}
            {/* Render video player if a video URL is selected */}
            {selectedVideoUrl && (
              <div>
                <h2>Video</h2>
                {/*<video src={selectedVideoUrl} controls /> */}
                <StreamingDrone  droneId={viewDroneData.id} />
              </div>
            )}
            {/*<Streaming  videoUrl={selectedVideoUrl} latitude={viewDroneData.latitude} longitude={viewDroneData.longitude} /> */}

          </div>
        </div>
      </div>
    </div>
  );
}
