import express from 'express'
import Device from '../models/device.js'

const router = express.Router()

router.put('/:id/description', async (req, res, next) => {
  try {
    await Device.updateOne({ _id: req.params.id }, { description: req.body.description })
    res.json({
      code: 200,
      message: 'OK',
    })
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    let { curr, size, state, description } = req.query
    if (size === -1) {
      curr = 1
      size = 1000
    }
    const filter = {}
    if (state !== undefined) {
      filter.state = state
    }
    if (description) {
      filter.description = { $regex: description, $options: 'i' }
    }
    const skip = (curr - 1) * size
    const data = await Device.find(filter).skip(skip).limit(size)
    const total = await Device.countDocuments(filter)
    res.json({
      code: 200,
      message: 'OK',
      data,
      search: {
        curr,
        size,
        total,
        state,
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
      message: 'OK',
      data,
    })
  } catch (e) {
    next(e)
  }
})

export default router
