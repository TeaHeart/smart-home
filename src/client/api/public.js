import request from '../utils/request.js'

const prefix = '/public'

function getRoleList() {
  return request({
    method: 'get',
    url: `${prefix}/roleList`,
  })
}

function getStateList() {
  return request({
    method: 'get',
    url: `${prefix}/stateList`,
  })
}

function getTypeList() {
  return request({
    method: 'get',
    url: `${prefix}/typeList`,
  })
}

function getLevelList() {
  return request({
    method: 'get',
    url: `${prefix}/levelList`,
  })
}

export default {
  getRoleList,
  getStateList,
  getTypeList,
  getLevelList,
}
