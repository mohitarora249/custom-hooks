import { useState } from "react";

const SET_ERROR = "Error setting value in Session Storage";
const CLEAR_ERROR = "Error clearing value in Session Storage";
const ERROR = "Error in Session Storage";
/**
 * Generates a custom hook that allows storing and retrieving data in the session storage.
 *
 * @param {string} key - The key used to store and retrieve the data in the session storage.
 * @param {T} initialValue - The initial value to be stored if there is no existing value for the given key.
 * @return {Object} - An object containing the stored value, a function to set the value, a function to clear the value, and an error message if an error occurs.
 */
function useSessionStorage<T>(key: string, initialValue: T) {
  const [error, setError] = useState("");
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key);
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
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      setError(SET_ERROR);
      console.error(SET_ERROR, error);
    }
  };
  const clearValue = () => {
    try {
      window.sessionStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      setError(CLEAR_ERROR);
      console.error(CLEAR_ERROR, error);
    }
  };
  return { storedValue, setValue, clearValue, error };
}

export default useSessionStorage;