import express from 'express'
import Log from '../models/log.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const { curr, size, user, level } = req.query
    const skip = (curr - 1) * size
    const filter = {}
    if (user) {
      filter.user = user
    }
    if (level) {
      filter.level = level
    }
    const data = await Log.find(filter)
      .skip(skip)
      .limit(size)
      .sort({ time: -1 })
      .populate('user', 'username')
    const total = await Log.countDocuments(filter)
    res.json({
      code: 200,
      message: 'OK',
      data,
      search: {
        curr,
        size,
        total,
        user,
        level,
      },
    })
  } catch (e) {
    next(e)
  }
})

export default router
