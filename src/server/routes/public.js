import express from 'express'
import { roleList, stateList, typeList, levelList } from '../models/index.js'

const router = express.Router()

router.get('/roleList', async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: 'OK',
      data: roleList,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/stateList', async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: 'OK',
      data: stateList,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/typeList', async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: 'OK',
      data: typeList,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/levelList', async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: 'OK',
      data: levelList,
    })
  } catch (e) {
    next(e)
  }
})

export default router
