import React, { useState, useEffect } from "react";
import StatBox from "../components/dashboard/StatBox";
import WeatherBox from "../components/dashboard/WeatherBox";
import Map from "../components/Map";
import CustomChart from "../components/dashboard/CustomChart";
// import Notifications from "../components/Notifications";
// import allDevicesData from "../mockData/allDevices.json";
// import allIncidents from "../mockData/allIncidents.json";
// import allCongestions from "../mockData/allCongestions.json";
import { districts } from "../utils/mapDistrictCoordinates";

const container_height = "63vh";
const container_width = "50vw";

export default function Dashboard() {
  const [mapCenterLatInput, setMapCenterLatInput] = useState("");
  const [mapCenterLngInput, setMapCenterLngInput] = useState("");

  const [allDevices, setAllDevices] = useState({
    all: {
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

  const [allIncidents, setAllIncidents] = useState({
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

  const [numOfIncidents, setNumOfIncidents] = useState(0);
  const [numOfCongestions, setNumOfCongestions] = useState(0);

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

  //return map component selected marker coodinates
  const [selectLat, setSelectLat] = useState(null);
  const [selectLng, setSelectLng] = useState(null);

  const [statData, setStatData] = useState({
    Cameras: [
      { name: "active", value: 0 },
      { name: "inactive", value: 0 },
    ],
    Iots: [
      { name: "active", value: 0 },
      { name: "inactive", value: 0 },
    ],
    Drones: [
      { name: "active", value: 0 },
      { name: "inactive", value: 0 },
    ],
    Incidents: 0,
    Congestions: 0,
  });

  const processStatData = (allDevices) => {
    let processed_data = {
      Cameras: [
        { name: "active", value: 0 },
        { name: "inactive", value: 0 },
      ],
      Iots: [
        { name: "active", value: 0 },
        { name: "inactive", value: 0 },
      ],
      Drones: [
        { name: "active", value: 0 },
        { name: "inactive", value: 0 },
      ],
      Incidents: 0,
      Congestions: 0,
    };
    allDevices.all[0].forEach((device) => {
      if (device.status === "active" && device.type === "camera") {
        processed_data.Cameras[0].value += 1;
      } else if (device.status === "inactive" && device.type === "camera") {
        processed_data.Cameras[1].value += 1;
      } else if (device.status === "active" && device.type === "iot") {
        processed_data.Iots[0].value += 1;
      } else if (device.status === "inactive" && device.type === "iot") {
        processed_data.Iots[1].value += 1;
      } else if (device.status === "active" && device.type === "drone") {
        processed_data.Drones[0].value += 1;
      } else if (device.status === "inactive" && device.type === "drone") {
        processed_data.Drones[1].value += 1;
      }
    });
    return processed_data;
  };

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

  //request to get all data include devices, incidents and congestions
  useEffect(() => {
    // Fetch all data initially and every 10 minute
    const fetchAllData = () => {
      fetch(
        `${process.env.REACT_APP_MAIN_SERVER_LOCALHOST_URL}dashboard/getAllDevices/`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad request");
          }
          return response.json();
        })
        .then((data) => {
          setAllDevices(data.devices);
          setStatData(processStatData(data.devices));
        })
        .catch((error) => {
          console.error("Failed to fetch devices:", error);
        });
    };
    const allDataInterval = setInterval(fetchAllData, 600000);

    // Fetch additional incidents every 1 minute
    const fetchAllIncidents = () => {
      fetch(
        `${process.env.REACT_APP_MAIN_SERVER_LOCALHOST_URL}dashboard/getAllIncidents/`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad request");
          }
          return response.json();
        })
        .then((data) => {
          setAllIncidents(data.incidents);
          setNumOfIncidents(data.incidents["0"].length);
        })
        .catch((error) => console.error("Failed to fetch incidents:", error));
    };
    const incidentsInterval = setInterval(fetchAllIncidents, 60000);

    // Fetch congestion data every 5 minutes
    const fetchAllCongestions = () => {
      fetch(
        `${process.env.REACT_APP_MAIN_SERVER_LOCALHOST_URL}dashboard/getAllCongestions/`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Bad request");
          }
          return response.json();
        })
        .then((data) => {
          setAllCongestions(data.congestions);
          setNumOfCongestions(data.congestions["0"].length)
        })
        .catch((error) => console.error("Failed to fetch congestions:", error));
    };
    const congestionsInterval = setInterval(fetchAllCongestions, 300000);

    fetchAllData()
    fetchAllIncidents()
    fetchAllCongestions()

    // Cleanup function to clear intervals when the component unmounts or dependencies change
    return () => {
      clearInterval(allDataInterval);
      clearInterval(incidentsInterval);
      clearInterval(congestionsInterval);
    };
  }, []);

  // //request to backend for updating mysql incidents table every minute
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const now = new Date();
  //       const currentTime = `${now.getFullYear()}-${(now.getMonth() + 1)
  //         .toString()
  //         .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}T${now
  //         .getHours()
  //         .toString()
  //         .padStart(2, "0")}:${now
  //         .getMinutes()
  //         .toString()
  //         .padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
  //       const response = await fetch(
  //         `${process.env.REACT_APP_DATA_SERVER_URL}dashboard/updateIncidents/`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ currentTime }),
  //         }
  //       );
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       const data = await response.json();
  //       // Handle response data as needed
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   // Fetch data initially
  //   fetchData();

  //   // Set up interval to fetch data every 1 minute
  //   const intervalId = setInterval(fetchData, 60000);

  //   // Clean up interval
  //   return () => clearInterval(intervalId);
  // }, []);

  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };

  // const handleMapCenterLatChange = (e) => {
  //   setMapCenterLatInput(e.target.value);
  // };

  // const handleMapCenterLngChange = (e) => {
  //   setMapCenterLngInput(e.target.value);
  // };

  // const handleSearchSubmit = async (e) => {
  //   e.preventDefault();
  //   setMapCenterLat(parseFloat(mapCenterLatInput));
  //   setMapCenterLng(parseFloat(mapCenterLngInput));
  //   console.log(mapCenterLatInput);
  //   console.log(mapCenterLngInput);
  //   console.log(typeof allDevices.all[0].latitude);
  //   let marker = allDevices.all[0].find(
  //     (device) =>
  //       parseFloat(device.latitude) === parseFloat(mapCenterLatInput) &&
  //       parseFloat(device.longitude) === parseFloat(mapCenterLngInput)
  //   );
  //   setMapZoom(15);
  //   setSelectedMarker(marker);
  //   setSelectLat(mapCenterLatInput);
  //   setSelectLng(mapCenterLngInput);
  // };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between space-x-2 mb-2">
        <StatBox
          imgKey="photo_camera"
          name="Cameras"
          backgroundColor="bg-red-600"
          donutChartData={statData}
          size="w-64 h-36"
        />
        <StatBox
          imgKey="sensors"
          name="Iots"
          backgroundColor="bg-red-600"
          donutChartData={statData}
          size="w-64 h-36"
        />
        <StatBox
          imgKey="flight"
          name="Drones"
          backgroundColor="bg-red-600"
          donutChartData={statData}
          size="w-64 h-36"
        />
        <StatBox
          imgKey="warning"
          name="Incidents"
          displayNumber={numOfIncidents}
          backgroundColor="bg-yellow-600"
          statNum="34"
          size="w-64 h-36"
        />
        <StatBox
          imgKey="warning"
          name="Congestions"
          displayNumber={numOfCongestions}
          backgroundColor="bg-blue-600"
          statNum="21"
          size="w-64 h-36"
        />
      </div>
      {/* <div className="flex">
        <form onSubmit={handleSearchSubmit}>
          <label>
            Latitude:
            <input
              type="text"
              value={mapCenterLatInput}
              onChange={handleMapCenterLatChange}
              placeholder="Enter latitude"
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              value={mapCenterLngInput}
              onChange={handleMapCenterLngChange}
              placeholder="Enter longitude"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div> */}
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
          deviceData={allDevices}
          incidentData={allIncidents}
          congestionData={allCongestions}
          container_height={container_height}
          container_width={container_width}
        />
        <div className="flex flex-col w-full h-full">
          {/* <Notifications /> */}
          <WeatherBox latState={selectLat} lngState={selectLng} />
          <CustomChart
            incidents={allIncidents[0]}
            congestions={allCongestions[0]}
          />
        </div>
      </div>
    </div>
  );
}
