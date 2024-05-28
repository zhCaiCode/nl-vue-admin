import request from '@/utils/request'

// 查询运行环境列表
export function listEnv(query) {
  return request({
    url: '/centre/env/list',
    method: 'get',
    params: query
  })
}
// 查询运行环境列表
export function listAllEnv() {
  return request({
    url: '/centre/env/listAll',
    method: 'get'
  })
}
// 查询运行环境详细
export function getEnv(envId) {
  return request({
    url: '/centre/env/' + envId,
    method: 'get'
  })
}

// 新增运行环境
export function addEnv(data) {
  return request({
    url: '/centre/env',
    method: 'post',
    data: data
  })
}

// 修改运行环境
export function updateEnv(data) {
  return request({
    url: '/centre/env',
    method: 'put',
    data: data
  })
}

// 删除运行环境
export function delEnv(envId) {
  return request({
    url: '/centre/env/' + envId,
    method: 'delete'
  })
}
