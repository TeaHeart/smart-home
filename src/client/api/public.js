import request from '../utils/request.js'

const prefix = '/public'

function getUserRoleList() {
  return request({
    method: 'get',
    url: `${prefix}/user/role`,
  })
}

function getMessageTypeList() {
  return request({
    method: 'get',
    url: `${prefix}/message/type`,
  })
}

function getLogLevelList() {
  return request({
    method: 'get',
    url: `${prefix}/log/level`,
  })
}

export default {
  getUserRoleList,
  getMessageTypeList,
  getLogLevelList,
}
