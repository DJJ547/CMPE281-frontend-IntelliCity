import React, { useState, useEffect } from "react";

export default function Notifications(props) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_DATA_SERVER_URL}notification/getNotifications/`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        setNotifications(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data initially
    fetchData();

    // Set up interval to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 10000);

    // Clean up interval
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="flex flex-col h-52 mb-5">
      <h1 className="w-auto text-center text-lg font-bold">Notifications:</h1>
      <div className="flex w-full h-80 bg-white text-md overflow-y-scroll shadow-xl shadow-blue-gray-900 ml-5 mb-7 p-2">
        <ul className="w-96 text-surface dark:text-white">
          {notifications
            .slice(0)
            .reverse()
            .map((notification) => (
              <li
                key={notification.notification_id}
                className="flex w-full border-b-2 border-neutral-300 py-2 dark:border-white/10"
                style={{ whiteSpace: 'nowrap' }} 
              >
                <p className="text-orange-700 font-bold">{notification.timestamp.replace(/[TZ]/g, ' ')}, </p>
                <p className="font-bold">{notification.source_type} </p>
                <p>#{notification.source_id} {notification.description} at: </p>
                <span className="font-bold underline underline-offset-2">({notification.latitude}, {notification.longitude})</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
