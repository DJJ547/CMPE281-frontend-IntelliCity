import React, { useState, useEffect } from "react";
import DonutChart from "./DonutChart";

export default function StatBox(props) {
  return (
    <div className="flex w-60 h-36 bg-white justify-between items-center p-5 shadow-xl shadow-blue-gray-900">
      <div className="flex flex-col w-20 h-20 justify-center items-center">
        <img className="border border-gray-500" src={props.img} alt="device" />
        <h1 className="font-bold text-xl">{props.name}</h1>
      </div>
      <div className="flex w-30 h-30">
        <DonutChart name={props.name} donutChartData={props.donutChartData} />
      </div>
    </div>
  );
}
