import mongoose from 'mongoose'
import process from 'process'
import User, { userRoleList } from './user.js'
import Device from './device.js'
import Message, { messageTypeList } from './message.js'
import Rule from './rule.js'
import Log, { logLevelList } from './log.js'

export { User, userRoleList, Device, Message, messageTypeList, Rule, Log, logLevelList }

export default async function setupMongo() {
  await mongoose.connect(process.env.MONGO_URL)

  if ((await User.countDocuments()) === 0) {
    const user = await User.create({
      role: 'admin',
      username: 'sa',
      password: 'sa',
    })
    console.log('default admin created', user)
  }

  const user = await User.findOne({ username: 'sa' })

  if ((await Device.countDocuments()) === 0) {
    const device = await Device.create({
      deviceId: '00000000000000000000000000000000',
      online: false,
      model: {
        name: 'test device',
        properties: {
          property1: {
            type: 'boolean',
          },
        },
        services: {
          service1: {
            param1: {
              type: 'number',
            },
          },
        },
        events: {
          event1: {
            param1: {
              type: 'number',
            },
          },
        },
      },
      description: 'test device',
    })
    console.log('default device created', device)
  }

  const device = await Device.findOne({ deviceId: '00000000000000000000000000000000' })

  if ((await Message.countDocuments()) === 0) {
    const message = await Message.create({
      type: 'offline',
      device: device.id,
      time: Date.now(),
      data: device.model,
    })
    console.log('default message created', message)
  }

  if ((await Rule.countDocuments()) === 0) {
    const rule = await Rule.create({
      name: 'test rule',
      enabled: false,
      source: device.id,
      condition: 'property1 == 0',
      target: device.id,
      service: {
        service1: {
          param1: 1,
        },
      },
      description: 'test rule',
    })
    console.log('default rule created', rule)
  }

  if ((await Log.countDocuments()) === 0) {
    const log = await Log.create({
      level: 'info',
      user: user.id,
      time: Date.now(),
      operation: 'register',
      data: {
        test: user.toJSON(),
      },
    })
    console.log('default log created', log)
  }

  console.log('mongo is connected', process.env.MONGO_URL)
}
