import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { notifications: [] },
  reducers: {
    add(state, action) {
      state.notifications.push(action.payload);
    },
    close(state) {
      state.notifications.shift();
    },
    needLoggedIn(state) {
      state.notifications.push({
        Title: "User Authentication Required",
        Message: "You need to be logged in to access this page.",
        closeButton: "Close.",
      });
    },
    needInProject(state) {
      state.notifications.push({
        Title: "Project Authentication Required",
        Message: "You need to open a project to access this page.",
        closeButton: "Close.",
      });
    },
    needInTimeline(state) {
      state.notifications.push({
        Title: "Timeline Authentication Required",
        Message: "You need to open a timeline to access this page.",
        closeButton: "Close.",
      });
    },
    needInArc(state) {
      state.notifications.push({
        Title: "Arc Authentication Required",
        Message: "You need to open a arc to access this page.",
        closeButton: "Close.",
      });
    },
    needInAct(state) {
      state.notifications.push({
        Title: "Act Authentication Required",
        Message: "You need to open a act to access this page.",
        closeButton: "Close.",
      });
    },
    needInAction(state) {
      state.notifications.push({
        Title: "Action Authentication Required",
        Message: "You need to open a action to access this page.",
        closeButton: "Close.",
      });
    },
  },
});

export default notificationSlice;

export const notificationActions = notificationSlice.actions;
