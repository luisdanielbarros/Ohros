import { createSlice } from "@reduxjs/toolkit";

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    isInBookmark: false,
    View: "grid",
    bookmarkId: 0,
    Bookmarkname: "",
    Summary: "",
    Description: "",
  },
  reducers: {
    open(state, action) {
      state.isInBookmark = true;
      state.bookmarkId = action.payload.bookmarkId;
      state.Bookmarkname = action.payload.Bookmarkname;
      state.Summary = action.payload.Summary;
      state.Description = action.payload.Description;
    },
    update(state, action) {
      state.Bookmarkname = action.payload.bookmarkname;
      state.Summary = action.payload.summary;
      state.Description = action.payload.description;
    },
    close(state) {
      state.isInBookmark = false;
      state.bookmarkId = 0;
      state.Bookmarkname = "";
      state.Summary = "";
      state.Description = "";
    },
    changeView(state, action) {
      state.View = action.payload.View;
    },
  },
});

export default bookmarkSlice;

export const bookmarkActions = bookmarkSlice.actions;
