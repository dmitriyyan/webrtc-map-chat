import { useAppSelector } from "../app/hooks";

const MapPage = () => {
  const onlineUsers = useAppSelector((store) => store.map.onlineUsers);

  return <div>MapPage</div>;
};

export default MapPage;
