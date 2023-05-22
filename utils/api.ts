import axios from 'axios'
// import APP_API_URL from '../utils/config'
import { constants } from '../utils/constants'

// const getAxiosInstance = async () => {
//   const axiosInstance = axios.create({
//     baseURL: APP_API_URL,
//   })
//
//   axiosInstance.interceptors.response.use(
//     (response) => {
//       const arr = [200, 201]
//       if (arr.indexOf(response.status) !== -1) {
//         return response.data
//       }
//
//       return Promise.reject(response)
//     },
//     (error) => {
//       if (error.response) {
//
//       }
//       return Promise.reject(error.response)
//     },
//   )
//
//   return axiosInstance
// }
// const callRequest = async (url, method = 'get', data = {}, options = {}) => {
//   const API = await getAxiosInstance()
//   if (!['post', 'put', 'patch'].includes(method)) {
//     return API[method](url, options)
//   }
//   return API[method](url, data, options)
// }
//
// const request = async (url, method = 'get', data = {}, options = {}) => {
//   try {
//     return await callRequest(url, method, data, options)
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }
const request = axios.create({
  baseURL: constants.APP_API_URL,
  timeout: 8000,
  headers: {
    Accept: 'application/json',
  },
})
export default request
