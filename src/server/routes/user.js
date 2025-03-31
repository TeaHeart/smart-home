import express from 'express'
import User from '../models/user.js'
import { AppError } from './advice.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await User.create(req.body)
    res.json({
      code: 200,
      message: 'ok',
    })
  } catch (e) {
    next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id)
    if (data.username === 'sa') {
      throw new AppError(403, 'cannot delete default user sa')
    }
    await User.deleteOne({ _id: req.params.id })
    res.json({
      code: 200,
      message: 'ok',
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id)
    if (data.username === 'sa') {
      throw new AppError(403, 'cannot update default user sa')
    }
    await User.updateOne({ _id: req.params.id }, req.body)
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
    let { curr, size } = req.query
    if (!curr || !size) {
      curr = 1
      size = 10
    }
    if (size === -1) {
      curr = 1
      size = 1000
    }
    const skip = (curr - 1) * size
    const data = await User.find().skip(skip).limit(size)
    const total = await User.countDocuments()
    res.json({
      code: 200,
      message: 'ok',
      data,
      search: {
        curr,
        size,
        total,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id)
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
