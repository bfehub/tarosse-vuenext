import Taro from '@tarojs/taro'
import { ResultEnum } from '@/enums/httpEnum'

export function checkCode(data: ResponseResult): ResponseResult {
  if (data.code === ResultEnum.ERROR) {
    Taro.showToast({
      title: data.msg || '服务错误',
      icon: 'error',
    })
  } else if (data.code === ResultEnum.TIMEOUT) {
    Taro.showToast({
      title: data.msg || '请求超时',
      icon: 'error',
    })
  }

  return data
}
