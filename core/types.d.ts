export type ResponseType<T = unknown> = {
  data: T
  [key: string]: any
}

export type PaginationType = {
  total: number
  totalPages: number
  pageSize: number
  current: number
}

export type RequestFn<T = unknown> = (config: AxiosRequestConfig) => Promise<ResponseType<T>>

export type ApiType = 'list' | 'item' | 'update' | 'create' | 'delete' | 'restore'

export type DataTransformer = <T = unknown>(response: ResponseType<T>, apiType?: ApiType ) => T | T[]
export type PaginationTransformer = <T = unknown>(response: ResponseType<T>) => PaginationType
