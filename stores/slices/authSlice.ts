import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface Admin {
  id: string | null;
  email: string | null;
  phone: string | null;
  name: string | null;
  avatar: string | null;
  role: number | null;
}

interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  admin: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<Admin>) {
      state.isAuthenticated = true;
      state.admin = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.admin = null;
      Cookies.remove("admin_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
