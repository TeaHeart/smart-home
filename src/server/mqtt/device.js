import { Parser } from 'expr-eval'
import aedes from './aedes.js'
import { Device, Message, Rule } from '../models/index.js'

const parser = new Parser()

aedes.subscribe('device/online/+', async (packet, callback) => {
  try {
    const deviceId = packet.topic.split('/')[2]
    const model = JSON.parse(packet.payload.toString())
    const device = await Device.findOneAndUpdate(
      { deviceId },
      { state: 'online', model },
      { upsert: true, new: true },
    )
    if (!device) {
      throw new Error('device save or update failed')
    }
    const message = await Message.create({
      type: 'online',
      device: device.id,
      time: Date.now(),
      data: model,
    })
    if (!message) {
      throw new Error('create message failed')
    }
  } catch (e) {
    console.error(packet.topic, 'error', e)
  } finally {
    callback()
  }
})

aedes.subscribe('device/offline/+', async (packet, callback) => {
  try {
    const deviceId = packet.topic.split('/')[2]
    const device = await Device.findOneAndUpdate({ deviceId }, { state: 'offline' }, { new: true })
    if (!device) {
      throw new Error('device update failed')
    }
    const message = await Message.create({
      type: 'offline',
      device: device.id,
      time: Date.now(),
      data: {},
    })
    if (!message) {
      throw new Error('create message failed')
    }
  } catch (e) {
    console.error(packet.topic, 'error', e)
  } finally {
    callback()
  }
})

aedes.subscribe('device/upload/+', async (packet, callback) => {
  try {
    const deviceId = packet.topic.split('/')[2]
    const device = await Device.findOne({ deviceId })
    const data = JSON.parse(packet.payload.toString())
    if (!device) {
      throw new Error('device not found')
    }
    const message = await Message.create({
      type: 'upload',
      device: device.id,
      time: Date.now(),
      data,
    })
    if (!message) {
      throw new Error('create message failed')
    }
    const ruleList = await Rule.find({
      enabled: true,
      source: device.id,
    }).populate('target')
    for (const rule of ruleList) {
      const expr = parser.parse(rule.condition)
      if (expr.evaluate(data) === true) {
        aedes.publish({
          topic: `device/service/${rule.target.deviceId}`,
          payload: JSON.stringify(rule.service),
        })
      }
    }
  } catch (e) {
    console.error(packet.topic, 'error', e)
  } finally {
    callback()
  }
})

aedes.subscribe('device/event/+', async (packet, callback) => {
  try {
    const deviceId = packet.topic.split('/')[2]
    const device = await Device.findOne({ deviceId })
    const data = JSON.parse(packet.payload.toString())
    if (!device) {
      throw new Error('device not found')
    }
    const message = await Message.create({
      type: 'event',
      device: device.id,
      time: Date.now(),
      data,
    })
    if (!message) {
      throw new Error('create message failed')
    }
  } catch (e) {
    console.error(packet.topic, 'error', e)
  } finally {
    callback()
  }
})

aedes.subscribe('device/service/+', async (packet, callback) => {
  try {
    const deviceId = packet.topic.split('/')[2]
    const device = await Device.findOne({ deviceId })
    const data = JSON.parse(packet.payload.toString())
    if (!device) {
      throw new Error('device not found')
    }
    const message = await Message.create({
      type: 'service',
      device: device.id,
      time: Date.now(),
      data,
    })
    if (!message) {
      throw new Error('create message failed')
    }
  } catch (e) {
    console.error(packet.topic, 'error', e)
  } finally {
    callback()
  }
})
