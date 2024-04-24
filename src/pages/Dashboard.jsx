import React, { useState, useEffect } from "react";
import StatBox from "../components/dashboard/StatBox";
import WeatherBox from "../components/dashboard/WeatherBox";
import Map from "../components/Map";
import CustomChart from "../components/dashboard/CustomChart";
import allDevicesData from "../mockData/allDevices.json";
import allIncidents from "../mockData/allIncidents.json";
import allCongestions from "../mockData/allCongestions.json";
import { districts } from "../utils/mapDistrictCoordinates";

const container_height = "63vh";
const container_width = "50vw";

const donutChartData = {
  Cameras: [
    { name: "active", value: 45 },
    { name: "defective", value: 2 },
    { name: "active", value: 3 },
  ],
  Iots: [
    { name: "active", value: 75 },
    { name: "defective", value: 10 },
    { name: "active", value: 15 },
  ],
  Drones: [
    { name: "active", value: 9 },
    { name: "defective", value: 1 },
    { name: "active", value: 10 },
  ],
};

export default function Dashboard() {
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
  const updateMapZoomOnView = (zoom) => {
    setMapZoom(zoom);
  };

  //this is the map selected marker state
  const [selectedMarker, setSelectedMarker] = useState("");
  //this is the map selected marker call back function
  const updateSelectedMarker = (marker) => {
    setSelectedMarker(marker);
  };

  useEffect(() => {
    setAllDevices(allDevicesData);
  }, [mapCenterLat, mapCenterLng, mapZoom, selectedMarker]);
  //==============================================================

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

  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };

  const handleMapCenterLatChange = (e) => {
    setMapCenterLatInput(e.target.value);
  };

  const handleMapCenterLngChange = (e) => {
    setMapCenterLngInput(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setMapCenterLat(parseFloat(mapCenterLatInput));
    setMapCenterLng(parseFloat(mapCenterLngInput));
    console.log(mapCenterLatInput);
    console.log(mapCenterLngInput);
    console.log(typeof allDevices.all[0].latitude);
    let marker = allDevices.all[0].find(
      (device) =>
        parseFloat(device.latitude) === parseFloat(mapCenterLatInput) &&
        parseFloat(device.longitude) === parseFloat(mapCenterLngInput)
    );
    console.log(marker);
    setMapZoom(15);
    setSelectedMarker(marker);
    setSelectLat(mapCenterLatInput);
    setSelectLng(mapCenterLngInput);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between space-x-2 mb-2">
        <StatBox
          imgKey="photo_camera"
          name="Cameras"
          backgroundColor="bg-red-600"
          donutChartData={donutChartData}
          size="w-60 h-32"
        />
        <StatBox
          imgKey="sensors"
          name="Iots"
          backgroundColor="bg-red-600"
          donutChartData={donutChartData}
          size="w-60 h-32"
        />
        <StatBox
          imgKey="flight"
          name="Drones"
          backgroundColor="bg-red-600"
          donutChartData={donutChartData}
          size="w-60 h-32"
        />
        <StatBox
          imgKey="warning"
          name="Incidents"
          backgroundColor="bg-yellow-600"
          statNum="34"
          size="w-48 h-32"
        />
        <StatBox
          imgKey="warning"
          name="Congestion"
          backgroundColor="bg-blue-600"
          statNum="21"
          size="w-48 h-32"
        />
        <WeatherBox latState={selectLat} lngState={selectLng} />
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
          <h1 className="w-auto text-center text-lg font-bold">
            Notifications:
          </h1>
          <div className="flex h-80 bg-white overflow-y-scroll shadow-xl shadow-blue-gray-900 ml-5 mb-7 p-2">
            <ul className="w-96 text-surface dark:text-white">
              <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
                An item
              </li>
              <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
                A second item
              </li>
              <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
                A third item
              </li>
              <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
                A fourth item
              </li>
              <li className="w-full py-4">And a fifth one</li>
            </ul>
          </div>
          <CustomChart
            incidents={allIncidents[0]}
            congestions={allCongestions[0]}
          />
        </div>
      </div>
    </div>
  );
}
