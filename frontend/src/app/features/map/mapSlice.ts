import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Coords = {
  latitude: number;
  longitude: number;
};

type MapState = {
  myLocation: null | Coords;
  isLocationError: boolean;
  onlineUsers: [];
  cardChosenOptions: null | [];
};

const initialState: MapState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOptions: null,
  isLocationError: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMyLocation: (state, action: PayloadAction<Coords>) => {
      state.myLocation = action.payload;
      state.isLocationError = false;
    },
    setIsLocationError: (state, action: PayloadAction<boolean>) => {
      state.isLocationError = action.payload;
    },
  },
});

export const { setMyLocation, setIsLocationError } = mapSlice.actions;
export default mapSlice.reducer;
