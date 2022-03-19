import { isDef } from '@/utils/is'

/**
 * 用于转换各种风格的返回最新结构的统一格式
 * @param data 原数据
 * @returns ResponseResult
 */
export function normalizeResponse(data: any): ResponseResult {
  const result = {} as ResponseResult

  // error
  if (!data) return data

  // style 1
  if (isDef(data.Body)) {
    result.data = data.Body
  }
  if (isDef(data.StatusCode)) {
    result.code = data.StatusCode
    if (data.StatusCode === 1) result.code = 200
  }
  if (isDef(data.StatusMsg)) {
    result.msg = data.StatusMsg
  }

  // style 2
  if (isDef(data.body)) {
    result.data = data.body
  }
  if (isDef(data.statusCode)) {
    result.code = data.statusCode
    if (data.statusCode === 1) result.code = 200
  }
  if (isDef(data.statusMsg)) {
    result.msg = data.statusMsg
  }

  // style 3
  if (isDef(data.data)) {
    result.data = data.data
  }
  if (isDef(data.code)) {
    result.code = data.code
    if (data.code === 1) result.code = 200
  }
  if (isDef(data.message)) {
    result.msg = data.message
  }

  return result
}
