import { Coords } from "../../app/features/map/mapSlice";
import { useAppActions } from "../../app/hooks";
import { calculateDistanceBetweenCoords } from "../Map/helpers";
import ActionButtons from "./ActionButtons";
import Label from "./Label";

import "./UserInfoCard.css";

type Props = {
  myLocation: Coords;
  anotherLocation: Coords;
  username: string;
  id: string;
};

const UserInfoCard = ({ myLocation, anotherLocation, username, id }: Props) => {
  const { setCardChosenOption } = useAppActions();

  const handleClose = () => {
    setCardChosenOption(null);
  };

  return (
    <div className="map_page_card_container">
      <Label text={username} fontSize="16px" />
      <Label
        fontSize="14px"
        text={`${calculateDistanceBetweenCoords(
          myLocation,
          anotherLocation,
        )} km`}
      />
      <ActionButtons id={id} username={username} onClose={handleClose} />
    </div>
  );
};

export default UserInfoCard;
