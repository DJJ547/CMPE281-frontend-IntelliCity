import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";


export default function Streaming(props) {
    const [selectedTab, setSelectedTab] = useState("liveStream");
  return (
    <div>
        <div className="flex justify-between p-2">
            <button
              onClick={() => setSelectedTab("capture")}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-1/2 mr-3"
            >
              Capture
            </button>
            <button
              onClick={() => setSelectedTab("liveStream")}
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow w-1/2 w-1/2"
            >
              Live Stream
            </button>
          </div>
          {selectedTab === "capture" && (
            <div className="flex flex-col w-96 h-96 bg-white shadow-lg mb-6">
              <div className="flex justify-center">
                <img src={props.screenshot} alt="screenshot" className="w-96 h-96" />
              </div>
            </div>
          )}
          {selectedTab === "liveStream" && (
            <div className="flex flex-col bg-white shadow-lg">
              <div className="flex justify-center">
                <VideoPlayer url={props.videoUrl} latitude={props.latitude} longitude={props.longitude} />
              </div>
            </div>
          )}
    </div>
  );
}