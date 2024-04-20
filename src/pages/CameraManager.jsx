import { React, useEffect, useState } from "react";
import Map from "../components/Map";
import ADD from "../medias/plus.png";
import view from "../medias/view.svg";
import PopupWindow from "../components/PopupWindow";

const container_height = "65vh";
const container_width = "55vw";

export default function Dashboard() {
  const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [Devices, setDevices] = useState({
    cameras: {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
      10: [],
      11: [],
      12: [],
    },
  });

  function ViewPopUp() {
    setShowPopup(true);
  }
  const callback = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/api/DisableDevice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ index: id }),
      });
      const data = await response.json();
      console.log("data", data);
      setUpdateUI(!updateUI);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/GetAllDevices", { method: "GET" });
        const data = await response.json();
  
        // Only update the state if the data has changed
        if (JSON.stringify(data) !== JSON.stringify(Devices)) {
          setDevices(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    fetchDevices();
  }, [updateUI]);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex mb-4 justify-between">
        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-out active:scale-90">
          <img
            src={ADD}
            alt="Camera"
            className="w-16 h-16 mr-2 shadow-sm p-2"
          />
          ADD
        </button>
        <button
          className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-out active:scale-90"
          onClick={ViewPopUp}
        >
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/5/5e/Flat_minus_icon_-_red.svg"
            }
            alt="Camera"
            className="w-16 h-16 mr-2 shadow-sm p-2"
          />
          Delete
        </button>
        <button
          className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-out active:scale-90"
          onClick={ViewPopUp}
        >
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/6/62/Eo_circle_orange_repeat.svg"
            }
            alt="Camera"
            className="w-16 h-16 mr-2 shadow-sm p-2"
          />
          Manage
        </button>

        <button className="flex items-center justify-center w-60 h-25 bg-white shadow-lg transform transition duration-500 ease-in-out active:scale-90">
          <img
            src={view}
            alt="Camera"
            className="w-16 h-16 mr-2 shadow-sm p-2"
          />
          View
        </button>
      </div>
      {showPopup && (
        <PopupWindow
          onClick={() => setShowPopup(false)}
          data={Devices.cameras[0]}
          callback={callback}
        />
      )}
      <div className="flex w-auto h-2/3">
        <Map
          deviceData={Devices}
          container_height={container_height}
          container_width={container_width}
        />
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
