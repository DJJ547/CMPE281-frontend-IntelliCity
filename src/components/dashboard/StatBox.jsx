import React from "react";
import DonutChart from "./DonutChart";

export default function StatBox(props) {
  return (
    <div className="flex w-64 h-36 bg-white justify-between items-center p-5 shadow-xl shadow-blue-gray-900">
      {/* {`flex flex-col w-32 h-24 justify-center items-center border text-white rounded-lg mr-3 ${props.backgroundColor}`} */}
      <div
        className={`flex flex-col w-28 h-28 justify-center items-center border text-white rounded-lg mr-3 ${props.backgroundColor}`}
      >
        <span className="material-symbols-outlined text-5xl">
          {props.imgKey}
        </span>
        <h1 className="font-bold text-lg">{props.name}</h1>
      </div>
      <div className="flex w-30 h-30 z-10">
        {props.donutChartData ? (
          <DonutChart name={props.name} donutChartData={props.donutChartData} />
        ) : (
          <h1 className="text-3xl">{props.statNum}</h1>
        )}
      </div>
    </div>
  );
}
