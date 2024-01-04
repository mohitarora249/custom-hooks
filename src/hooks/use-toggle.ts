import { useState } from "react";

type Args = {
  initialValue: boolean;
};

/**
 * Custom hook that provides a boolean value and functions to toggle and set the value.
 * @param initialValue - The initial value of the boolean.
 * @returns An object with the boolean value, toggle function, and set functions.
 */
const useToggle = ({ initialValue }: Args) => {
  const [value, setValue] = useState(initialValue);

  /**
   * Toggle the boolean value.
   */
  const toggle = () => {
    setValue((prevValue) => !prevValue);
  };

  /**
   * Set the boolean value to true.
   */
  const setTrue = () => {
    setValue(true);
  };

  /**
   * Set the boolean value to false.
   */
  const setFalse = () => {
    setValue(false);
  };

  return { value, toggle, setTrue, setFalse };
};

export default useToggle;
