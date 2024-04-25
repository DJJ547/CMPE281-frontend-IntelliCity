import React from "react";

export default function Notifications(props) {
  return (
    <div className="flex flex-col h-52 mb-5">
      <h1 className="w-auto text-center text-lg font-bold">Notifications:</h1>
      <div className="flex h-80 bg-white overflow-y-scroll shadow-xl shadow-blue-gray-900 ml-5 mb-7 p-2">
        <ul className="w-96 text-surface dark:text-white">
          <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
            An item
          </li>
          <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
            A second item
          </li>
          <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
            A third item
          </li>
          <li className="w-full border-b-2 border-neutral-100 py-2 dark:border-white/10">
            A fourth item
          </li>
          <li className="w-full py-4">And a fifth one</li>
        </ul>
      </div>
    </div>
  );
}
