import React from "react";
import { PieChart, Pie, Cell, Label } from "recharts";

//Below are the donut chart colors in order: green, red, grey
const COLORS = ["#008000", "#B22222", "#808080"];

export default function DonutChart(props) {
  let total = props.donutChartData[props.name][0]["value"] +
              props.donutChartData[props.name][1]["value"] +
              props.donutChartData[props.name][2]["value"]
  
  
  return (
      <PieChart width={100} height={100}>
        <Pie
          data={props.donutChartData[props.name]}
          // cx={120}
          // cy={200}
          innerRadius={35}
          outerRadius={45}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {/* <h1 className="text-xl font-bold">
            {props.donutChartData[0]["value"]}/
            {props.donutChartData[0]["value"] +
              props.donutChartData[1]["value"] +
              props.donutChartData[2]["value"]}
          </h1> */}
          <Label value={props.donutChartData[props.name][0]["value"] + "/" + total} position="centerBottom" fontSize="20px" />
          <Label value="active/total" position="centerTop" fontSize="14px" />
          {props.donutChartData[props.name].map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
  );
}
