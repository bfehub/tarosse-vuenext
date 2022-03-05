import { defHttp } from '@/utils/http'
import type { UserInfoModel } from './model/appModel'

enum Api {
  GetUser = '/api/user',
  GetList = '/api/list',
}

/**
 * @author your name
 * @date 2021-09-12 21:36:52
 * @description 获取信息
 */
export function getUser() {
  return defHttp.get<UserInfoModel>({
    url: Api.GetUser,
  })
}

/**
 * @author your name
 * @date 2021-09-12 21:36:52
 * @description 获取列表
 */
export function getList(data: object) {
  return defHttp.get<UserInfoModel[]>({
    url: Api.GetList,
    data,
  })
}
