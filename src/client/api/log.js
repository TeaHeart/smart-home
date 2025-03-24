import request from '../utils/request.js'

const prefix = '/log'

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
