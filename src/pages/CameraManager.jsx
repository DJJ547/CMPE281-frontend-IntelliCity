import { React, useEffect, useState } from "react";
import Map from "../components/Map";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import ButtonCRUD from "../components/ButtonCRUD";
import Streaming from "../components/Streaming";
import { districts } from "../utils/mapDistrictCoordinates";

const container_height = "65vh";
const container_width = "55vw";

export default function Dashboard() {
  //----------------------states-------------------------------------------------------------
  const [selectLat, setSelectLat] = useState(null);
  const [selectLng, setSelectLng] = useState(null);
  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };

  const [updateUI, setUpdateUI] = useState(false);
  const [Devices, setDevices] = useState({
    cameras: {
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
  const [screenshot, setscreenshot] = useState("");
  const [streamvideo, setstreamvideo] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
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
  };
  //----------------------variables-------------------------------------------------------------
  let device = Devices.cameras[0].filter(
    (item) => item.id === selectedDevice
  )[0];
  let status = device ? device.status : "N/A";
  let latitude = device ? device.latitude : null;
  let longitude = device ? device.longitude : null;
  let location = device ? `(${device.latitude}, ${device.longitude})` : "N/A";
  let dist_id = device ? device.dist_id : "N/A";
  let address = device ? device.address : "N/A";
  //----------------------API Request-------------------------------------------------------------
  //callback function to disable the device
  const callback_switch_status = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/DisableDevice/?id=${id}`,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      console.log("data", data);
      setUpdateUI(!updateUI);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //callback function to delete the device
  const callback2_delete_device = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/DeleteDevice?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      setUpdateUI(!updateUI);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //callback3 function to add the device
  const callback3_add_device = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/AddDevice/?id=${id}`,
        {
          method: "POST",
        }
      );
      const res = await response.json();
      console.log("res", res);
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
        `http://localhost:8000/api/SearchedDevice?search=${search_term}`,
        {
          method: "GET",
        }
      );
      const res = await response.json();

      setSearchedData(res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //get the devices data from backend
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/GetAllDevices/",
          { method: "GET" }
        );
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
        } catch (error) {
          console.error("Error:", error);
        }
      };
      cleanup();
    };
  }, [updateUI]);

  const handleSearchSubmit = async (mapCenterLatInput, mapCenterLngInput) => {
    setMapCenterLat(parseFloat(mapCenterLatInput));
    setMapCenterLng(parseFloat(mapCenterLngInput));
    let marker = Devices.cameras[0].find(
      (device) =>
        parseFloat(device.latitude) === parseFloat(mapCenterLatInput) &&
        parseFloat(device.longitude) === parseFloat(mapCenterLngInput)
    );

    setMapZoom(15);
    setSelectedMarker(marker);
    setSelectLat(mapCenterLatInput);
    setSelectLng(mapCenterLngInput);
  };
  //----------------------functions-------------------------------------------------------------
  const Selected = async (id) => {
    let item = Devices.cameras[0].filter((item) => item.id === id)[0];
    let screenshot1 = item.image_url;
    let videoUrl = item.video_url;
    setSelectedDevice(id);
    setscreenshot(screenshot1);
    setstreamvideo(videoUrl);
    setUpdateUI(!updateUI);
  };

  //----------------------return-------------------------------------------------------------
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-4 justify-between">
        <ButtonCRUD
          text="Add"
          imgSrc={ADD}
          altText="Camera"
          data={searched_data}
          callback3={callback3_add_device}
          callback4={callback4_search_results}
        />
        <ButtonCRUD
          text="Delete"
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/5/5e/Flat_minus_icon_-_red.svg"
          altText="Camera"
          data={Devices.cameras[0]}
          callback_switch_status={callback_switch_status}
          callback_delete_device={callback2_delete_device}
        />
        <ButtonCRUD
          text="Update"
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/62/Eo_circle_orange_repeat.svg"
          altText="Camera"
          data={Devices.cameras[0]}
          callback_switch_status={callback_switch_status}
          callback_delete_device={callback2_delete_device}
        />

        <ButtonCRUD
          text="View"
          imgSrc={view}
          altText="Camera"
          callback_view_device={handleSearchSubmit}
        />
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
          incidentData={incidents}
          deviceData={Devices}
          container_height={container_height}
          container_width={container_width}
          Selected={Selected}
        />
        <div className="flex ml-5 flex-col ">
          <div className="flex flex-col w-96 h-96 bg-white shadow-lg mb-6">
            <div className="flex flex-col p-2">
              <h2 className="text-lg font-bold text-center">Status</h2>
              <h3 className="text-lg">
                <strong>Device ID: </strong>
                {selectedDevice}
              </h3>
              <h3 className="text-lg">
                <strong>Device Status: </strong>
                {status}
              </h3>
              <h3 className="text-lg">
                <strong>Location: </strong>
                {location}
              </h3>
              <h3 className="text-lg">
                <strong>Dist ID: </strong>
                {dist_id}
              </h3>
              <h3 className="text-lg">
                <strong>Address: </strong>
                {address}
              </h3>
            </div>
          </div>
          <Streaming
            screenshot={screenshot}
            videoUrl={streamvideo}
            latitude={latitude}
            longitude={longitude}
            district={dist_id}
          />
        </div>
      </div>
    </div>
  );
}
