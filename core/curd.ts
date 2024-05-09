import { RequestFn, Curd } from './types'

function curd(url: string, http: RequestFn): Curd {
  return {
    getList(params: Record<string, any>) {
      return http({ url, method: 'GET', params })
    },
    getItem() {
      return http({ url, method: 'GET' })
    },
    update() {
      return http({ url, method: 'POST' })
    },
    create() {
      return http({ url, method: 'POST' })
    },
    delete() {
      return http({ url, method: 'DELETE' })
    },
    restore() {
      return http({ url, method: 'PATCH' })
    },
  }
}

export function curdFactory(requestFn: RequestFn) {
  return (url: string) => curd(url, requestFn)
}
