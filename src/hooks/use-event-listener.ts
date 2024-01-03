import { useEffect } from "react";

type KeyboardEventTypes = "keydown" | "keyup" | "keypress";
type NetworkEventTypes = "online" | "offline";
type CommonType = "visibilitychange";
type EventType = KeyboardEventTypes | NetworkEventTypes | CommonType;
type CallbackType = KeyboardEvent | Event;
type Args = {
  type: EventType;
  callback: (e: CallbackType) => void;
};
/**
 * Creates an event listener for the specified event type and callback function.
 *
 * @param {Args} Args - An object containing the type and callback.
 * @param {string} Args.type - The type of event to listen for.
 * @param {Function} Args.callback - The function to be called when the event occurs.
 * @return {void} - This function does not return anything.
 */
const useEventListener = ({ type, callback }: Args) => {
  useEffect(() => {
    window.addEventListener(type, callback);
    return () => window.removeEventListener(type, callback);
  }, [type, callback]);
};

export default useEventListener;