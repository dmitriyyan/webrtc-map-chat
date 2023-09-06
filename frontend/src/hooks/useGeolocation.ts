import { useCallback, useEffect } from "react";
import { useAppActions } from "../app/hooks";

const locationOptions: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
};

const useGeolocation = () => {
  const { setMyLocation, setIsLocationError } = useAppActions();

  const getCurrentGeolocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLocation({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      () => {
        setIsLocationError(true);
      },
      locationOptions,
    );
  }, [setMyLocation, setIsLocationError]);

  useEffect(() => {
    getCurrentGeolocation();
  }, [getCurrentGeolocation]);
};

export default useGeolocation;
