import { MapContainer, TileLayer } from "react-leaflet";
import type { Map as MapType } from "leaflet";
import { useEffect, useRef } from "react";
import { Navigate } from "react-router-dom";
import MarkerClusterGroup from "react-leaflet-cluster";

import { useAppSelector } from "../../app/hooks";
import Marker from "./Marker";
import { formatMapCoords } from "./helpers";
import UserInfoCard from "../UserInfoCard";

import "leaflet/dist/leaflet.css";
import "./Map.css";

const Map = () => {
  const userId = useAppSelector((store) => store.user.id);

  const onlineUsers = useAppSelector((store) => store.map.onlineUsers);
  const location = useAppSelector((store) => store.map.myLocation);
  const cardChosenOption = useAppSelector(
    (store) => store.map.cardChosenOption,
  );

  const mapRef = useRef<null | MapType>(null);

  useEffect(() => {
    if (location !== null && mapRef.current !== null) {
      mapRef.current.setView(formatMapCoords(location), 15);
    }
  }, [location]);

  if (userId === "") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="map_page_container">
      <MapContainer
        center={formatMapCoords(location)}
        zoom={location ? 15 : 4}
        minZoom={3}
        ref={mapRef}
        className="map_container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarkerClusterGroup
          chunkedLoading
          zoomToBoundsOnClick
          spiderfyOnMaxZoom
        >
          {onlineUsers.map((onlineUser) => {
            return (
              <Marker
                key={onlineUser.id}
                {...onlineUser}
                isMe={userId === onlineUser.id}
              />
            );
          })}
        </MarkerClusterGroup>
      </MapContainer>
      {cardChosenOption && location && (
        <UserInfoCard
          id={cardChosenOption.id}
          username={cardChosenOption.username}
          anotherLocation={cardChosenOption.coords}
          myLocation={location}
        />
      )}
    </div>
  );
};

export default Map;
