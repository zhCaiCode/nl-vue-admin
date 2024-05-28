import request from '@/utils/request'

// 查询资源集合列表
export function listBox(query) {
  return request({
    url: '/resource/box/list',
    method: 'get',
    params: query
  })
}

// 查询资源集合详细
export function getBox(boxId) {
  return request({
    url: '/resource/box/' + boxId,
    method: 'get'
  })
}
export function listAll() {
  return request({
    url: '/resource/box/listAll',
    method: 'get'
  })
}

// 新增资源集合
export function addBox(data) {
  return request({
    url: '/resource/box',
    method: 'post',
    data: data
  })
}

// 修改资源集合
export function updateBox(data) {
  return request({
    url: '/resource/box',
    method: 'put',
    data: data
  })
}

// 删除资源集合
export function delBox(boxId) {
  return request({
    url: '/resource/box/' + boxId,
    method: 'delete'
  })
}
