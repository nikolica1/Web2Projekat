import baseUrl from "../config.json";
import axios from "axios";
import headerService from "./headerService";




const drivingService = {
  createDriving: async (formData: FormData) => {
    try {
      const response = await axios.post(`${baseUrl.serverUrl}/api/driving/create`, formData,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getDrivingForUser: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/user/`+id,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getActiveDriving: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/user1/`+id,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
 
  accept: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/accept/`+id,headerService.getHttpHeaderWithToken());
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  driverAccept: async (drivingId: number, driverId:number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/accept/`+drivingId+"/"+driverId,headerService.getHttpHeaderWithToken());
      
      return response.data;
    } catch (error) {
      throw error;
    }
  },
 
  getDrivingForDrivers: async () => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/driver`,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getDrivingForAdmin: async () => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/admin`,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  rateIt: async (id: number, rating: number) => {
    try {
    
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/rate/`+id+"/"+rating,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  getChat: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/chat/`+id,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addChat: async (id: number, text :string ) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/driving/addchat/`+id+"/"+ text,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },





 
 
  
};

export default drivingService;
