import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import ticketsReducer from "./ticket/ticketsSlice";
import articlesReducer from "./article/articlesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketsReducer,
    articles: articlesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
