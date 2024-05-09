export type RequestFn = <T>(config: AxiosRequestConfig) => Promise<T>

export type Curd = {
  getList: (params: Record<string, any>) => Promise<unknown>
  getItem: () => Promise<unknown>
  update: () => Promise<unknown>
  create: () => Promise<unknown>
  delete: () => Promise<unknown>
  restore: () => Promise<unknown>
}
