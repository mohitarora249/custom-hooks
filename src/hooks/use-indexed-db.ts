import { useState, useEffect } from "react";

type Args = {
  dbName: string;
  storeName: string;
};

/**
 * Custom hook to interact with IndexedDB.
 *
 * @param dbName - The name of the database.
 * @param storeName - The name of the object store.
 * @returns The instance of the IDBDatabase.
 */
const useIndexedDB = ({ dbName, storeName }: Args) => {
  const [db, setDb] = useState<IDBDatabase | null>(null);

  /**
   * useEffect hook to open the indexedDB and set the database instance.
   */
  useEffect(() => {
    const request = window.indexedDB.open(dbName);

    request.onsuccess = () => {
      const database = request.result;
      setDb(database);
    };

    /**
     * Executes when an upgrade is needed for the request object.
     *
     * @param {Event} event - The event object.
     */
    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBRequest).result;
      database.createObjectStore(storeName, { keyPath: "id" });
    };

    /**
     * Handles the error that occurs when opening the database.
     *
     * @param {error} error - The error object that occurred when opening the database.
     */
    request.onerror = (error) => {
      console.error("Error opening database:", error);
    };
  }, [dbName, storeName]);

  return db;
};

export default useIndexedDB;
