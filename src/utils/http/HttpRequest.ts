import Taro from '@tarojs/taro'
import { RequestEnum } from '@/enums/httpEnum'
import { deepClone, deepMerge } from '@/utils'
import { isFunction } from '@/utils/is'
import { HttpTransform } from './HttpTransform'

/**
 * @description 请求基础类
 */
export class HttpRequest {
  private readonly config: Partial<RequestConfig>
  private readonly options: RequestOptions
  private readonly transform: HttpTransform

  constructor(config: Partial<RequestConfig>, options: RequestOptions, transform: HttpTransform) {
    this.config = config
    this.options = options
    this.transform = transform
  }

  get<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.GET }, options)
  }

  post<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.POST }, options)
  }

  put<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.PUT }, options)
  }

  delete<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.DELETE }, options)
  }

  request<T = any>(config: RequestConfig, options?: RequestOptions): Promise<T> {
    // 合并默认配置和接口请求配置
    let conf: RequestConfig = deepMerge(deepClone(this.config), config)
    const opts: RequestOptions = deepMerge(deepClone(this.options), options)
    const { beforeRequestHook, transformRequestHook, requestCatchHook } = this.transform || {}

    // HOOK: 请求之前处理
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opts)
    }

    return new Promise((resolve, reject) => {
      Taro.request({
        ...conf,
        success(result) {
          // HOOK: 请求之后处理，不符合格式抛出错误
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(result, opts)
              resolve(ret)
            } catch (error) {
              reject(error.message)
            }
          }
        },
        fail(error) {
          // HOOK: 请求失败处理
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(error, opts))
          }
        },
      })
    })
  }
}
