import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string;
  id: string;
  peerId: string;
};

const initialState: UserState = {
  username: "",
  id: "",
  peerId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setPeerId: (state, action: PayloadAction<string>) => {
      state.peerId = action.payload;
    },
  },
});

export const { login, setId, setPeerId } = userSlice.actions;
export default userSlice.reducer;

export const userEvents = {
  login: login.type,
};
