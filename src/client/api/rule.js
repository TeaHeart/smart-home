import request from '../utils/request.js'

const prefix = '/rule'

function add(data) {
  return request({
    method: 'post',
    url: prefix,
    data,
  })
}

function deleteById(id) {
  return request({
    method: 'delete',
    url: `${prefix}/${id}`,
  })
}

function updateById(id, data) {
  return request({
    method: 'put',
    url: `${prefix}/${id}`,
    data,
  })
}

function updateEnabledById(id, data) {
  return request({
    method: 'put',
    url: `${prefix}/${id}/enabled`,
    data: { enabled: data.enabled },
  })
}

function list(data) {
  return request({
    method: 'get',
    url: prefix,
    data,
  })
}

function getById(id) {
  return request({
    method: 'get',
    url: `${prefix}/${id}`,
  })
}

export default {
  add,
  deleteById,
  updateById,
  updateEnabledById,
  list,
  getById,
}
