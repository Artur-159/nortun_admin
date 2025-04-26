import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const StoryAPI = Object.freeze({
  getStories: createAsyncThunk("get/get-stories", async (params) => {
    try {
      const response = await axiosGet.get("/story", { params });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  getOneStory: createAsyncThunk("get/one-story", async (id) => {
    try {
      const response = await axiosGet.get(`/story/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  postStory: createAsyncThunk("post/post-story", async (data) => {
    try {
      const response = await axiosPost.post("/story", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  putUpdateStory: createAsyncThunk("put/put-story", async (data) => {
    try {
      const response = await axiosPut.put(`/story/${data.id}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  deleteStory: createAsyncThunk("delete/delete-story", async (id) => {
    try {
      const response = await axiosDelete.delete(`/story/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
});
