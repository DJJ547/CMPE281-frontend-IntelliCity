import React, { useState, useEffect } from 'react';

const Toast = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 3000); // the toast message will disappear after 3 seconds
    }
  }, [message]);

  return (
    isVisible && (
      <div style={{zIndex: 50}} className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-4 border rounded-lg shadow-lg -z-50 ${type === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white`}>
        {message}
      </div>
    )
  );
};

export default Toast;
