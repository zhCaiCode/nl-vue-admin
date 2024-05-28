import request from '@/utils/request'

export const getDownloadCountApi = (resourceId) => {
  return request({
    url: '/search/download/count/' + resourceId,
    method: 'get'
  })
}
export const getListApi = (params) => {
  return request({
    url: '/search/list',
    method: 'get',
    params
  })
}
export const getRankApi = () => {
  return request({
    url: '/search/rank/resource/home',
    method: 'get',
  })
}
