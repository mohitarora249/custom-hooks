import { useEffect, useRef } from "react";

type Args = {
  callback: () => void;
  delay: number;
  startOnMount?: boolean;
};

/**
 * Generates a custom hook that executes a callback function at a specified interval.
 *
 * @param {Args} args - An object containing the callback function, delay, and an optional flag to start the interval on mount.
 * @param {Function} args.callback - The function to be executed at each interval.
 * @param {number} args.delay - The time, in milliseconds, between each interval.
 * @param {boolean} [args.startOnMount=false] - An optional flag to start the interval when the component mounts.
 * @return {Object} - An object with start and stop functions to control the interval.
 */
const useInterval = ({ callback, delay, startOnMount = false }: Args) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const clear = () => {
    if (intervalRef.current !== null) clearInterval(intervalRef.current);
  };
  useEffect(() => {
    if (startOnMount) intervalRef.current = setInterval(callback, delay);
    return () => clear();
  }, [delay, startOnMount, callback]);
  const start = () => {
    clear();
    intervalRef.current = setInterval(callback, delay);
  };
  return { start, stop: clear };
};

export default useInterval;