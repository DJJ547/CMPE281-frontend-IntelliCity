import { React, useEffect, useState } from "react";
import Map from "../components/Map";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import ButtonCRUD from "../components/ButtonCRUD";
import StreamingDrone from "../components/StreamingDrone";
import { districts } from "../utils/mapDistrictCoordinates";
import Toast from "../components/Toast";

const container_height = "65vh";
const container_width = "55vw";
const api_url = process.env.REACT_APP_DRONE;
export default function DroneManager() {
  //----------------------states-------------------------------------------------------------
  const [selectLat, setSelectLat] = useState(null);
  const [selectLng, setSelectLng] = useState(null);

  const [toast, setToast] = useState({ message: "", type: "" });

  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };

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
  //for add
  const [searched_data, setSearchedData] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [streamvideo, setstreamvideo] = useState("");
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
  const updateMapZoomOnView = (zoom) => {
    setMapZoom(zoom);
  };

  //this is the map selected marker state
  const [selectedMarker, setSelectedMarker] = useState("");
  //this is the map selected marker call back function
  const updateSelectedMarker = (marker) => {
    setSelectedMarker(marker);
    setstreamvideo(marker ? marker.videoUrl : "");
    setUpdateUI(!updateUI);
  };
  //----------------------variables-------------------------------------------------------------
  let agent = localStorage.getItem("is_agent");
  //----------------------API Request-------------------------------------------------------------
  //callback function to disable the device
  const callback_switch_status = async (id) => {
    try {
      const response = await fetch(`${api_url}/drone/DisableDevice/?id=${id}`, {
        method: "POST",
      });
      const data = await response.json();
      setToast({ message: data ? `Device ${id} successfully changed status` : `Device ${id} failed to change status`, type: data ? 'success' : 'error' });
      setUpdateUI(!updateUI);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //callback function to delete the device
  const callback2_delete_device = async (id) => {
    try {
      const response = await fetch(`${api_url}/drone/DeleteDevice/?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      setToast({ message: data ? `Device ${id} successfully deleted` : `Device ${id} failed to delete`, type: data ? 'success' : 'error' });
      setUpdateUI(!updateUI);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //callback3 function to add the device
  const callback3_add_device = async (id) => {
    try {
      const response = await fetch(`${api_url}/drone/AddDevice/?id=${id}`, {
        method: "POST",
      });
      const data = await response.json();
      setToast({ message: data ? `Device ${id} successfully added` : `Device ${id} failed to add`, type: data ? 'success' : 'error' });
      setUpdateUI(!updateUI);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //callback4 function to show real time searched results devices from backend
  const callback4_search_results = async (search_term) => {
    if (search_term === "") {
      setSearchedData([]);
    }
    try {
      const response = await fetch(
        `${api_url}/drone/SearchedDevice?search=${search_term}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setSearchedData(data)
      console.log("searched data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //get the devices data from backend
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(`${api_url}/drone/GetAllDevices/`, {
          method: "GET",
        });
        const data = await response.json();

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
        const response = await fetch(`${api_url}/drone/GetAllIncidences/`, {
          method: "GET",
        });
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
          const response = await fetch(`${api_url}/drone/StopStream/`, {
            method: "GET",
          });
          const data = await response.json();
        } catch (error) {
          console.error("Error:", error);
        }
      };
      cleanup();
    };
  }, [selectedMarker, updateUI]);

  const handleSearchSubmit = async (
    mapCenterLatInput,
    mapCenterLngInput,
    id
  ) => {
    if (id !== "") {
      id = parseInt(id);
      //if id not in my data then return
      let marker = Devices.drones[0].filter((device) => device.id === id)[0];
      if (marker === undefined) {
        return;
      }
      console.log(marker.videoUrl)
      setMapCenterLat(parseFloat(marker.latitude));
      setMapCenterLng(parseFloat(marker.longitude));
      setMapZoom(15);
      setSelectedMarker(marker);
      setSelectLat(marker.latitude);
      setSelectLng(marker.longitude);
      setstreamvideo(marker.videoUrl);
      return;
    }

    setMapCenterLat(parseFloat(mapCenterLatInput));
    setMapCenterLng(parseFloat(mapCenterLngInput));
    let marker = Devices.drones[0].find(
      (device) =>
        parseFloat(device.latitude) === parseFloat(mapCenterLatInput) &&
        parseFloat(device.longitude) === parseFloat(mapCenterLngInput)
    );

    setMapZoom(15);
    setSelectedMarker(marker);
    setSelectLat(mapCenterLatInput);
    setSelectLng(mapCenterLngInput);
    setstreamvideo(marker.videoUrl);
  };

  //----------------------return-------------------------------------------------------------
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-4 justify-between">
        {agent !== "0" && (
          <>
            <ButtonCRUD
              text="Add"
              imgSrc={ADD}
              altText="Drone"
              data={searched_data}
              callback3={callback3_add_device}
              callback4={callback4_search_results}
            />
            <ButtonCRUD
              text="Delete"
              imgSrc="https://upload.wikimedia.org/wikipedia/commons/5/5e/Flat_minus_icon_-_red.svg"
              altText="Drone"
              data={Devices.drones[0]}
              callback_switch_status={callback_switch_status}
              callback_delete_device={callback2_delete_device}
            />
            <ButtonCRUD
              text="Update"
              imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/62/Eo_circle_orange_repeat.svg"
              altText="Drone"
              data={Devices.drones[0]}
              callback_switch_status={callback_switch_status}
              callback_delete_device={callback2_delete_device}
            />
          </>
        )}

        <ButtonCRUD
          text="View"
          imgSrc={view}
          altText="Drone"
          data={Devices}
          callback_view_device={handleSearchSubmit}
        />
        <Toast message={toast.message} type={toast.type} />
      </div>
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
          deviceData={Devices}
          container_height={container_height}
          container_width={container_width}
        />
        <div className="flex ml-5 flex-col ">
          <div className="flex flex-col w-96 h-96 bg-white shadow-lg mb-6">
            <div className="flex flex-col p-2">
              <h2 className="text-lg font-bold text-center">Status</h2>
              <h3 className="text-lg">
                <strong>Device ID: </strong>
                {selectedMarker ? selectedMarker.id : "N/A"}
              </h3>
              <h3 className="text-lg">
                <strong>Location: </strong>
                {selectedMarker
                  ? `(${selectedMarker.latitude}, ${selectedMarker.longitude})`
                  : "N/A"}
              </h3>
              <h3 className="text-lg">
                <strong>Address: </strong>
                {selectedMarker ? selectedMarker.address : "N/A"}
              </h3>
              <h3 className="text-lg">
                <strong>District: </strong>
                {selectedMarker ? selectedMarker.dist_id : "N/A"}
              </h3>
              <h3 className="text-lg">
                <strong>Status: </strong>
                {selectedMarker ? selectedMarker.status : "N/A"}
              </h3>
            </div>
          </div>
          
          <StreamingDrone droneId={selectedMarker ? selectedMarker.id : ''} />
        </div>
      </div>
    </div>
  );
}
