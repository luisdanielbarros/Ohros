import { createSlice } from "@reduxjs/toolkit";

const arcSlice = createSlice({
  name: "arc",
  initialState: {
    isInArc: false,
    View: "default",
    arcId: 0,
    Arcname: "",
    Summary: "",
    Description: "",
    Time: 0,
  },
  reducers: {
    open(state, action) {
      state.isInArc = true;
      state.arcId = action.payload.arcId;
      state.Arcname = action.payload.Arcname;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
      state.Time = action.payload.Time;
    },
    update(state, action) {
      state.Arcname = action.payload.arcname;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
      if (action.payload.time) state.Time = action.payload.time;
    },
    close(state) {
      state.isInArc = false;
      state.arcId = 0;
      state.Arcname = "";
      state.Summary = "";
      state.Description = "";
      state.Time = 0;
    },
    changeView(state, action) {
      state.View = action.payload.View;
    },
  },
});

export default arcSlice;

export const arcActions = arcSlice.actions;
