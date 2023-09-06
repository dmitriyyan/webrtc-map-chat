import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type MapState = {
  myLocation: null | object;
  onlineUsers: [];
  cardChosenOptions: null | [];
};

const initialState: MapState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOptions: null,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMyLocation: (state, action) => {
      state.myLocation = action.payload;
    },
  },
});

export const { setMyLocation } = mapSlice.actions;
export default mapSlice.reducer;
