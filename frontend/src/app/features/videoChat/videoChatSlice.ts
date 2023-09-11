import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserData } from "../map/mapSlice";

type Participant = Omit<UserData, "coords"> & {
  peerId: string;
};

export type VideoChat = {
  id: string;
  participants: Participant[];
};

type State = {
  inChat: null | string;
  chats: VideoChat[];
  isMicOn: boolean;
  isCameraOn: boolean;
  remoteStream: MediaProvider | null;
};

const initialState: State = {
  inChat: null,
  chats: [],
  isMicOn: false,
  isCameraOn: false,
  remoteStream: null,
};

export const videoChatSlice = createSlice({
  name: "videoChat",
  initialState,
  reducers: {
    setInVideoChat: (state, action: PayloadAction<string>) => {
      state.inChat = action.payload;
    },
    setVideChats: (state, action: PayloadAction<VideoChat[]>) => {
      state.chats = action.payload;
    },
    createVideoChat: (
      state,
      action: PayloadAction<Omit<VideoChat, "participants">>,
    ) => {},
    setRemoteStream: (state, action) => {
      state.remoteStream = action.payload;
    },
    joinVideoChat: (state, aciton) => {},
    leaveVideoChat: (state, action) => {},
    setIsMicOn: (state, action) => {},
    setIsCameraOn: (state, action) => {},
  },
});

export const {
  setInVideoChat,
  setVideChats,
  createVideoChat,
  joinVideoChat,
  leaveVideoChat,
  setIsMicOn,
  setIsCameraOn,
  setRemoteStream,
} = videoChatSlice.actions;
export default videoChatSlice.reducer;
