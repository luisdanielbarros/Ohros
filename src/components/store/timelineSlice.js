import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    isInTimeline: false,
    View: "default",
    timelineId: 0,
    Timename: "",
    Summary: "",
    Description: "",
  },
  reducers: {
    open(state, action) {
      state.isInTimeline = true;
      state.timelineId = action.payload.timelineId;
      state.Timename = action.payload.Timename;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
    },
    update(state, action) {
      state.Timename = action.payload.timename;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
    },
    close(state) {
      state.isInTimeline = false;
      state.timelineId = 0;
      state.Timename = "";
      state.Summary = "";
      state.Description = "";
    },
    changeView(state, action) {
      state.View = action.payload.View;
    },
  },
});

export default timelineSlice;

export const timelineActions = timelineSlice.actions;
