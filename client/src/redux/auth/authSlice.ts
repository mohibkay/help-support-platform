import { User, UserType } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userRole: UserType | null;
  token: string | null;
  userData: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userRole: null,
  token: null,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{
        userRole: UserType;
        token: string;
        userData: User;
      }>
    ) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.userRole;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.token = null;
      state.userData = null;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;
