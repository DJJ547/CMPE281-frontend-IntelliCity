import React from "react";
import Table from "./Table";

export default function PopupWindow(props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white rounded-lg w-3/5 h-auto">
        <button
          onClick={props.onClick}
          className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-800 text-3xl font-bold focus:outline-none border-none border"
        >
          &times;
        </button>
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Devices</h1>
          <Table data={props.data} callback={props.callback} callback2={props.callback2} />
        </div>
      </div>
    </div>
  );
}
