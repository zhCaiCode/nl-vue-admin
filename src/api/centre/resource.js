import request from '@/utils/request'

// 新增资源
export function send(data) {
  return request({
    url: '/centre/resource/send',
    method: 'post',
    data: data
  })
}

export function getList(params) {
  return request({
    url: '/centre/resource/list',
    method: 'get',
    params
  })
}

export function deleteResource(resourceIds) {
  return request({
    url: '/centre/resource/' + resourceIds,
    method: 'delete'
  })
}

export function getVersionList(params) {
  return request({
    url: '/centre/version/list',
    method: 'get',
    params
  })
}

export function updateResource(data) {
  return request({
    url: '/centre/resource',
    method: 'put',
    data
  })
}

export function delVersion(versionIds) {
  return request({
    url: '/centre/version/' + versionIds,
    method: 'delete'
  })
}

export function updateVersion(data) {
  return request({
    url: '/centre/version',
    method: 'put',
    data
  })

}
