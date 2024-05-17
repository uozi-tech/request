import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { get, merge } from 'lodash-es'

function createService() {
  const service = axios.create()

  service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error),
  )

  service.interceptors.response.use(
    (response) => {
      const apiData = response.data

      const responseType = response.request?.responseType
      if (responseType === 'blob' || responseType === 'arraybuffer') return apiData

      return apiData
    },
    (error) => {
      const status = get(error, 'response.status')
      switch (status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = '请求地址出错'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP 版本不受支持'
          break
        default:
          break
      }
      return Promise.reject(error)
    },
  )
  return service
}

function createRequest(service: AxiosInstance) {
  return function <T>(config: AxiosRequestConfig): Promise<T> {
    const defaultConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 5000,
      baseURL: '/api',
      data: {},
    }
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

const service = createService()
export const request = createRequest(service)
