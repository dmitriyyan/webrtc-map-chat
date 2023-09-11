import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Chat = {
  id: string;
  username: string;
};

export type Message = {
  id: string;
  receiverId: string;
  senderId: string;
  content: string;
  isMyMessage: boolean;
};

export type ChatHistory = {
  [id: string]: Message[];
};

type State = {
  chatboxes: Chat[];
  chatHistory: ChatHistory;
};

const initialState: State = {
  chatboxes: [],
  chatHistory: {},
};

export const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    addChatbox: (state, action: PayloadAction<Chat>) => {
      if (
        !state.chatboxes.some((chatbox) => chatbox.id === action.payload.id)
      ) {
        state.chatboxes.push(action.payload);
      }
    },
    removeChatbox: (state, action: PayloadAction<string>) => {
      state.chatboxes = state.chatboxes.filter(
        (chatbox) => chatbox.id !== action.payload,
      );
    },
    sendChatMessage: (
      state,
      action: PayloadAction<Omit<Message, "isMyMessage">>,
    ) => {
      if (state.chatHistory[action.payload.receiverId]) {
        state.chatHistory[action.payload.receiverId].push({
          ...action.payload,
          isMyMessage: true,
        });
      } else {
        state.chatHistory[action.payload.receiverId] = [
          { ...action.payload, isMyMessage: true },
        ];
      }
    },
    getChatMessage: (
      state,
      action: PayloadAction<Omit<Message, "isMyMessage">>,
    ) => {
      if (state.chatHistory[action.payload.senderId]) {
        state.chatHistory[action.payload.senderId].push({
          ...action.payload,
          isMyMessage: false,
        });
      } else {
        state.chatHistory[action.payload.senderId] = [
          { ...action.payload, isMyMessage: false },
        ];
      }
    },
  },
});

export const { addChatbox, removeChatbox, sendChatMessage, getChatMessage } =
  messengerSlice.actions;
export default messengerSlice.reducer;
