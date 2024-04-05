import ShiftingDropDown from "./ShiftingDropDown";
import LoginIcon from "../../medias/auth/authIcon.png";

export default function Sidebar() {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="flex justify-between max-w-full mx-auto px-12">
        <a href="/" className="flex items-center space-x-2">
          <img src={LoginIcon} alt="icon" />
          <span className="text-white text-2xl font-bold mr-4">
            IntelliCity
          </span>
        </a>
        <ShiftingDropDown />
      </div>
    </nav>
  );
}
