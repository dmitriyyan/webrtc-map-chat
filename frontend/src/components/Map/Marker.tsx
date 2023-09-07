import { Marker as MapMarker, Tooltip } from "react-leaflet";

import type { UserData } from "../../app/features/map/mapSlice";
import { formatMapCoords } from "./helpers";
import { useAppActions } from "../../app/hooks";

type Props = UserData & {
  isMe: boolean;
};

const Marker = ({ username, coords, isMe, id }: Props) => {
  const { setCardChosenOption } = useAppActions();

  const handleOptionChoose = () => {
    if (!isMe) {
      setCardChosenOption({
        username,
        coords,
        id,
      });
    }
  };

  return (
    <MapMarker
      attribution={isMe ? `${username} (Me)` : username}
      position={formatMapCoords(coords)}
      eventHandlers={{
        click: handleOptionChoose,
      }}
    >
      <Tooltip
        className="map_page_marker_text"
        direction="bottom"
        offset={[-15, 28]}
        opacity={1}
        permanent
      >
        {isMe ? `${username} (Me)` : username}
      </Tooltip>
    </MapMarker>
  );
};

export default Marker;
