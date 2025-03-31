import request from '../utils/request.js'

const prefix = '/overview'

function getOverview() {
  return request({
    method: 'get',
    url: prefix,
  })
}

export default {
  getOverview,
}
