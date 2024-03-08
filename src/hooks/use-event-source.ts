import { useEffect } from "react";

type Args = {
    url: string;
    callback: (e: MessageEvent) => void;
    errorCallback: (e: Event) => void;
}

const useEventSource = ({ url, callback, errorCallback }: Args) => {
    useEffect(() => {
        const eventSource = new EventSource(url);
        eventSource.onmessage = (event: MessageEvent) => callback(event);
        eventSource.onerror = (event: Event) => errorCallback(event);
        return () => eventSource.close();
    }, []);
};

export default useEventSource;
