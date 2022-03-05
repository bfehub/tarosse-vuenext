import { isObject } from './is'

export function deepClone<T = any>(target: any = {}): T {
  return JSON.parse(JSON.stringify(target))
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function timestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {}
  }
  const now = new Date().getTime()
  if (restful) {
    return `?_t=${now}`
  }
  return { _t: now }
}
