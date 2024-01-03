import { useState } from "react";

const SET_ERROR = "Error setting value in LocalStorage";
const CLEAR_ERROR = "Error clearing value in LocalStorage";
const ERROR = "Error in LocalStorage";

/**
 * A custom hook that allows storing and retrieving data in the local storage.
 *
 * @param {string} key - The key used to store the data in the local storage.
 * @param {T} initialValue - The initial value for the data.
 * @return {{storedValue: T, setValue: (value: T | ((val: T) => T)) => void, clearValue: () => void, error: string}} - An object containing the stored value, a function to set the value, a function to clear the value, and an error message if any.
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  const [error, setError] = useState("");
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      setError(ERROR);
      console.error(ERROR, error);
      return initialValue;
    }
  });
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      setError(SET_ERROR);
      console.error(SET_ERROR, error);
    }
  };
  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      setError(CLEAR_ERROR);
      console.error(CLEAR_ERROR, error);
    }
  };
  return { storedValue, setValue, clearValue, error };
}

export default useLocalStorage;