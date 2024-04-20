import React, { useState } from "react";
import StatBox from "../components/dashboard/StatBox";
import WeatherBox from "../components/dashboard/WeatherBox";
import Map from "../components/Map";
import CustomChart from "../components/dashboard/CustomChart";
import allDevices from "../mockData/allDevices.json";
import allIncidents from "../mockData/allIncidents.json";
import allCongestions from "../mockData/allCongestions.json";

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
  const [selectLat, setSelectLat] = useState(null);
  const [selectLng, setSelectLng] = useState(null);

  const getMapCoordinates = (lat, lng) => {
    setSelectLat(lat);
    setSelectLng(lng);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex space-x-5 mb-2">
        <StatBox
          imgKey="photo_camera"
          name="Cameras"
          backgroundColor="bg-red-600"
          donutChartData={donutChartData}
        />
        <StatBox
          imgKey="sensors"
          name="Iots"
          backgroundColor="bg-red-600"
          donutChartData={donutChartData}
        />
        <StatBox
          imgKey="flight"
          name="Drones"
          backgroundColor="bg-red-600"
          donutChartData={donutChartData}
        />
        <StatBox
          imgKey="warning"
          name="Incidents"
          backgroundColor="bg-yellow-600"
          statNum="34"
        />
        <StatBox
          imgKey="warning"
          name="Congestions"
          backgroundColor="bg-blue-600"
          statNum="21"
        />
        <WeatherBox latState={selectLat} lngState={selectLng}/>
      </div>
      <div className="flex w-full h-2/3">
        <Map
          getMapCoordinates={getMapCoordinates}
          deviceData={allDevices}
          incidentData={allIncidents}
          congestionData={allCongestions}
          container_height={container_height}
          container_width={container_width}
        />
        <div className="flex flex-col w-full h-full">
          <h1 className="w-auto text-center text-lg font-bold">Notifications:</h1>
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
          <CustomChart incidents={allIncidents[0]} congestions={allCongestions[0]}/>
        </div>
      </div>
    </div>
  );
}
