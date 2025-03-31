import express from 'express'
import Message from '../models/message.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    let { curr, size, type, device } = req.query
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

export default router
