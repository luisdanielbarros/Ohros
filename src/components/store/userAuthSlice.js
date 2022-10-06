import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    accessToken: "",
    refreshToken: "",
    userId: 0,
    Username: "",
    Email: "",
  },
  reducers: {
    register(state) {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.userId = 0;
      state.Username = "";
      state.Email = "";
    },
    login(state, action) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.Username = action.payload.Username;
      state.Username = action.payload.email;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = "";
      state.refreshToken = "";
      state.userId = 0;
      state.Username = "";
      state.Email = "";
    },
  },
});
export default userAuthSlice;

export const userAuthActions = userAuthSlice.actions;
