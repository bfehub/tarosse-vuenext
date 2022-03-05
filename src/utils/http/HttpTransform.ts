export abstract class HttpTransform {
  /**
   * @description: 请求之前处理
   */
  beforeRequestHook?: (config: RequestConfig, options: RequestOptions) => RequestConfig

  /**
   * @description: 请求之后处理
   */
  transformRequestHook?: (result: TaroResponseResult, options: RequestOptions) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (error: TaroGeneral.CallbackResult, options: RequestOptions) => any

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (interceptor: Taro.Chain) => any

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (interceptor: Taro.Chain) => any

  /**
   * @description: 请求之前的错误拦截器
   */
  requestInterceptorsCatch?: (error: TaroGeneral.CallbackResult) => void

  /**
   * @description: 请求之后的错误拦截器
   */
  responseInterceptorsCatch?: (error: TaroGeneral.CallbackResult) => void
}
