import { createSlice } from "@reduxjs/toolkit";

import { AuthAPI } from "../../services/auth";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    adminRole: null,
    userRole: null,
    usersList: [],
    offset: 0,
    totalUsers: "",
    isAuth: "",
  },
  reducers: {
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuth = action.payload;
    },

    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(AuthAPI.getUsersList.fulfilled, (state, action) => {
        state.usersList = action.payload.data.users;
        state.totalUsers = action.payload.data.totalUsers;
      })
      .addCase(AuthAPI.postLogin.fulfilled, (state, action) => {
        const {
          token,
          role,
          user: { name },
        } = action.payload || {};

        if (token && role) {
          state.isAuth = token;
          state.adminRole = role;
          localStorage.setItem("token", token);
          localStorage.setItem("adminRole", role);
        }

        if (name) localStorage.setItem("user_name", name);
      })
      .addCase(AuthAPI.postRegSubAdmin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.data.token);
        localStorage.setItem("adminRole", action.payload.data.user);
        state.usersList = [...state.usersList, action.payload.data];
      })
      .addCase(AuthAPI.postLogout.fulfilled, (state) => {
        localStorage.clear();
        state.isAuth = null;
      });
  },
});

export const { setIsAuthenticated, setUserRole, setOffset } = AuthSlice.actions;

export default AuthSlice;
