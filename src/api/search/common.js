import request from '@/utils/request'

export const getCategoryApi = (params) => {
  return request({
    url: '/search/categorie',
    method: 'get',
    params
  })
}
export const getModelApi = (params) => {
  return request({
    url: '/search/models',
    method: 'get',
    params
  })
}
export const getTypesApi = () => {
  return request({
    url: '/search/types/',
    method: 'get'
  })
}
export const getVersionsApi = (resourceId) => {
  return request({
    url: '/search/versions/' + resourceId,
    method: 'get'
  })
}
export const getEntireRankApi = (resourceId) => {
  return request({
    url: '/search/rank/resource/list',
    method: 'get'
  })
}
export function getVersions(resourceId) {
  return request({
    url: '/search/versions/'+resourceId,
    method: 'get'
  })
}
