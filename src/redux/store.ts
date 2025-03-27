import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";

export const store = configureStore({
  reducer: {
    movie: movieReducer, //Movie-related state management
  },
});

export type RootState = ReturnType<typeof store.getState>; //Type for accessing state
export type AppDispatch = typeof store.dispatch; //Type for dispatching actions
