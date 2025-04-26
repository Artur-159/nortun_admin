import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPut from "../axios/axios-put";
import axiosPost from "../axios/axios-post";
import axiosGet from "../axios/axios-get";
import axiosDelete from "../axios/axios-delete";

export const AuthAPI = Object.freeze({
  postLogin: createAsyncThunk("post/login", async (data) => {
    try {
      const response = await axiosPost.post("/login", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  postLogout: createAsyncThunk("post/logout", async () => {
    try {
      const response = await axiosPost.post("/logout");
      return response;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  postRegSubAdmin: createAsyncThunk("post/registerAdmin", async (data) => {
    try {
      const response = await axiosPost.post("/register", data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  deleteAdmin: createAsyncThunk("delete/delete-admin", async (id) => {
    try {
      const response = await axiosDelete.delete(`/users/${id}`);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  putBlocked: createAsyncThunk("put/put-blocked", async (data) => {
    try {
      const response = await axiosPut.put(`/block-user`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  putChangeRole: createAsyncThunk("put/put-change-role", async (data) => {
    try {
      const response = await axiosPut.put(`/change-role`, data);
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
  getUsersList: createAsyncThunk("get/admin-list", async (params) => {
    try {
      const response = await axiosGet.get(`/users`, { params });
      return response.data;
    } catch (error) {
      return Promise.reject(error.response?.data || error.message);
    }
  }),
});
