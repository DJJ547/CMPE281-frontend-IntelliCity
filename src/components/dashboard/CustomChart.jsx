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
  const handleChartTypeChange = (e) => {
    setSelectChartType(e.target.value);
  };

  // Function to categorize incidents by hour
  const reformatData = () => {
    const now = new Date(); // Get current date and time
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    ); // Set time to 00:00:00 for the current day

    // Initialize counts for all hours with 0 incidents
    const combinedData = Array.from({ length: 24 }, (_, hour) => {
      const hourStart = new Date(startOfDay.getTime() + hour * 3600000); // Calculate the start time of each hour
      const hourEnd = new Date(startOfDay.getTime() + (hour + 1) * 3600000); // Calculate the end time of each hour
      return {
        hour: `${hourStart.getHours()}:00 - ${hourEnd.getHours()}:00`,
        congestions: 0,
        incidents: 0,
      };
    });
    props.incidents.forEach((incident) => {
      const incident_date = new Date(incident.timestamp);
      if (incident_date.getDate === now.getDate) {
        const hour = incident_date.getHours();
        combinedData[(hour + 7) % 24].incidents += 1;
      }
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
        {parseInt(selectChartType) === 1 ? (
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
            <Bar dataKey="incidents" fill="#B8860B" />
          </BarChart>
        ) : parseInt(selectChartType) === 2 ? (
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
