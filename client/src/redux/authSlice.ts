import { User, UserType } from "@/types/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userType: UserType | null;
  token: string | null;
  userData: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userType: null,
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
        userType: UserType;
        token: string;
        userData: User;
      }>
    ) => {
      state.isAuthenticated = true;
      state.userType = action.payload.userType;
      state.userData = action.payload.userData;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userType = null;
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
