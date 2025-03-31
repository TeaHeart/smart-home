import express from 'express'
import { userRoleList, messageTypeList, logLevelList } from '../models/index.js'

const router = express.Router()

router.get('/user/role', async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: 'ok',
      data: userRoleList,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/message/type', async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: 'ok',
      data: messageTypeList,
    })
  } catch (e) {
    next(e)
  }
})

router.get('/log/level', async (req, res, next) => {
  try {
    res.json({
      code: 200,
      message: 'ok',
      data: logLevelList,
    })
  } catch (e) {
    next(e)
  }
})

export default router
