import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

function VideoPlayer({url}) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        videoRef.current.play();
      });
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
      videoRef.current.addEventListener('loadedmetadata', function() {
        videoRef.current.play();
      });
    }
  }, []);
  if (!url) return <img src="https://png.pngtree.com/png-vector/20220809/ourmid/pngtree-live-streaming-icon-red-png-image_6104752.png" alt="placeholder" />;
  return <video ref={videoRef} controls muted />;
}

export default VideoPlayer;