import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

const BASE_URL = "/news";

export const NewsAPI = Object.freeze({
  getAll: createAsyncThunk("get/get-news", async (params) => {
    try {
      const response = await axiosGet.get(BASE_URL, { params });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  getOne: createAsyncThunk("get/one-news", async (id) => {
    try {
      const response = await axiosGet.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  create: createAsyncThunk("post/post-news", async (data) => {
    try {
      const response = await axiosPost.post(BASE_URL, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  update: createAsyncThunk("put/put-news", async (data) => {
    try {
      const response = await axiosPut.put(`${BASE_URL}/${data.id}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  remove: createAsyncThunk("delete/delete-news", async (id) => {
    try {
      const response = await axiosDelete.delete(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
});
