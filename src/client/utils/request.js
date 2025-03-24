import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router/index.js'

const service = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api`,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

service.interceptors.request.use(
  (request) => {
    request.method ||= 'get'
    if (request.method.toLowerCase() === 'get') {
      request.params = request.data
    }
    console.log(request.method, request.url, {
      params: request.params,
      data: request.data,
    })
    return request
  },
  (error) => {
    console.error(error)
    ElMessage.error(error.message)
    return Promise.reject(error)
  },
)

service.interceptors.response.use(
  (response) => {
    const json = response.data
    console.log(json)
    if (json.code !== 200) {
      ElMessage.error(json.message)
      if (json.code === 401) {
        router.replace('/auth')
      } else if (json.code === 403) {
        router.replace('/')
      }
      return Promise.reject(new Error(json.message))
    }
    return json
  },
  (error) => {
    console.error(error)
    const json = error.response.data
    ElMessage.error(json.message)
    return Promise.reject(error) // [vue warn]: Unhandled error during execution of component event handler
  },
)

export default service
