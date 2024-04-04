import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ticketsReducer from "./ticketsSlice";
import articlesReducer from "./articlesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
    articles: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
