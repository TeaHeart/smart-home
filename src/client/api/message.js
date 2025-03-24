import request from '../utils/request.js'

const prefix = '/message'

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
  list,
  getById,
}
