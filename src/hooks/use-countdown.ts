import { useState, useEffect } from "react";

type Args = {
  initialValue: number;
  delay: number;
};

/**
 * Custom hook that implements a countdown functionality.
 *
 * @param initialValue - The initial value of the countdown.
 * @param delay - The delay in milliseconds between each countdown step.
 * @returns The current count value.
 */
const useCountdown = ({ initialValue, delay }: Args) => {
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    // Start a timer that decreases the count value every `delay` milliseconds
    const timer = setInterval(() => {
      setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    }, delay);

    // Clean up the timer when the component unmounts or when `delay` changes
    return () => clearInterval(timer);
  }, [delay]);

  return count;
};

export default useCountdown;
