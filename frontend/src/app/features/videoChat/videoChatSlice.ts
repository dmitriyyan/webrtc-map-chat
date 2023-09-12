import { PayloadAction, createAction, createSlice } from "@reduxjs/toolkit";
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
  isRemoteStreamReady: boolean;
};

const initialState: State = {
  inChat: null,
  chats: [],
  isMicOn: false,
  isCameraOn: false,
  isRemoteStreamReady: false,
};

export const createVideoChat = createAction<{ id: string; peerId: string }>(
  "createVideoChat",
);

export const joinVideoChat = createAction<{ id: string; peerId: string }>(
  "joinVideoChat",
);

export const call = createAction<{ peerId: string }>("call");

export const leaveVideoChat = createAction<string>("leaveVideoChat");

export const videoChatDisconnect = createAction("videoChatDisconnect");

export const videoChatSlice = createSlice({
  name: "videoChat",
  initialState,
  reducers: {
    setInVideoChat: (state, action: PayloadAction<string | null>) => {
      state.inChat = action.payload;
    },
    setVideoChats: (state, action: PayloadAction<VideoChat[]>) => {
      state.chats = action.payload;
    },
    setIsRemoteStreamReady: (state, action: PayloadAction<boolean>) => {
      state.isRemoteStreamReady = action.payload;
    },
    setIsMicOn: (state, action: PayloadAction<boolean>) => {
      state.isMicOn = action.payload;
    },
    setIsCameraOn: (state, action: PayloadAction<boolean>) => {
      state.isCameraOn = action.payload;
    },
  },
});

export const {
  setInVideoChat,
  setVideoChats,
  setIsMicOn,
  setIsCameraOn,
  setIsRemoteStreamReady,
} = videoChatSlice.actions;
export default videoChatSlice.reducer;
