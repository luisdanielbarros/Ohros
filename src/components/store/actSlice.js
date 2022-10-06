import { createSlice } from "@reduxjs/toolkit";

const actSlice = createSlice({
  name: "act",
  initialState: {
    isInAct: false,
    View: "default",
    actId: 0,
    Actname: "",
    Summary: "",
    Description: "",
    Time: 0,
  },
  reducers: {
    open(state, action) {
      state.isInAct = true;
      state.actId = action.payload.actId;
      state.Actname = action.payload.Actname;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
      state.Time = action.payload.Time;
    },
    update(state, action) {
      state.Actname = action.payload.actname;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
      if (action.payload.time) state.Time = action.payload.time;
    },
    close(state) {
      state.isInAct = false;
      state.actId = 0;
      state.Actname = "";
      state.Summary = "";
      state.Description = "";
      state.Time = 0;
    },
    changeView(state, action) {
      state.View = action.payload.View;
    },
  },
});

export default actSlice;

export const actActions = actSlice.actions;
