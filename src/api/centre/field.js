import request from '@/utils/request'

// 查询应用领域列表
export function listField(query) {
    return request({
        url: '/centre/field/list',
        method: 'get',
        params: query
    })
}
// 查询全部的领域列表
export function listAllField(query) {
    return request({
        url: '/centre/field/listAll',
        method: 'get',
        params: query
    })
}
// 查询应用领域详细
export function getField(fieldId) {
    return request({
        url: '/centre/field/' + fieldId,
        method: 'get'
    })
}

// 新增应用领域
export function addField(data) {
    return request({
        url: '/centre/field',
        method: 'post',
        data: data
    })
}

// 修改应用领域
export function updateField(data) {
    return request({
        url: '/centre/field',
        method: 'put',
        data: data
    })
}

// 删除应用领域
export function delField(fieldId) {
    return request({
        url: '/centre/field/' + fieldId,
        method: 'delete'
    })
}

export function getRelated(fieldld){
    return request({
        url:`/centre/field/getRelated/${fieldld}`,
        method:'get'
    })
}

export function setRelate(data){
    return request({
        url:'/centre/field/relate',
        method:'post',
        data
    })
}