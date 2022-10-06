import { createSlice } from "@reduxjs/toolkit";

const projAuthSlice = createSlice({
  name: "project",
  initialState: {
    isInProject: false,
    projectId: 0,
    Projname: "",
    Summary: "",
    Description: "",
  },
  reducers: {
    open(state, action) {
      state.isInProject = true;
      state.projectId = action.payload.projectId;
      state.Projname = action.payload.Projname;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
    },
    update(state, action) {
      console.log("action.payload");
      console.log(action.payload);
      state.Projname = action.payload.projname;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
    },
    close(state) {
      state.isInProject = false;
      state.projectId = 0;
      state.Projname = "";
      state.property = "";
      state.Description = "";
    },
  },
});

export default projAuthSlice;

export const projAuthActions = projAuthSlice.actions;
