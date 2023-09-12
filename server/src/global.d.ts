type Coords = {
  longitude: number;
  latitude: number;
};

type UserData = {
  id: string;
  username: string;
  coords: Coords;
};

type Message = {
  id: string;
  receiverId: string;
  content: string;
};

type Participant = {
  id: string;
  username: string;
  peerId: string;
};

type VideoChat = {
  id: string;
  participants: Participant[];
};
