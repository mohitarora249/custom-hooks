import { useState } from "react";
import useEventListener from "./use-event-listener";

/**
 * Returns the online status of the user.
 *
 * @return {Object} Returns an object with the property `isOnline` indicating whether the user is currently online.
 */
const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const updateOnlineStatus = () => setIsOnline(navigator.onLine);
  useEventListener({ type: "online", callback: updateOnlineStatus });
  useEventListener({ type: "offline", callback: updateOnlineStatus });
  return { isOnline };
};

export default useOnlineStatus;