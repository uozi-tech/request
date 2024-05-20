import { RequestFn } from './types'
import { createRequest, service } from './axios'
import { get } from 'lodash-es'
import { AxiosInterceptorOptions, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

type PaginationKey = 'total' | 'current' | 'pageSize' | 'totalPage'
type PaginationMap = {
  [key in PaginationKey]?: string | (string | number)[]
}
let paginationMap: PaginationMap = {}

export default class Curd<T> {
  private readonly restful: boolean
  private readonly url: string
  private readonly http: RequestFn<T>

  constructor(
    url: string,
    config?: {
      http?: RequestFn<T>
      restful: boolean
    },
  ) {
    this.restful = config?.restful ?? true
    this.url = url
    this.http = config?.http ?? createRequest(service)
  }

  async getList(params: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'GET', params })
      const pagination: { pageSize?: number; current?: number; total?: number; totalPage?: number } = {}
      for (const key in paginationMap) {
        if (paginationMap[key as PaginationKey]) {
          pagination[key as PaginationKey] = get(res?.data, paginationMap[key as PaginationKey] ?? `pagination.${key}`)
        }
      }
      return Promise.resolve({ data: res?.data, pagination })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getItem(params: Record<string, any>) {
    try {
      const { id, ...rest } = params
      let url = this.url
      if (this.restful) {
        url = `${this.url}/${id}`
        params = rest
      }
      const res = await this.http({ url, method: 'GET', params })
      return Promise.resolve({ data: res?.data })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async update(data: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'POST', data })
      return Promise.resolve({ data: res?.data })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async create(data: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'POST', data })
      return Promise.resolve({ data: res?.data })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async delete(params: Record<string, any>) {
    try {
      const { id, ...rest } = params
      let url = this.url
      if (this.restful) {
        url = `${this.url}/${id}`
        params = rest
      }
      const res = await this.http({ url, method: 'DELETE', params })
      return Promise.resolve({ data: res?.data })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async restore(params: Record<string, any>) {
    try {
      const { id, ...rest } = params
      let url = this.url
      if (this.restful) {
        url = `${this.url}/${id}`
        params = rest
      }
      const res = await this.http({ url, method: 'PATCH', params })
      return Promise.resolve({ data: res?.data })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static setPagination(map: PaginationMap) {
    paginationMap = map
  }

  static setRequestInterceptor(
    onFulfilled?: (value: InternalAxiosRequestConfig<any>) => InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>>,
    onRejected?: (error: any) => any,
    options?: AxiosInterceptorOptions,
  ) {
    service.interceptors.request.use(onFulfilled, onRejected, options)
  }
  static setResponseInterceptor(
    onFulfilled?: (value: AxiosResponse<any, any>) => AxiosResponse<any, any> | Promise<AxiosResponse<any, any>>,
    onRejected?: (error: any) => any,
    options?: AxiosInterceptorOptions,
  ) {
    service.interceptors.response.use(onFulfilled, onRejected, options)
  }
}
