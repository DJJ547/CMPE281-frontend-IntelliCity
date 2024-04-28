import React, { useState } from 'react';

function VideoPlayer({ url, latitude, longitude}) {
  const [showPopup, setShowPopup] = useState(false);
  const streamurl = `http://localhost:8000/api/StreamVideo/?url=${url}&latitude=${latitude}&longitude=${longitude}`;

  if (!url || !latitude || !longitude) {
    return <img src="https://png.pngtree.com/png-vector/20220809/ourmid/pngtree-live-streaming-icon-red-png-image_6104752.png" alt="placeholder" />;
  }

  return (
    <div>
      <img src={streamurl} onClick={() => setShowPopup(true)} />
      {showPopup && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <button onClick={() => setShowPopup(false)} className="hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Close</button>
          <img src={streamurl} style={{ width: '1280px', height: '720px' }} />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;