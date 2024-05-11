import { RequestFn, ResponseType, DataTransformer, PaginationTransformer, ApiType } from './types'

let dataTransformer: DataTransformer = function defaultDataTransformer<T>(response: ResponseType<T>, apiType?: ApiType) {
  return response.data
}

let paginationTransformer: PaginationTransformer = function defaultPaginationTransformer<T>(response: ResponseType<T>) {
  return response.pagination
}

export default class Curd<T> {
  restful: boolean
  url: string
  http: RequestFn<T>

  constructor(url: string, http: RequestFn<T>, restful: boolean = true) {
    this.restful = restful
    this.url = url
    this.http = http
  }

  async getList(params: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'GET', params })
      return Promise.resolve({ data: dataTransformer<T>(res, 'list'), pagination: paginationTransformer<T>(res) })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getItem(params: Record<string, any>) {
    try {
      let { id, ...rest } = params;
      let url = this.url;
      if (this.restful) {
        url = `${this.url}/${id}`;
        rest = params
      }
      const res = await this.http({ url, method: 'GET', params: rest })
      return Promise.resolve({ data: dataTransformer<T>(res, 'item') })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async update(data: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'POST', data })
      return Promise.resolve({ data: dataTransformer<T>(res, 'update') })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async create(data: Record<string, any>) {
    try {
      const res = await this.http({ url: this.url, method: 'POST', data })
      return Promise.resolve({ data: dataTransformer<T>(res, 'create') })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async delete(params: Record<string, any>) {
    try {
      let { id, ...rest } = params;
      let url = this.url;
      if (this.restful) {
        url = `${this.url}/${id}`;
        rest = params
      }
      const res = await this.http({ url, method: 'DELETE', params: rest })
      return Promise.resolve({ data: dataTransformer<T>(res, 'delete') })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async restore(params: Record<string, any>) {
    try {
      let { id, ...rest } = params;
      let url = this.url;
      if (this.restful) {
        url = `${this.url}/${id}`;
        rest = params
      }
      const res = await this.http({ url, method: 'PATCH', params: rest })
      return Promise.resolve({ data: dataTransformer<T>(res, 'restore') })
    } catch (err) {
      return Promise.reject(err)
    }
  }

  static setDataTransformer(transformer: DataTransformer) {
    dataTransformer = transformer
  }

  static setPaginationTransformer(transformer: PaginationTransformer) {
    paginationTransformer = transformer
  }

}