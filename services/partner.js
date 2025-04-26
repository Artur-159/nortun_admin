import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const PartnerAPI = Object.freeze({
  getAll: createAsyncThunk("get/get-partners", async (params) => {
    try {
      const response = await axiosGet.get("/partner", { params });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  getOne: createAsyncThunk("get/one-partner", async (id) => {
    try {
      const response = await axiosGet.get(`/partner/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  create: createAsyncThunk("post/post-partner", async (data) => {
    try {
      const response = await axiosPost.post("/partner", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  putUpdatePartner: createAsyncThunk("put/put-partner", async (data) => {
    try {
      const response = await axiosPut.put(`/partner/${data.id}`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),

  delete: createAsyncThunk("delete/delete-partner", async (id) => {
    try {
      const response = await axiosDelete.delete(`/partner/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
});
