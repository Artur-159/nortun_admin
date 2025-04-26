import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";

const BASE_URL = "/about";

export const AboutAPI = Object.freeze({
  get: createAsyncThunk("get/about", async () => {
    try {
      const response = await axiosGet.get(BASE_URL);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),
  
  create: createAsyncThunk("post/post-about", async (data) => {
    try {
      const response = await axiosPost.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }),
});
