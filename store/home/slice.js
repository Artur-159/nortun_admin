import { createSlice } from "@reduxjs/toolkit";

import { HomeAPI } from "../../services/home";

const Home = createSlice({
  name: "Home slice",
  initialState: {
    list: [],
    banners: {
      media_am: [],
      media_ru: [],
      media_en: [],
    },
    path_am: "",
    file_type_am: "",
    path_ru: "",
    file_type_ru: "",
    path_en: "",
    file_type_en: "",
    oneHomeBanner: [],
  },
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload;
    },

    setDeleteMedia: (state, action) => {
      const { lang } = action.payload;
      delete state.banners[`path_${lang}`];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HomeAPI.getHomeBanners.fulfilled, (state, action) => {
        state.list = action.payload.data;
      })

      .addCase(HomeAPI.getOneHomeBanner.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.banners = ["am", "ru", "en"].reduce((acc, lang) => {
          if (data[`file_type_${lang}`] || data[`path_${lang}`]) {
            acc[`path_${lang}`] = [
              {
                [`file_type_${lang}`]: data[`file_type_${lang}`],
                [`path_${lang}`]: data[`path_${lang}`],
              },
            ];
          }
          return acc;
        }, {});
        state.oneHomeBanner = action.payload.data;
      })

      .addCase(HomeAPI.putUpdateHomeBanner.fulfilled, (state, action) => {
        state.status = action.payload.status;
      })

      .addCase(HomeAPI.postMedia.fulfilled, (state, action) => {
        const { data, lang } = action.payload;

        state.banners[`path_${lang}`] = [
          {
            [`file_type_${lang}`]: data[0]?.file_type,
            [`path_${lang}`]: data[0]?.path,
          },
        ];

        state[`path_${lang}`] = data[0]?.path;
        state[`file_type_${lang}`] = data[0]?.file_type;
      });
  },
});

export const { setDeleteMedia, setBanners } = Home.actions;

export default Home;
