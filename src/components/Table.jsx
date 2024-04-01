import React, { useState } from "react";
import Switch from "react-switch";

export default function Table(props) {

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.name}</td>
              <td className="border px-4 py-2 text-center">{item.location}</td>
              <td className="border px-4 py-2 text-center">
                {item.status}
                <Switch />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex space-x-5 justify-center m-3">
        <button className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">Confirm</button>
        <button className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
      </div>
    </div>
  );
}
