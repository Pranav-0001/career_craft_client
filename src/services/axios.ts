import axios from 'axios'
const BASE_URL = process.env.REACT_APP_BASE_URL as string;
// const BASE_URL = 'http://10.4.3.148:5000';

export const api = axios.create({
    baseURL: BASE_URL,
  });

  api.interceptors.request.use(
    (config)=>{
      let token=localStorage.getItem('user')
      let admin=localStorage.getItem('admin')
      
      
      if(token) config.headers['accessToken']=token
      if(admin) config.headers['adminaccesstoken']=admin
      
      
      return config
    },
    (error) => {

      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    (response)=>{
      const {data} =response
      if(data?.newAdminAccessToken){
        localStorage.removeItem('admin')
        localStorage.setItem("admin",data.newAdminAccessToken)
      }
      
      return response
    },
    (error) => {

      return Promise.reject(error)
    }
  )

