// import React, { useState, useEffect } from "react";

// export default function Test() {
// //   const [text, setText] = useState('')
//   //send a GET request to backend server
// //   useEffect(() => {
// //     fetch(`${process.env.REACT_APP_API_URL}test`)
// //       .then((response) => response.json())
// //       .then((data) => {
// //         console.log(data);
// //         setText(data)
// //       })
// //       .catch((err) => {
// //         console.log(err.message);
// //       });
// //   }, []);

//   return (
//   <div className="">
//     <h1>test</h1>
//   </div>
//   );
// }

import React from "react";
import { PieChart, Pie, Sector, Cell, Label } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function Graph() {
  return (
    <PieChart width={400} height={400}>
      <Pie
        data={data}
        cx={120}
        cy={200}
        innerRadius={35}
        outerRadius={45}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        <Label 
       value="6" position="centerBottom" fontSize='27px'
       />
       <Label 
       value="tasks left" position="centerTop"
       />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
