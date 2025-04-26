import { createSlice } from "@reduxjs/toolkit";

import { NewsAPI } from "../../services/news";

const News = createSlice({
  name: "News slice",
  initialState: {
    news: [],
    oneNews: null,
    total: 0,
  },
  reducers: {
    setOneNews: (state, action) => {
      state.oneNews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(NewsAPI.getAll.fulfilled, (state, action) => {
        const { total, news } = action.payload;

        state.news = news;
        state.total = total;
      })

      .addCase(NewsAPI.getOne.fulfilled, (state, action) => {
        state.oneNews = action.payload;
      });
  },
});

export const { setOneNews } = News.actions;

export default News;
