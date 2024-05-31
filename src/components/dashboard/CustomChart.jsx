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
  ReferenceLine,
} from "recharts";

const losAngelesOffset = 420;

export default function CustomChart(props) {
  let arrayName1 = props.data1Name + "Array";
  let arrayName2 = props.data2Name + "Array";

  let data1MaxY = 0;
  let data2MaxY = 0;
  const [selectChartType, setSelectChartType] = useState(1);
  const [selectedData, setSelectedData] = useState("data1"); // Track selected data
  const handleChartTypeChange = (e) => {
    setSelectChartType(parseInt(e.target.value));
  };

  const handleDataChange = (e) => {
    setSelectedData(e.target.value);
  };

  const reformatData = () => {
    const now = new Date();
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
      let output = {};
      output["hour"] = `${hourStart.getHours()}:00 - ${hourEnd.getHours()}:00`;
      if (props.type === "occurence") {
        output[props.data1Name] = 0;
        output[props.data2Name] = 0;
      } else if (props.type === "value") {
        output[props.data1Name] = 0;
        output[props.data2Name] = 0;
        output[arrayName1] = [];
        output[arrayName2] = [];
      }
      return output;
    });
    if (props.type === "occurence") {
      props.allData1.forEach((dt1) => {
        const data1Date = new Date(dt1.timestamp);
        const parsedData1Date = new Date(
          data1Date.getTime() + losAngelesOffset * 60000
        );
        if (parsedData1Date.getDate() === now.getDate()) {
          const hour = parsedData1Date.getHours();
          combinedData[hour % 24][props.data1Name] += 1;
          data1MaxY = Math.max(
            combinedData[hour % 24][props.data1Name],
            data1MaxY
          );
        }
      });
      props.allData2.forEach((dt2) => {
        const data2Date = new Date(dt2.timestamp);
        const parsedData2Date = new Date(
          data2Date.getTime() + losAngelesOffset * 60000
        );
        if (parsedData2Date.getDate() === now.getDate()) {
          const hour = parsedData2Date.getHours();
          combinedData[hour % 24][props.data2Name] += 1;
          data2MaxY = Math.max(
            combinedData[hour % 24][props.data2Name],
            data2MaxY
          );
        }
      });
    } else if (props.type === "value") {
      props.allData1.forEach((dt1) => {
        const data1Date = new Date(dt1.timestamp);
        const parsedData1Date = new Date(
          data1Date.getTime() + losAngelesOffset * 60000
        );
        if (parsedData1Date.getDate() === now.getDate()) {
          const hour = parsedData1Date.getHours();
          combinedData[hour % 24][arrayName1].push(dt1[props.data1Name]);
        }
      });
      combinedData.forEach((dt1) => {
        let sum = 0;
        for (let i = 0; i < dt1[arrayName1].length; i++) {
          sum += dt1[arrayName1][i];
        }
        const average = sum / dt1[arrayName1].length;
        dt1[props.data1Name] = average.toFixed(2);
        if (!isNaN(dt1[props.data1Name])) {
          data1MaxY = Math.max(dt1[props.data1Name], data1MaxY);
        }
      });

      props.allData2.forEach((dt2) => {
        const data2Date = new Date(dt2.timestamp);
        const parsedData2Date = new Date(
          data2Date.getTime() + losAngelesOffset * 60000
        );
        if (parsedData2Date.getDate() === now.getDate()) {
          const hour = parsedData2Date.getHours();
          combinedData[hour % 24][arrayName2].push(dt2[props.data2Name]);
        }
      });
      combinedData.forEach((dt2) => {
        let sum = 0;
        for (let i = 0; i < dt2[arrayName2].length; i++) {
          sum += dt2[arrayName2][i];
        }
        const average = sum / dt2[arrayName2].length;
        dt2[props.data2Name] = average.toFixed(2);
        if (!isNaN(dt2[props.data2Name])) {
          data2MaxY = Math.max(dt2[props.data2Name], data2MaxY);
        }
      });
    }
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
          <option value="data1">{props.data1Name}</option>
          <option value="data2">{props.data2Name}</option>
        </select>
      </div>
      <ResponsiveContainer width={props.width} height={props.height}>
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
              domain={
                selectedData === "data1"
                  ? [0, data1MaxY + 10]
                  : [0, data2MaxY + 10]
              }
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={
                selectedData === "data1" ? props.data1Name : props.data2Name
              }
              fill={selectedData === "data1" ? "#B8860B" : "#1E90FF"}
            />
            {props.predictedData && (
              <ReferenceLine
                y={
                  selectedData === "data1"
                    ? props.predictedData[1]
                    : props.predictedData[0]
                }
                stroke="red"
                label={{
                  value:
                    selectedData === "data1"
                      ? "predicted " + props.data1Name
                      : "predicted " + props.data2Name,
                  position: "insideTopRight", // Adjust the position of the label
                  fill: "red", // Adjust the color of the label
                  style: { fontWeight: "bold" }
                }}
              />
            )}
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
              domain={
                selectedData === "data1"
                  ? [0, data1MaxY + 10]
                  : [0, data2MaxY + 10]
              }
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={
                selectedData === "data1" ? props.data1Name : props.data2Name
              }
              stroke={selectedData === "data1" ? "#B8860B" : "#1E90FF"}
              fill={selectedData === "data1" ? "#B8860B" : "#1E90FF"}
            />
            {props.predictedData && (
              <ReferenceLine
                y={
                  selectedData === "data1"
                    ? props.predictedData[1]
                    : props.predictedData[0]
                }
                stroke="red"
                label={{
                  value:
                    selectedData === "data1"
                      ? "predicted " + props.data1Name
                      : "predicted " + props.data2Name,
                  position: "insideTopRight", // Adjust the position of the label
                  fill: "red", // Adjust the color of the label
                  style: { fontWeight: "bold" }
                }}
              />
            )}
          </LineChart>
        ) : (
          <></>
        )}
      </ResponsiveContainer>
    </div>
  );
}
