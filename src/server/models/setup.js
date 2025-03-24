import mongoose from 'mongoose'
import process from 'process'
import { User, Device, Message, Rule, Log } from './index.js'

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
      state: 'offline',
      model: {
        name: 'test device',
        properties: {
          property1: {
            type: 'boolean',
          },
          property2: {
            type: 'number',
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
      type: 'online',
      device: device.id,
      time: Date.now(),
      data: device.model,
    })
    console.log('default message created', message)
  }

  if ((await Rule.countDocuments()) === 0) {
    const rule = await Rule.create({
      name: 'test rule',
      enabled: true,
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
