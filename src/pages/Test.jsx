import React, { useState } from 'react';
import PopupWindow from '../components/PopupWindow';
import Table from '../components/Table'

export default function Test() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const toggleAdd = () => {
    setIsAddOpen(!isAddOpen);
  };
  const toggleManage = () => {
    setIsManageOpen(!isManageOpen);
  };
  const toggleUpdate = () => {
    setIsUpdateOpen(!isUpdateOpen);
  };
  const toggleView = () => {
    setIsViewOpen(!isViewOpen);
  };

  const data = [
    { id: 'aslk123', name: 'I280 device', location: '(3.2, 1.4)', status: 'active'},
    { id: 'sdafa687', name: 'I101 device', location: '(2.2, 3.4)', status: 'active'},
    { id: 'asdadv123', name: 'I48 device', location: '(4.1, 1.8)', status: 'defective'},
    { id: 'hgd234', name: 'I1 device', location: '(3.9, 5.4)', status: 'disabled'},
  ];

  return (
    <div className="relative space-x-5">
      <button onClick={toggleAdd} className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Add
      </button>
      <button onClick={toggleManage} className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Manage
      </button>
      <button onClick={toggleUpdate} className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">
        Update
      </button>
      <button onClick={toggleView} className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded">
        View
      </button>
      {isAddOpen && (
        <PopupWindow onClick={toggleAdd} data={data} />
      )}
      {isManageOpen && (
        <PopupWindow onClick={toggleManage} data={data}/>
      )}
      {isUpdateOpen && (
        <PopupWindow onClick={toggleUpdate} data={data}/>
      )}
      {isViewOpen && (
        <PopupWindow onClick={toggleView} data={data}/>
      )}
    </div>
  );
}
