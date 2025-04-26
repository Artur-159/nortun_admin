import { createSlice } from "@reduxjs/toolkit";

import { PartnerAPI } from "../../services/partner";

const Partner = createSlice({
  name: "Partner",
  initialState: {
    partners: [],
    onePartner: null,
    total: 0,
  },

  extraReducers: (builder) => {
    builder
      .addCase(PartnerAPI.getAll.fulfilled, (state, action) => {
        const { total, partners } = action.payload;
        state.partners = partners;
        state.total = total;
      })

      .addCase(PartnerAPI.getOne.fulfilled, (state, action) => {
        state.onePartner = action.payload.data;
      });
  },
});

export default Partner;
