import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import Auth from "./auth/slice";
import Home from "./home/slice";
import FileSlice from "./file/slice";
import ImageSlice from "./image/slice";
import ModalSlice from "./modal/slice";
import Pagination from "./pagination/slice";
import Story from "./story/slice";
import News from "./news/slice";
import About from "./about/slice";
import Partner from "./partner/slice";
import Branch from "./branch/slice";

export const store = configureStore({
  reducer: {
    home: Home.reducer,
    auth: Auth.reducer,
    story: Story.reducer,
    news: News.reducer,
    about: About.reducer,
    partner: Partner.reducer,
    branch: Branch.reducer,
    image: ImageSlice.reducer,
    file: FileSlice.reducer,
    modal: ModalSlice.reducer,
    pagination: Pagination.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  devTools: process.env.REACT_APP_ENV !== "dev",
});
