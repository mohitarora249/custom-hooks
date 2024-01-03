import { useState, useEffect } from "react";

type Args = {
    dbName: string;
    storeName: string;
};

const useIndexedDB = ({ dbName, storeName }: Args) => {
    const [db, setDb] = useState<IDBDatabase | null>(null);

    useEffect(() => {
        const request = window.indexedDB.open(dbName);

        request.onsuccess = () => {
            const database = request.result;
            setDb(database);
        };

        request.onupgradeneeded = (event) => {
            const database = (event.target as IDBRequest).result;
            database.createObjectStore(storeName, { keyPath: "id" });
        };

        request.onerror = (error) => {
            console.error("Error opening database:", error);
        };
    }, [dbName, storeName]);

    return db;
};

export default useIndexedDB;