import request from '@/utils/request'

// 查询文件类型列表
export function listType(query) {
  return request({
    url: '/centre/type/list',
    method: 'get',
    params: query
  })
}

// 查询文件类型列表
export function listAllType(query) {
  return request({
    url: '/centre/type/listAll',
    method: 'get',
    params: query
  })
}

// 查询文件类型详细
export function getType(typeId) {
  return request({
    url: '/centre/type/' + typeId,
    method: 'get'
  })
}

// 新增文件类型
export function addType(data) {
  return request({
    url: '/centre/type',
    method: 'post',
    data: data
  })
}

// 修改文件类型
export function updateType(data) {
  return request({
    url: '/centre/type',
    method: 'put',
    data: data
  })
}

// 删除文件类型
export function delType(typeId) {
  return request({
    url: '/centre/type/' + typeId,
    method: 'delete'
  })
}

export function getEnvs({ typeId }) {
  return request({
    url: `/centre/type/getEnvs/${typeId}`,
    method: 'get'
  })
}
