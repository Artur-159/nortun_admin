import { createSlice } from "@reduxjs/toolkit";

import { StoryAPI } from "../../services/story";

const Story = createSlice({
  name: "Story slice",
  initialState: {
    storiesList: [],
  },
  reducers: {
    setStories: (state, action) => {
      state.storiesList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(StoryAPI.getStories.fulfilled, (state, action) => {
      state.storiesList = action.payload;
    });
  },
});

export const { setStories } = Story.actions;

export default Story; 
