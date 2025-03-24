import request from '../utils/request.js'

const prefix = '/user'

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
  list,
  getById,
}
