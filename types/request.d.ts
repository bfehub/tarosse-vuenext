/**
 * @description 响应类型
 */
declare interface ResponseResult<T = any> {
  msg: string
  code: number
  data: T
}

declare type TaroResponseResult = Taro.request.SuccessCallbackResult<ResponseResult>

/**
 * @description 请求类型
 */
declare interface RequestOptions {
  /**
   * 基础请求路径
   */
  apiUrl?: string

  /**
   * 是否开启 Loading
   */
  isShowLoading?: boolean

  /**
   * 是否返回原始响应 SuccessCallbackResult
   */
  isNativeResponse?: boolean

  /**
   * 是否处理响应数据，不处理可以获取到 code、data 等信息
   */
  isTransformResponse?: boolean
}

declare type RequestConfig = Taro.request.Option
