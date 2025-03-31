import Aedes from 'aedes'
import { Log } from '../models/index.js'

const aedes = new Aedes()
// client.id => device.deviceId
const clientMap = {}

aedes.on('publish', async (packet, client) => {
  try {
    if (client) {
      console.log('publish222222222222222222222222222')
      const topic = packet.topic
      const deviceId = topic.split('/')[2]
      console.log('publish', client.id, packet.topic, packet.payload.length)
      if (topic.startsWith('device/online')) {
        clientMap[client.id] = deviceId
      }
    }
  } catch (e) {
    const log = await Log.create({
      time: Date.now(),
      operation: packet.topic,
      level: 'error',
      data: {
        address: client?.req?.socket?.remoteAddress,
        port: client?.req?.socket?.remotePort,
        error: e.message,
      },
    })
    console.log(log)
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
    aedes.publish({ qos: 2, topic: `device/offline/${deviceId}`, payload: '{}' })
    delete clientMap[client.id]
  } catch (e) {
    const log = await Log.create({
      time: Date.now(),
      operation: 'clientDisconnect',
      level: 'error',
      data: {
        address: client?.req?.socket?.remoteAddress,
        port: client?.req?.socket?.remotePort,
        error: e.message,
      },
    })
    console.log(log)
  }
})

export default aedes
