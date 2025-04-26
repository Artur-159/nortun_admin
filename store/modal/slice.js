import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "ModalSlice",
  initialState: {
    modal: false,
  },
  reducers: {
    setModalOpen: (state, action) => {
      state.modal = action.payload;
    },
  },
});

export const { setModalOpen } = ModalSlice.actions;

export default ModalSlice;
