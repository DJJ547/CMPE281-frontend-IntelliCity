import React from 'react';
import Table from './Table';

export default function PopupWindow(props) {

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white rounded-lg w-1/2 h-auto">
            <button onClick={props.onClick} className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-800">
              &times;
            </button>
            <div className="p-8">
              <Table data={props.data} />
            </div>
          </div>
        </div>
  );
}