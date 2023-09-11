import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import type { RootState, AppDispatch } from "./store";
import {
  setMyLocation,
  setIsLocationError,
  setCardChosenOption,
} from "./features/map/mapSlice";
import { login, setId } from "./features/user/userSlice";
import {
  addChatbox,
  removeChatbox,
  sendChatMessage,
} from "./features/messenger/messengerSlice";
import {
  setInVideoChat,
  setVideChats,
  createVideoChat,
  joinVideoChat,
  leaveVideoChat,
  setIsMicOn,
  setIsCameraOn,
  setRemoteStream,
} from "./features/videoChat/videoChatSlice";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const actions = {
  setMyLocation,
  setIsLocationError,
  setCardChosenOption,
  login,
  setId,
  addChatbox,
  removeChatbox,
  sendChatMessage,
  setInVideoChat,
  setVideChats,
  createVideoChat,
  joinVideoChat,
  leaveVideoChat,
  setIsMicOn,
  setIsCameraOn,
  setRemoteStream,
};

export const useAppActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};
