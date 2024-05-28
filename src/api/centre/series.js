import request from '@/utils/request'

// 查询型号系列列表
export function listSeries(query) {
  return request({
    url: '/centre/series/list',
    method: 'get',
    params: query
  })
}

export function listAllSeries(query) {
  return request({
    url: '/centre/series/listAll',
    method: 'get',
    params: query
  })
}

// 查询型号系列详细
export function getSeries(seriesId) {
  return request({
    url: '/centre/series/' + seriesId,
    method: 'get'
  })
}

// 新增型号系列
export function addSeries(data) {
  return request({
    url: '/centre/series',
    method: 'post',
    data: data
  })
}

// 修改型号系列
export function updateSeries(data) {
  return request({
    url: '/centre/series',
    method: 'put',
    data: data
  })
}

// 删除型号系列
export function delSeries(seriesId) {
  return request({
    url: '/centre/series/' + seriesId,
    method: 'delete'
  })
}

export function getModelIds(data) {

  return request({
    url: '/centre/series/getModelIds',
    method: 'post',
    data
  })

}
