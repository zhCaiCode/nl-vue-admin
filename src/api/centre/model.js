import request from '@/utils/request'


// 查询型号列表
export function listModel(query) {
    return request({
        url: '/centre/model/list',
        method: 'get',
        params: query
    })
}
// 查询型号列表
export function listAllModel(query) {
    return request({
        url: '/centre/model/listAll',
        method: 'get',
        params: query
    })
}

// 查询型号详细
export function getModel(modelId) {
    return request({
        url: '/centre/model/' + modelId,
        method: 'get'
    })
}

// 新增型号
export function addModel(data) {
    return request({
        url: '/centre/model',
        method: 'post',
        data: data
    })
}

// 修改型号
export function updateModel(data) {
    return request({
        url: '/centre/model',
        method: 'put',
        data: data
    })
}

// 删除型号
export function delModel(modelId) {
    return request({
        url: '/centre/model/' + modelId,
        method: 'delete'
    })
}

export function getRelatedFields(modelId){
    return request({
        url:`/centre/model/getRelatedFields/${modelId}`,
        method:'get'
    })
}


export function relatedFields(data){
    return request({
        url:`/centre/model/relatedFields`,
        method:'post',
        data
    })
}