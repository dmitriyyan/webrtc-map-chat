import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  username: string;
};

const initialState: UserState = {
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;

export const userEvents = {
  login: login.type,
};
