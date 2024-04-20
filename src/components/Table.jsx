import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import ConfirmationPopup from "../components/confirmationPopup";

export default function Table(props) {
  // State to manage the checked state of the switch
  const [checked, setChecked] = useState(
    props.data.map((item) => {
      if (item.status == "active") {
        return true;
      } else {
        return false;
      }
    })
  );

  // Function to handle switch state change
  const handleChange = (id, index, newStatus) => {
    setChecked((prevChecked) => {
      const newChecked = [...prevChecked];
      newChecked[index] = newStatus;
      return newChecked;
    });
    props.callback(id);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">dist_id</th>
            <th className="px-4 py-2">latitude</th>
            <th className="px-4 py-2">longitude</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.dist_id}</td>
              <td className="border px-4 py-2 text-center">{item.latitude}</td>
              <td className="border px-4 py-2 text-center">{item.longitude}</td>
              <td className="border px-4 py-2 text-center">
                <Switch
                  checked={checked[index]} // Specify the current state of the switch
                  onChange={() => handleChange(item.id, index, !checked[index])} // Handle switch state change
                />
              </td>
              {/* <td className="border px-4 py-2 text-center">
                <button
                  type="button"
                  onClick={() => props.callback2(item.id)}
                  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td> */}
              <td className="border px-4 py-2 text-center">
                <ConfirmationPopup message="Are you sure to delete this device?" onConfirm={() => props.callback2(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="flex space-x-5 justify-center m-3">
        <button className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Confirm
        </button>
        <button className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Cancel
        </button>
      </div> */}
    </div>
  );
}
