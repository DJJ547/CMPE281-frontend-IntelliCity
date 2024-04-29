import React, { useState } from "react";
import VideoPlayerDrone from "./VideoPlayerDrone";


export default function StreamingDrone(props) {
    //const [selectedTab, setSelectedTab] = useState("liveStream");
  return (
    <div className="flex flex-col bg-white shadow-lg">
      <div className="flex justify-center">
        <VideoPlayerDrone droneId={props.droneId} />
      </div>
    </div>
  );
}
   