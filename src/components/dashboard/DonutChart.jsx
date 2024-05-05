import React, { useState } from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

//Below are the donut chart colors in order: green, grey
const COLORS = ["#008000", "#808080"];

export default function DonutChart(props) {
  
  return (
      <PieChart width={100} height={100}>
        <Pie
          data={props.donutChartData[props.name]}
          innerRadius={40}
          outerRadius={50}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          <Label className="font-bold text-2xl" value={props.donutChartData[props.name][0].value + "/" + (props.donutChartData[props.name][0].value + props.donutChartData[props.name][1].value)} position="centerBottom" fontSize="20px" />
          <Label value="active/total" position="centerTop" fontSize="14px" />
          {props.donutChartData[props.name].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
  );
}
