import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Chart(props) {
  const [selectChartType, setSelectChartType] = useState(1);
  // const [selectDataType, setSelectDataType] = useState(3);
  const handleChartTypeChange = (e) => {
    setSelectChartType(e.target.value);
  };
  // const handleDataTypeChange = (e) => {
  //   setSelectDataType(e.target.value);
  // };

  // Function to categorize incidents by hour
  const reformatData = () => {
    // Initialize counts for all hours with 0 incidents
    const combinedData = Array.from({ length: 24 }, (_, hour) => ({
      hour: `${hour}:00 - ${parseInt(hour) + 1}:00`,
      congestions: 0,
      incidents: 0,
    }));
    props.incidents.forEach((incident) => {
      const hour = new Date(incident.timestamp).getHours();
      combinedData[hour].incidents += 1;
    });
    props.congestions.forEach((congestion) => {
      const hour = new Date(congestion.timestamp).getHours();
      combinedData[hour].congestions += 1;
    });
    return combinedData;
  };

  return (
    <div className="flex flex-col w-auto h-auto bg-white shadow-xl shadow-blue-gray-900 mx-5 my-2">
      <div className="flex space-x-2 ml-5">
        <label className="font-bold" htmlFor="chartType">
          Select Chart Type:
        </label>
        <select
          className="bg-gray-300"
          id="chartType"
          value={selectChartType}
          onChange={handleChartTypeChange}
        >
          <option key={1} value={1}>
            Bar chart
          </option>
          <option key={2} value={2}>
            Line chart
          </option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={370}>
        {selectChartType == 1 ? (
          <BarChart data={reformatData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{ value: "Time", position: "bottom", offset: -8 }}
            />
            <YAxis
              interval={1}
              label={{ value: "Occurrence", angle: -90, position: "middle" }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="congestions" fill="#0000CD" />
            <Bar dataKey="incidents" fill="#B8860B" />
          </BarChart>
        ) : selectChartType == 2 ? (
          <LineChart
            data={reformatData()}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{ value: "Time", position: "bottom", offset: -8 }}
            />
            <YAxis
              interval={1}
              label={{ value: "Occurrence", angle: -90, position: "middle" }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="congestions"
              stroke="#0000CD"
              fill="#0000CD"
            />
            <Line
              type="monotone"
              dataKey="incidents"
              stroke="#B8860B"
              fill="#B8860B"
            />
          </LineChart>
        ) : (
          <></>
        )}
      </ResponsiveContainer>
    </div>
  );
}
