import express from 'express'
import Device from '../models/device.js'

const router = express.Router()

router.put('/:id/description', async (req, res, next) => {
  try {
    await Device.updateOne({ _id: req.params.id }, { description: req.body.description })
    res.json({
      code: 200,
      message: 'ok',
    })
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let { curr, size, online, description } = req.query
    if (!curr || !size) {
      curr = 1
      size = 10
    }
    if (size === -1) {
      curr = 1
      size = 1000
    }
    const filter = {}
    if (online !== undefined) {
      filter.online = online
    }
    if (description) {
      filter.description = { $regex: description, $options: 'i' }
    }
    const skip = (curr - 1) * size
    const data = await Device.find(filter).skip(skip).limit(size)
    const total = await Device.countDocuments(filter)
    res.json({
      code: 200,
      message: 'ok',
      data,
      search: {
        curr,
        size,
        total,
        online,
        description,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Device.findById(req.params.id)
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
