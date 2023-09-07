import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Coords = {
  longitude: number;
  latitude: number;
};

export type UserData = {
  id: string;
  username: string;
  coords: Coords;
};

type MapState = {
  myLocation: null | Coords;
  isLocationError: boolean;
  onlineUsers: UserData[];
  cardChosenOption: null | UserData;
};

const initialState: MapState = {
  myLocation: null,
  onlineUsers: [],
  cardChosenOption: null,
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
    setOnlineUsers: (state, action: PayloadAction<UserData[]>) => {
      state.onlineUsers = action.payload;
    },
    setCardChosenOption: (state, action: PayloadAction<UserData | null>) => {
      state.cardChosenOption = action.payload;
    },
  },
});

export const {
  setMyLocation,
  setIsLocationError,
  setOnlineUsers,
  setCardChosenOption,
} = mapSlice.actions;
export default mapSlice.reducer;
