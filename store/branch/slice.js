import { createSlice } from "@reduxjs/toolkit";

import { BranchAPI } from "../../services/branch";

const Branch = createSlice({
  name: "Branch",
  initialState: {
    branches: [],
    oneBranch: null,
    total: 0,
  },

  extraReducers: (builder) => {
    builder
      .addCase(BranchAPI.getAll.fulfilled, (state, action) => {
        const { total, branches } = action.payload;

        state.branches = branches;
        state.total = total;
      })

      .addCase(BranchAPI.getOne.fulfilled, (state, action) => {
        state.oneBranch = action.payload;
      });
  },
});

export default Branch;
