import { LatLngExpression } from "leaflet";

import { Coords } from "../../app/features/map/mapSlice";

export const formatMapCoords = (coords: null | Coords): LatLngExpression => {
  return {
    lng: coords?.longitude || 0,
    lat: coords?.latitude || 0,
  };
};

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return roundToTwoDecimals(d);
};

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const roundToTwoDecimals = (num: number) => {
  return +(Math.round(+`${num}e+2`) + "e-2");
};

export const calculateDistanceBetweenCoords = (
  locationFrom: Coords,
  locationTo: Coords,
) => {
  return getDistanceFromLatLonInKm(
    locationFrom.latitude,
    locationFrom.longitude,
    locationTo.latitude,
    locationTo.longitude,
  );
};
