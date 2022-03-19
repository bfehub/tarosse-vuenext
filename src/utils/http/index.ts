import { deepMerge, timestamp } from '@/utils'
import { isString } from '@/utils/is'
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum'
import { HttpRequest } from './HttpRequest'
import { HttpTransform } from './HttpTransform'
import { showFullScreenLoading, hideFullScreenLoading } from './helper/loading'
import { checkCode } from './helper/checkCode'
// import { normalizeResponse } from './helper/normalizeResponse'

export interface CreateRequestOptions {
  config?: Partial<RequestConfig>
  options?: RequestOptions
}

/**
 * @description: 数据处理，方便区分多种处理方式
 */
export const transform: HttpTransform = {
  /**
   * @description: 请求之前处理
   */
  beforeRequestHook(config, options) {
    options.isShowLoading && showFullScreenLoading()

    // 拼接全路径
    if (options.apiUrl && isString(options.apiUrl)) {
      config.url = `${options.apiUrl}${config.url}`
    }

    // 添加请求令牌
    // if (!config.header) {
    //   config.header = {}
    // }
    // config.header['Rxjy-Token'] = store.getters.token

    // 时间戳参数避免从缓存中拿数据
    if (config.method === RequestEnum.GET) {
      if (!isString(config.data)) {
        config.data = Object.assign(config.data || {}, timestamp(true, false))
      } else {
        config.url = config.url + timestamp(true, true)
      }
    }

    return config
  },

  /**
   * @description: 请求之后处理，不符合格式抛出错误
   */
  transformRequestHook(result, options) {
    options.isShowLoading && hideFullScreenLoading()

    // 是否返回原生响应头
    // 比如需要获取响应头时使用该属性
    if (options.isNativeResponse) {
      return result
    }

    // 不进行任何处理直接返回
    // 用于页面代码可能需要直接获取 code, data, msg 这些信息时开启
    if (!options.isTransformResponse) {
      return result.data
    }

    // 这里为后台统一的字段，可以在此做数据转化
    // const data = normalizeResponse(result.data)
    const data = result.data
    if (!data) {
      throw new Error('请求出错，请稍后重试')
    }

    // 这里为后台统一的字段，可以在此判断返回格式
    if (data.code === ResultEnum.SUCCESS) {
      return data.data
    } else {
      checkCode(data)
    }

    throw new Error(data.msg)
  },

  /**
   * @description: 请求失败处理
   */
  requestCatchHook(error, options) {
    options.isShowLoading && hideFullScreenLoading()
    return error.errMsg
  },
}

/**
 * @description: 创建实例
 */
export function createRequest(opt?: Partial<CreateRequestOptions>) {
  return new HttpRequest(
    // Taro.request defalut https://taro-docs.jd.com/taro/docs/apis/network/request/
    deepMerge(
      {
        timeout: 6 * 1000,
        header: {
          'Content-Type': ContentTypeEnum.JSON,
        },
      },
      opt?.config || {}
    ),
    // CreateRequestOptions.options defalut
    deepMerge(
      {
        isShowLoading: true,
        isNativeResponse: false,
        isTransformResponse: true,
      },
      opt?.options || {}
    ),
    transform
  )
}

/**
 * 默认请求
 */
export const defHttp = createRequest({
  options: {
    apiUrl: 'http://127.0.0.1:9527',
  },
})

/**
 * 其他请求
 */
// export const outHttp = createRequest({
//   options: {
//     apiUrl: 'http://127.0.0.1:9527',
//   },
// })
