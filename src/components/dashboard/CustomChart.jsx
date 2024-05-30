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

const losAngelesOffset = 420; 

export default function CustomChart(props) {
  const [selectChartType, setSelectChartType] = useState(1);
  const [selectedData, setSelectedData] = useState("data1"); // Track selected data
  const handleChartTypeChange = (e) => {
    setSelectChartType(parseInt(e.target.value));
  };

  const handleDataChange = (e) => {
    setSelectedData(e.target.value);
  };

  const reformatData = (data) => {
    const now = new Date();
    // const options = {timeZone: 'America/Los_Angeles'};
    // const time_str = time.toLocaleString('en-US', options);
    // console.log(time_str)
    // const now = new Date(time_str);
    // console.log(now)
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0,
      0,
      0
    );
    const combinedData = Array.from({ length: 24 }, (_, hour) => {
      const hourStart = new Date(startOfDay.getTime() + hour * 3600000);
      const hourEnd = new Date(startOfDay.getTime() + (hour + 1) * 3600000);
      let output = {}
      output["hour"] = `${hourStart.getHours()}:00 - ${hourEnd.getHours()}:00`
      output[props.data1Name] = 0
      output[props.data2Name] = 0
      return output;
    });
    props.allData1.forEach((dt1) => {
      const data1Date = new Date(dt1.timestamp);
      const parsedData1Date = new Date(data1Date.getTime() + (losAngelesOffset * 60000))
      if (parsedData1Date.getDate() === now.getDate()) {
        const hour = parsedData1Date.getHours();
        combinedData[(hour) % 24][props.data1Name] += 1;
      }
    });
    props.allData2.forEach((dt2) => {
      const data2Date = new Date(dt2.timestamp);
      console.log()
      const parsedData2Date = new Date(data2Date.getTime() + (losAngelesOffset * 60000))
      if (parsedData2Date.getDate() === now.getDate()) {
        const hour = parsedData2Date.getHours();
        combinedData[(hour) % 24][props.data2Name] += 1;
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
        <label className="font-bold" htmlFor="dataSelect">
          Select Data:
        </label>
        <select
          className="bg-gray-300"
          id="dataSelect"
          value={selectedData}
          onChange={handleDataChange}
        >
          <option value="data1">Data 1</option>
          <option value="data2">Data 2</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={370}>
        {selectChartType === 1 ? (
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
            <Bar dataKey={selectedData === "data1" ? props.data1Name : props.data2Name} fill={selectedData === "data1" ? "#B8860B" : "#0000FF"} />
          </BarChart>
        ) : selectChartType === 2 ? (
          <LineChart
            data={reformatData()}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              dataKey={selectedData === "data1" ? props.data1Name : props.data2Name}
              stroke={selectedData === "data1" ? "#B8860B" : "#0000FF"}
              fill={selectedData === "data1" ? "#B8860B" : "#0000FF"}
            />
          </LineChart>
        ) : (
          <></>
        )}
      </ResponsiveContainer>
    </div>
  );
}