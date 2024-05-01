import React, { useState } from "react";
import ConfirmationPopup from "./ConfirmationPopup";

export default function AddDevice(props) {
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
          <SearchBar callback4={props.callback4} />
          <SearchResultTable data={props.data} callback3={props.callback3}/>
        </div>
      </div>
    </div>
  );
}
function SearchBar(props) {
  const [searchquery, setSearchQuery] = useState("");
  function handlesearch() {
    props.callback4(searchquery);
  }
  return (
    <div className="flex justify-center mb-4">
      <input
        type="text"
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-60 rounded-lg text-sm focus:outline-none"
        placeholder="Search Available devices..."
        value={searchquery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyUp={handlesearch}
      />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Search
      </button>
    </div>
  );
}
function SearchResultTable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(props.data.length / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="overflow-auto">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">dist_id</th>
            <th className="px-4 py-2">latitude</th>
            <th className="px-4 py-2">longitude</th>
            <th className="px-4 py-2">address</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2 text-center">{item.id}</td>
              <td className="border px-4 py-2 text-center">{item.district}</td>
              <td className="border px-4 py-2 text-center">{item.latitude}</td>
              <td className="border px-4 py-2 text-center">{item.longitude}</td>
              <td className="border px-4 py-2 text-center">{item.address}</td>
              <td className="border px-4 py-2 text-center">
                <ConfirmationPopup
                  message="Are you sure to Deploy this device?"
                  onConfirm={() => props.callback3(item.id)}
                  buttonText="Deploy"
                />
              </td>
            </tr>
          ))}
        </tbody>
        <div>
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={() =>
                currentPage > 1 && handlePageChange(currentPage - 1)
              }
              className="h-8 px-4 text-blue-500 border-blue-500 border text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out mx-1"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <input
              type="number"
              min="1"
              max={totalPages}
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
              onKeyUp={(e) =>
                e.key === "Enter" && handlePageChange(Number(e.target.value))
              }
              className="h-8 w-8 text-center mx-1 border-blue-500 border text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out"
            />
            <button
              onClick={() =>
                currentPage < totalPages && handlePageChange(currentPage + 1)
              }
              className="h-8 px-4 text-blue-500 border-blue-500 border text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out mx-1"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
          <div className="flex items-center justify-center mt-4">
            Pages {currentPage} of {totalPages}
          </div>
        </div>
      </table>
    </div>
  );
}