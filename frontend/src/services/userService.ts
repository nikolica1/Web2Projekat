// userService.js
import baseUrl from "../config.json";

import axios from "axios";
import { LoginModel, VerifyOrDeny } from "../models/user";
import headerService from "../services/headerService";



const userService = {
  register: async (formData: FormData) => {
    try {
      const response = await axios.post(`${baseUrl.serverUrl}/api/user/register`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (loginModel: LoginModel) => {
    try {
      const response = await axios.post(`${baseUrl.serverUrl}/api/user/login`, loginModel,headerService.getHttpHeaderNoToken());
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUser: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/user/details/${id}`,headerService.getHttpHeaderWithToken());
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getUserId:  () => {
     let user=JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
    return Number(user.nameid);
   
  },

  getUserRole:  () => {
    let user=JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))
   return user.role;
  
 },
  update: async (formData: FormData) => {
    try {
      const response = await axios.patch(`${baseUrl.serverUrl}/api/user/update`, formData,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDrivers: async () => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/user/driver`,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  verify: async (id: string, action: string) => {
    try {
      const verification: VerifyOrDeny = {
        action: action
      }
      const response = await axios.patch(`${baseUrl.serverUrl}/api/user/verify/`+id,verification,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getRating: async (driverId: string) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/user/rating/${driverId}`,headerService.getHttpHeaderWithToken());
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  block: async (driverId: string) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/user/block/${driverId}`,headerService.getHttpHeaderWithToken());
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  
};

export default userService;
