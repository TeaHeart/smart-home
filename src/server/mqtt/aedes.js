import Aedes from 'aedes'

const aedes = new Aedes()
const clientMap = {} // client.id => device.deviceId

aedes.on('publish', (packet, client) => {
  try {
    if (client) {
      const topic = packet.topic
      const deviceId = topic.split('/')[2]
      console.log('publish', client.id, packet.topic, packet.payload.length)
      if (topic.startsWith('device/online')) {
        clientMap[client.id] = deviceId
      }
    }
  } catch (e) {
    console.error('publish error', e)
  }
})

aedes.on('clientDisconnect', async (client) => {
  try {
    const deviceId = clientMap[client.id]
    console.log('clientDisconnect', client.id, deviceId)
    if (!deviceId) {
      console.log('device not found', deviceId)
      delete clientMap[client.id]
      return
    }
    aedes.publish({ topic: `device/offline/${deviceId}`, payload: '{}' })
    delete clientMap[client.id]
  } catch (e) {
    console.error('clientDisconnect error', e)
  }
})

export default aedes
