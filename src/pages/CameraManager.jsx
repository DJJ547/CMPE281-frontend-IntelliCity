import React from "react";
import Map from "../components/Map";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import allCameras from "../mockData/allCameras.json";

const container_height = "65vh";
const container_width = "55vw";

export default function Dashboard() {
  function addDevice() {
    console.log("Add device");
  }
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-4 justify-between">
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-out active:scale-90" onClick={addDevice}>
          <img src={ADD} alt="Camera" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          ADD
        </button>
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg">
          <img src={'https://upload.wikimedia.org/wikipedia/commons/5/5e/Flat_minus_icon_-_red.svg'} alt="Camera" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          Delete
        </button>

        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg">
          <img src={'https://upload.wikimedia.org/wikipedia/commons/6/62/Eo_circle_orange_repeat.svg'} alt="Camera" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          Update
        </button>

        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg">
          <img src={view} alt="Camera" className="w-16 h-16 mr-2 shadow-sm p-2"/>
          View
        </button>

      </div>
      <div className="flex w-auto h-2/3">
        <Map deviceData={allCameras} container_height={container_height} container_width={container_width}/>
        <div className="flex ml-5">
          <div className="flex flex-col w-96 h-96 bg-white shadow-lg">
            <div className="flex justify-between p-2">
              <h2 className="text-lg font-bold">Status</h2>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
