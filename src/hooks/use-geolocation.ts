import { useState, useEffect } from "react";

type GeolocationState = {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
};

/**
 * Hook that returns the current geolocation.
 *
 * @return {GeolocationState} The current geolocation state, including latitude, longitude, and error.
 */
const useGeolocation = () => {
  const [geolocation, setGeolocation] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
  });
  useEffect(() => {
    const successCallback: PositionCallback = (position) => {
      setGeolocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };
    const errorCallback: PositionErrorCallback = (error) => {
      setGeolocation({
        latitude: null,
        longitude: null,
        error: error.message,
      });
    };
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
    };
    const watchId = navigator.geolocation.watchPosition(
      successCallback,
      errorCallback,
      options
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  return geolocation;
};

export default useGeolocation;