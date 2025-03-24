import express from 'express'
import User from '../models/user.js'
import { AppError } from './advice.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await User.create(req.body)
    res.json({
      code: 200,
      message: 'OK',
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
      message: 'OK',
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
      message: 'OK',
    })
  } catch (e) {
    next(e)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const { curr, size } = req.query
    const skip = (curr - 1) * size
    const data = await User.find().skip(skip).limit(size)
    const total = await User.countDocuments()
    res.json({
      code: 200,
      message: 'OK',
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
      message: 'OK',
      data,
    })
  } catch (e) {
    next(e)
  }
})

export default router
