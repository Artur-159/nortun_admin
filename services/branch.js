import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const BranchAPI = Object.freeze({
  getAll: createAsyncThunk("get/get-branches", async (params) => {
    try {
      const response = await axiosGet.get("/branch", { params });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  getOne: createAsyncThunk("get/one-branch", async (id) => {
    try {
      const response = await axiosGet.get(`/branch/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  create: createAsyncThunk("post/post-branch", async (data) => {
    try {
      const response = await axiosPost.post("/branch", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  update: createAsyncThunk("put/put-branch", async (data) => {
    try {
      const response = await axiosPut.put(`/branch/${data.id}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  delete: createAsyncThunk("delete/delete-branch", async (id) => {
    try {
      const response = await axiosDelete.delete(`/branch/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
});
