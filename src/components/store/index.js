import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import notificationSlice from "./notificationSlice";
import userAuthSlice from "./userAuthSlice";
import projAuthSlice from "./projAuthSlice";
import worldBuildingSlice from "./worldBuildingSlice";
import timelineSlice from "./timelineSlice";
import arcSlice from "./arcSlice";
import actSlice from "./actSlice";
import actionSlice from "./actionSlice";
import bookmarkSlice from "./bookmarkSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

//Reducers
const rootReducer = combineReducers({
  notifications: notificationSlice.reducer,
  user: userAuthSlice.reducer,
  project: projAuthSlice.reducer,
  worldBuilding: worldBuildingSlice.reducer,
  timeline: timelineSlice.reducer,
  arc: arcSlice.reducer,
  act: actSlice.reducer,
  action: actionSlice.reducer,
  bookmark: bookmarkSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
