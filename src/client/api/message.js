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

function listHistory(data) {
  return request({
    method: 'get',
    url: `${prefix}/history/${data.deviceId}`,
    data,
  })
}

export default {
  list,
  getById,
  listHistory,
}
