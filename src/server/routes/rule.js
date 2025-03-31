import express from 'express'
import Rule from '../models/rule.js'

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    await Rule.create(req.body)
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
    await Rule.deleteOne({ _id: req.params.id })
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
    await Rule.updateOne({ _id: req.params.id }, req.body)
    res.json({
      code: 200,
      message: 'ok',
    })
  } catch (e) {
    next(e)
  }
})

router.put('/:id/enabled', async (req, res, next) => {
  try {
    await Rule.updateOne({ _id: req.params.id }, { enabled: req.body.enabled })
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
    let { curr, size, name, enabled, source, target } = req.query
    if (!curr || !size) {
      curr = 1
      size = 10
    }
    const filter = {}
    if (name) {
      filter.name = { $regex: name, $options: 'i' }
    }
    if (enabled !== undefined) {
      filter.enabled = enabled
    }
    if (source) {
      filter.source = source
    }
    if (target) {
      filter.target = target
    }
    const skip = (curr - 1) * size
    const data = await Rule.find(filter)
      .skip(skip)
      .limit(size)
      .populate('source', 'deviceId state model')
      .populate('target', 'deviceId state model')
    const total = await Rule.countDocuments(filter)
    res.json({
      code: 200,
      message: 'ok',
      data,
      search: {
        curr,
        size,
        total,
        name,
        enabled,
        source,
        target,
      },
    })
  } catch (e) {
    next(e)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const data = await Rule.findById(req.params.id)
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
