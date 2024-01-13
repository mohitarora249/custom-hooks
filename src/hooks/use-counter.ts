import { useState } from "react";

type Args = {
  initialValue: number;
};

/**
 * Custom hook that provides counter functionality.
 * @param initialValue The initial value of the counter.
 * @returns An object containing the count, increment, decrement, and reset functions.
 */
const useCounter = ({ initialValue }: Args) => {
  const [count, setCount] = useState(initialValue);

  /**
   * Increments the count by 1.
   */
  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  /**
   * Decrements the count by 1, but ensures that the count does not go below 0.
   */
  const decrement = () => {
    setCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
  };

  /**
   * Resets the count to its initial value.
   */
  const reset = () => {
    setCount(initialValue);
  };

  return { count, increment, decrement, reset };
};

export default useCounter;
