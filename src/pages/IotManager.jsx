import { React, useEffect, useState } from "react";
import Map from "../components/Map";
import CustomChart from "../components/dashboard/CustomChart";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import ButtonCRUD from "../components/ButtonCRUD";
import { districts } from "../utils/mapDistrictCoordinates";
import Toast from "../components/Toast";

const container_height = "65vh";
const container_width = "55vw";
const api_url = process.env.REACT_APP_IOT;

export default function IotManager() {
  //----------------------states-------------------------------------------------------------
  const [selectLat, setSelectLat] = useState(null);
  const [selectLng, setSelectLng] = useState(null);
  const [predictedAvg, setPredictedAverage] = useState([]);

  const [toast, setToast] = useState({ message: "", type: "" });

  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };

  //==================For View Button============================
  //these are the map center states
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
    marker && fetchStationData(marker.id);
  };

  const [stationData, setStationData] = useState([]);
  //==============================================================

  const [updateUI, setUpdateUI] = useState(false);
  const [Devices, setDevices] = useState({
    iots: {
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
  const [activeCongestions, setActiveCongestions] = useState({
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
  });
  const [allCongestions, setAllCongestions] = useState({
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
  });
  const [searched_data, setSearchedData] = useState([]);

  //----------------------variables-------------------------------------------------------------
  let agent = parseInt(localStorage.getItem("is_agent"));

  //----------------------API Request-------------------------------------------------------------
  //callback function to disable the device
  const callback_switch_status = async (id) => {
    try {
      const response = await fetch(`${api_url}/iot/disableDevice/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
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
      const response = await fetch(`${api_url}/iot/deleteDevice?id=${id}`, {
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
      const response = await fetch(`${api_url}/iot/addDevice/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
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
        `${api_url}/iot/searchedDevice?search=${search_term}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();

      setSearchedData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchStationData = (staion_id) => {
    fetch(`${api_url}/iot/getFlowSpeed/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: staion_id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Bad request");
        }
        return response.json();
      })
      .then((data) => {
        setStationData(data.station_data);
        console.log('station data here')
        setPredictedAverage(data.predicted_average);
      })
      .catch((error) => {
        console.error("Failed to fetch devices:", error);
      });
  };

  useEffect(() => {
    // Fetch all data initially and every 10 minute
    const fetchAllData = () => {
      fetch(`${api_url}/iot/getAllDevices/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad request");
          }
          return response.json();
        })
        .then((data) => {
          setDevices(data.devices);
        })
        .catch((error) => {
          console.error("Failed to fetch devices:", error);
        });
    };
    fetchAllData();

    // Fetch congestion data every 5 minutes
    const fetchAllCongestions = () => {
      fetch(`${api_url}/iot/getAllCongestions/`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad request");
          }
          return response.json();
        })
        .then((data) => {
          setActiveCongestions(data.congestions.active);
          setAllCongestions(data.congestions.all);
        })
        .catch((error) => console.error("Failed to fetch congestions:", error));
    };
    const congestionsInterval = setInterval(fetchAllCongestions, 300000);
    fetchAllCongestions();
    // Cleanup function to clear intervals when the component unmounts or dependencies change
    return () => {
      clearInterval(congestionsInterval);
    };
  }, [updateUI]);

  const handleSearchSubmit = async (
    mapCenterLatInput,
    mapCenterLngInput,
    id
  ) => {
    if (id !== "") {
      id = parseInt(id);
      //if id not in my data then return
      let marker = Devices.iots[0].filter((device) => device.id === id)[0];
      if (marker === undefined) {
        return;
      }
      setMapCenterLat(parseFloat(marker.latitude));
      setMapCenterLng(parseFloat(marker.longitude));
      setMapZoom(15);
      setSelectedMarker(marker);
      setSelectLat(marker.latitude);
      setSelectLng(marker.longitude);
      console.log(id)
      fetchStationData(id);
      return;
    }

    setMapCenterLat(parseFloat(mapCenterLatInput));
    setMapCenterLng(parseFloat(mapCenterLngInput));
    let marker = Devices.iots[0].find(
      (device) =>
        parseFloat(device.latitude) === parseFloat(mapCenterLatInput) &&
        parseFloat(device.longitude) === parseFloat(mapCenterLngInput)
    );

    setMapZoom(15);
    setSelectedMarker(marker);
    setSelectLat(mapCenterLatInput);
    setSelectLng(mapCenterLngInput);
    fetchStationData(id);
  };

  //----------------------return-------------------------------------------------------------
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-4 justify-between">
        {agent === 1 && (
          <>
            <ButtonCRUD
              text="Add"
              imgSrc={ADD}
              altText="IoT Device Add"
              data={searched_data}
              callback3={callback3_add_device}
              callback4={callback4_search_results}
            />
            <ButtonCRUD
              text="Delete"
              imgSrc="https://upload.wikimedia.org/wikipedia/commons/5/5e/Flat_minus_icon_-_red.svg"
              altText="IoT Device Delete"
              data={Devices.iots[0]}
              callback_switch_status={callback_switch_status}
              callback_delete_device={callback2_delete_device}
            />
            <ButtonCRUD
              text="Update"
              imgSrc="https://upload.wikimedia.org/wikipedia/commons/6/62/Eo_circle_orange_repeat.svg"
              altText="IoT Device Update"
              data={Devices.iots[0]}
              callback_switch_status={callback_switch_status}
              callback_delete_device={callback2_delete_device}
            />
          </>
        )}

        <ButtonCRUD
          text="View"
          imgSrc={view}
          altText="IoT Device View"
          data={Devices}
          callback_view_device={handleSearchSubmit}
        />
        <Toast message={toast.message} type={toast.type} />
      </div>
      <div className="flex w-full h-2/3">
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
          congestionData={activeCongestions}
          container_height={container_height}
          container_width={container_width}
        />
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col w-[450px] h-[160px] bg-white shadow-lg ml-5 mb-6 p-2">
            <h2 className="text-2xl font-bold text-center">Status</h2>
            <h3 className="text-lg">
              <strong>Device ID: </strong>
              {selectedMarker && selectedMarker.type === "iot"
                ? selectedMarker.id
                : "N/A"}
            </h3>
            <h3 className="text-lg">
              <strong>Location: </strong>
              {selectedMarker && selectedMarker.type === "iot"
                ? `(${selectedMarker.latitude}, ${selectedMarker.longitude})`
                : "N/A"}
            </h3>
            <h3 className="text-lg">
              <strong>Address: </strong>
              {selectedMarker && selectedMarker.type === "iot"
                ? selectedMarker.address
                : "N/A"}
            </h3>
            <h3 className="text-lg">
              <strong>Status: </strong>
              {selectedMarker && selectedMarker.type === "iot"
                ? selectedMarker.status
                : "N/A"}
            </h3>
          </div>
          {selectedMarker && stationData ? (
            <CustomChart
              height={430}
              width={"100%"}
              type={"value"}
              predictedData={predictedAvg}
              data1Name={"flow"}
              data2Name={"speed"}
              allData1={stationData}
              allData2={stationData}
            />
          ) : (
            <div className="flex w-[450px] h-[655px] bg-white items-center justify-center rounded-lg shadow-xl text-xl shadow-blue-gray-900 mx-5 my-2">
              <h1 className="font-bold text-center">
                Click on a Marker to Show <br /> Station Flow and Speed
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
