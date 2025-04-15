import axios from 'axios'
import { updateToken } from '@/libs/keycloak.ts'

const api = axios.create({
  baseURL: import.meta.env.DEV ? '' : import.meta.env.VITE_API_URL,
})

api.interceptors.request.use(async (config) => {
  const token = await updateToken()

  config.headers = config.headers ?? {}
  config.headers.Authorization = `Bearer ${token}`

  return config
}, (error) => {
  return Promise.reject(error)
})

export default api
