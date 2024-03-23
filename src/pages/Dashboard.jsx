import React from "react";
import StatBox from "../components/StatBox";
import Map from "../components/Map";
import Accordian, { AccordianItem } from "../components/Accordions";
import IotPic from "../medias/iotImage.png";
import CameraPic from "../medias/cameraImage.png";
import DronePic from "../medias/droneImage.png";
import IncidentPic from "../medias/incidentImage.png";
import mockData from "../mockData/allDeviceMockData.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const lineChartData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const donutChartData = {
  cameras: [
    {name: 'active', value: 45},
    {name: 'defective', value: 2},
    {name: 'active', value: 3}
  ],
  iots: [
    {name: 'active', value: 75},
    {name: 'defective', value: 10},
    {name: 'active', value: 15}
  ],
  drones: [
    {name: 'active', value: 9},
    {name: 'defective', value: 1},
    {name: 'active', value: 10}
  ],
};

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex space-x-5 mb-4">
        <StatBox img={CameraPic} name="cameras" donutChartData={donutChartData} />
        <StatBox img={IotPic} name="iots" donutChartData={donutChartData} />
        <StatBox img={DronePic} name="drones" donutChartData={donutChartData} />
        {/* <DisplayBox img={ IncidentPic } /> */}
      </div>
      <div className="flex w-auto h-2/3">
        <Map data={mockData} />
        <div className="flex ml-5">
          <Accordian className="">
            <AccordianItem value="1" trigger="Graph 1">
              <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </AccordianItem>
            <AccordianItem value="2" trigger="Graph 2">
              <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </AccordianItem>
            <AccordianItem value="3" trigger="Graph 3">
              <LineChart
                width={500}
                height={300}
                data={lineChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </AccordianItem>
          </Accordian>
        </div>
      </div>
    </div>
  );
}
