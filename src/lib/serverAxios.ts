// axiosInstance.ts
import axios from 'axios'

const serverAxios = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:3000',
})

export default serverAxios
