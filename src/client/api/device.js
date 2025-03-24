import request from '../utils/request.js'

const prefix = '/device'

function updateDescriptionById(id, data) {
  return request({
    method: 'put',
    url: `${prefix}/${id}/description`,
    data: { description: data.description },
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

function getStateList() {
  return request({
    method: 'get',
    url: `${prefix}/stateList`,
  })
}

export default {
  updateDescriptionById,
  list,
  getById,
  getStateList,
}
