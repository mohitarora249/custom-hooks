import { useState, useEffect } from 'react';

const useFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (document.documentElement) {
      document.documentElement.requestFullscreen();
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      setIsFullScreen(!!document.fullscreenElement);
    });

    return () => {
      document.removeEventListener('fullscreenchange', () => {
        setIsFullScreen(!!document.fullscreenElement);
      });
    };
  }, []);

  return [isFullScreen, toggleFullScreen] as const;
}

export default useFullScreen;