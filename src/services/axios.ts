import axios from 'axios'
const BASE_URL = 'http://localhost:5000';

export const api = axios.create({
    baseURL: BASE_URL,
  });

  api.interceptors.request.use(
    (config)=>{
      console.log(config);
      
      return config
    },
    (error) => {

      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response)=>{

      return response
    },
    (error) => {

      return Promise.reject(error)
    }
  )

