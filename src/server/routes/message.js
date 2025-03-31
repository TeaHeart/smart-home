import express from 'express'
import { Device, Message, messageTypeList } from '../models/index.js'
import { AppError } from './advice.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    let { curr, size, type, device } = req.query
    if (size === -1) {
      curr = 1
      size = 1000
    }
    if (!curr || !size) {
      curr = 1
      size = 10
    }
    const filter = {}
    if (type) {
      filter.type = type
    }
    if (device) {
      filter.device = device
    }
    const skip = (curr - 1) * size
    const data = await Message.find(filter)
      .sort({ time: -1 })
      .skip(skip)
      .limit(size)
      .populate('device', 'deviceId state model.name')
    const total = await Message.countDocuments(filter)
    res.json({
      code: 200,
      message: 'ok',
      data,
      search: {
        curr,
        size,
        total,
        type,
        device,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Message.findById(req.params.id)
    res.json({
      code: 200,
      message: 'ok',
      data,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/history/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    let { timeRange } = req.query
    if (!timeRange || timeRange.length !== 2) {
      let end = new Date()
      let start = new Date()
      start.setHours(end.getHours() - 1)
      timeRange = [start, end]
    }
    const device = await Device.findById(id)
    if (!device) {
      throw new AppError(400, 'device not found')
    }
    const data = {
      time: [],
      history: {},
      stats: {
        online: 0,
        upload: 0,
        service: 0,
        event: 0,
        offline: 0,
      },
      message: {
        online: [],
        upload: [],
        service: [],
        event: [],
        offline: [],
      },
    }
    // history
    for (const key in device.model.properties) {
      data.history[key] = []
    }
    const messageList = await Message.find({
      time: {
        $gte: new Date(timeRange[0]),
        $lte: new Date(timeRange[1]),
      },
      device: id,
      type: 'upload',
    })
      .sort({ time: -1 })
      .select('time data')
    for (let i = messageList.length - 1; i >= 0; i--) {
      const item = messageList[i]
      data.time.push(item.time)
      for (const key in item.data) {
        data.history[key].push(item.data[key])
      }
    }
    // stats
    const stats = await Message.aggregate([
      {
        $match: {
          time: {
            $gte: new Date(timeRange[0]),
            $lte: new Date(timeRange[1]),
          },
          device: device._id,
        },
      },
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
        },
      },
    ])
    stats.forEach((stat) => {
      data.stats[stat._id] = stat.count
    })
    // message
    for (const type of messageTypeList) {
      const messages = await Message.find({
        time: {
          $gte: new Date(timeRange[0]),
          $lte: new Date(timeRange[1]),
        },
        device: id,
        type,
      })
        .sort({ time: -1 })
        .limit(10)
      data.message[type] = messages
    }
    res.json({
      code: 200,
      message: 'ok',
      data,
    })
  } catch (e) {
    next(e)
  }
})

export default router
