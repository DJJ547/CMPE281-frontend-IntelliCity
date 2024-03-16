import { IoIosSettings } from "react-icons/io";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="flex justify-between max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold mr-4">
            IntelliCity
          </span>
        </div>
        <div className="flex items-center space-x-5">
          <button className="text-white focus:outline mx-2">
            <IoIosSettings className="h-6 w-6" />
          </button>
          <button className="text-white focus:outline mx-2">
            <PiBellSimpleRingingFill className="h-6 w-6" />
          </button>
          <button className="text-white focus:outline mx-2">
            <FaUser className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
