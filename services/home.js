import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const HomeAPI = Object.freeze({
  getHomeBanners: createAsyncThunk("get/get-home-banner", async (params) => {
    try {
      const response = await axiosGet.get("/home-banner", { params });
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),

  getOneHomeBanner: createAsyncThunk("get/one-home-banner", async (id) => {
    try {
      const response = await axiosGet.get(`/home-banner/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),

  postHomeBanner: createAsyncThunk("post/post-home-banner", async (data) => {
    try {
      const response = await axiosPost.post("/home-banner", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  deleteHomeBanner: createAsyncThunk(
    "delete/delete-home-banner",
    async (id) => {
      try {
        const response = await axiosDelete.delete(`/home-banner/${id}`);
        return response.data;
      } catch (error) {
        return Promise.reject(error.message);
      }
    }
  ),

  putUpdateHomeBanner: createAsyncThunk("put/put-home-banner", async (data) => {
    try {
      const response = await axiosPut.put(`/home-banner/${data.id}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),

  postMedia: createAsyncThunk("post/media", async (data) => {
    try {
      const response = await axiosPost.post("/upload-mixed-media", data);
      return {
        data: response.data,
        lang: data.lang,
      };
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),
});
