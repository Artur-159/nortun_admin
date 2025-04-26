import { createSlice } from "@reduxjs/toolkit";
import { AboutAPI } from "../../services/about";

const About = createSlice({
  name: "About slice",
  initialState: {
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(AboutAPI.get.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { setStatus, clearError } = About.actions;

export default About;
