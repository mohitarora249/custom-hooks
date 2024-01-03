import { useState, useEffect } from "react";

type MediaQueryMatches = {
  isMobile: boolean;
};

/**
 * Returns an object containing a boolean value indicating whether the current device is a mobile device or not.
 *
 * @return {MediaQueryMatches} An object containing the boolean value isMobile.
 */
const useMobile = (): MediaQueryMatches => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const checkMediaQuery = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // Initial check
    setIsMobile(mediaQuery.matches);

    // Add listener for changes in media query
    mediaQuery.addEventListener("change", checkMediaQuery);

    // Clean up listener on unmount
    return () => {
      mediaQuery.removeEventListener("change", checkMediaQuery);
    };
  }, []);

  return { isMobile };
};

export default useMobile;