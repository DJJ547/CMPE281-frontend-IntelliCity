import { IoIosSettings } from "react-icons/io";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";

import ShiftingDropDown from "./ShiftingDropDown";

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="flex justify-between max-w-full mx-auto px-12">
        <div className="flex items-center">
          <span className="text-white text-2xl font-bold mr-4">
            IntelliCity
          </span>
        </div>
        <ShiftingDropDown />
      </div>
    </nav>
  );
}
