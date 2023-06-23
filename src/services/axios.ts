import axios from 'axios'
const BASE_URL = 'http://localhost:5000';

export const api = axios.create({
    baseURL: BASE_URL,
  });

  api.interceptors.request.use(
    (config)=>{
      let token=localStorage.getItem('user')
      if(token) config.headers['accessToken']=token
      // console.log(config);
      return config
    },
    (error) => {

      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response)=>{
      const {data} =response
      console.log(data);

      return response
    },
    (error) => {

      return Promise.reject(error)
    }
  )

