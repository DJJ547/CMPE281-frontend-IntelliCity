import React from "react";
import DonutChart from "./DonutChart";

export default function StatBox(props) {
  return (
    <div className={`flex ${props.size} bg-white justify-between items-center p-5 shadow-xl shadow-blue-gray-900`}>
      <div
        className={`flex flex-col w-24 h-24 justify-center items-center border text-white rounded-lg mr-3 ${props.backgroundColor}`}
      >
        <span className="material-symbols-outlined text-5xl">
          {props.imgKey}
        </span>
        <h1 className="font-bold text-lg">{props.name}</h1>
      </div>
      <div className="flex w-30 h-30 z-10">
        {props.name === 'Incidents' || props.name === 'Congestions' ? (
          <h1 className="text-3xl">{props.statNum}</h1>
        ) : (
          <DonutChart name={props.name} donutChartData={props.donutChartData} />
        )}
      </div>
    </div>
  );
}
