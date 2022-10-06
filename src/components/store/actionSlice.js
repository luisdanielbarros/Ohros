import { createSlice } from "@reduxjs/toolkit";

const actionSlice = createSlice({
  name: "action",
  initialState: {
    isInAction: false,
    View: "default",
    actionId: 0,
    Actionname: "",
    Summary: "",
    Description: "",
    Time: 0,
    Bookmarks: 0,
    WBs: 0,
    Arguments: 0,
  },
  reducers: {
    open(state, action) {
      state.isInAction = true;
      state.actionId = action.payload.actionId;
      state.Actionname = action.payload.Actionname;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
      state.Time = action.payload.Time;
      state.Bookmarks = action.payload.Bookmarks;
      state.WBs = action.payload.WBs;
      state.Arguments = action.payload.Arguments;
    },
    update(state, action) {
      state.Actionname = action.payload.actionname;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
      if (action.payload.time) state.Time = action.payload.time;
      state.Bookmarks = action.payload.bookmarks;
      state.WBs = action.payload.wbs;
      state.Arguments = action.payload.arguments;
    },
    close(state) {
      state.isInAction = false;
      state.actionId = 0;
      state.Actionname = "";
      state.Summary = "";
      state.Description = "";
      state.Time = 0;
      state.Bookmarks = "";
      state.WBs = "";
      state.Arguments = "";
    },
    changeView(state, action) {
      state.View = action.payload.View;
    },
  },
});

export default actionSlice;

export const actionActions = actionSlice.actions;
