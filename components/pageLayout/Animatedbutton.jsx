import React, { useState } from "react";

const AnimatedButton = ({ children, href }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="group relative w-fit h-fit"
    >
      <h1 className="relative">
        {children}
        <span
          style={{
            transform: open ? "scaleX(1)" : "scaleX(0)",
          }}
          className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left rounded-full bg-gray-600 transition-transform duration-300 ease-out"
        />
      </h1>
    </div>
  );
};

export default AnimatedButton;