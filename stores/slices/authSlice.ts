import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Admin {
  id: string | null;
  email: string | null;
  phone: string | null;
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
      localStorage.removeItem("admin_token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
