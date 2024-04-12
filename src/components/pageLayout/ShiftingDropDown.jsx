import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiChevronDown,
} from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";
import { PiBellSimpleRingingFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import ProfilePic from "../../medias/profilePic.jpeg";

export default function ShiftingDropDown() {
  return <Tabs />;
}

function logout() {
  localStorage.clear();
  window.location.href = "/auth/login";
}

const Tabs = () => {
  const [selected, setSelected] = useState(null);
  const [dir, setDir] = useState(null);

  const handleSetSelected = (val) => {
    if (typeof selected === "number" && typeof val === "number") {
      setDir(selected > val ? "r" : "l");
    } else if (val === null) {
      setDir(null);
    }

    setSelected(val);
  };

  return (
    <div
      onMouseLeave={() => handleSetSelected(null)}
      className="relative flex h-fit gap-2 z-20"
    >
      {TABS.map((t, i) => {
        return (
          <Tab
            key={t.id}
            selected={selected}
            handleSetSelected={handleSetSelected}
            tab={t.id}
          >
            {t.icon}
          </Tab>
        );
      })}

      <AnimatePresence>
        {selected && <Content dir={dir} selected={selected} />}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ children, tab, handleSetSelected, selected }) => {
  return (
    <button
      id={`shift-tab-${tab}`}
      onMouseEnter={() => handleSetSelected(tab)}
      onClick={() => handleSetSelected(tab)}
      className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${
        selected === tab ? " bg-gray-500 text-neutral-100" : "text-neutral-400"
      }`}
    >
      <span>{children}</span>
      <FiChevronDown
        className={`transition-transform ${
          selected === tab ? "rotate-180" : ""
        }`}
      />
    </button>
  );
};

const Content = ({ selected, dir }) => {
  return (
    <motion.div
      id="overlay-content"
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      className="absolute left-0 top-[calc(100%_+_24px)] w-64 rounded-lg border border-neutral-600 bg-gradient-to-b from-gray-700 via-gray-700 to-gray-600 p-4"
    >
      <Bridge />
      <Nub selected={selected} />

      {TABS.map((t) => {
        return (
          <div className="overflow-hidden" key={t.id}>
            {selected === t.id && (
              <motion.div
                initial={{
                  opacity: 0,
                  x: dir === "l" ? 100 : dir === "r" ? -100 : 0,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <t.Component />
              </motion.div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
};

const Bridge = () => (
  <div className="absolute -top-[24px] left-0 right-0 h-[24px]" />
);

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    moveNub();
  }, [selected]);

  const moveNub = () => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected}`);
      const overlayContent = document.getElementById("overlay-content");

      if (!hoveredTab || !overlayContent) return;

      const tabRect = hoveredTab.getBoundingClientRect();
      const { left: contentLeft } = overlayContent.getBoundingClientRect();

      const tabCenter = tabRect.left + tabRect.width / 2 - contentLeft;

      setLeft(tabCenter);
    }
  };

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

const Settings = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 divide-y divide-gray-400">
        <h3 className="mb-2 text-md font-medium text-white">Settings</h3>
        <a href="#" className="block text-sm text-white">
          Edit Profile
        </a>
        <a href="#" className="block text-sm text-white">
          Change Password
        </a>
        <a href="#" className="block text-sm text-white">
          Manage Notification
        </a>
      </div>
    </div>
  );
};

const Notifications = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 divide-y divide-gray-400">
        <h3 className="mb-2 text-md font-medium text-white">Notifications</h3>
        <h1 className="block text-sm text-white">
          Congestion Detected
          <span className="block text-neutral-400"> 5 mins ago</span>
        </h1>
        <h1 className="block text-sm text-white">
          Drone#3 Activated
          <span className="block text-neutral-400"> 8 mins ago</span>
        </h1>
        <h1 className="block text-sm text-white">
          Incident Detected
          <span className="block text-neutral-400"> 30 mins ago</span>
        </h1>
      </div>

      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const Profile = () => {
  return (
    <div>
      <div className="flex flex-col gap-3 divide-y divide-gray-400">
        <h3 className="mb-2 text-md font-medium text-white">Profile</h3>
        {/* <h1 className="block text-sm text-neutral-400">
            Congestion Detected
            <span className="block"> 5 mins ago</span>
          </h1> */}
        <div className="flex">
          <img
            src={ProfilePic}
            alt="profile"
            className="w-12 h-12 mx-auto rounded-full"
          />
          <div className="block ml-2">
            <h1 className="text-white">Amy Summers</h1>
            <span className="text-neutral-400">Asummers@gmail.com</span>
          </div>
        </div>
        <button onClick={logout} className="block text-md text-neutral-400">
          Logout
        </button>
      </div>
    </div>
  );
};

const TABS = [
  {
    icon: <IoIosSettings className="h-6 w-6" />,
    Component: Settings,
  },
  {
    icon: <PiBellSimpleRingingFill className="h-6 w-6" />,
    Component: Notifications,
  },
  {
    icon: <FaUser className="h-5 w-5" />,
    Component: Profile,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
