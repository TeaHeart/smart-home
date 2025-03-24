import express from 'express'
import { User } from '../models/index.js'
import { AppError } from './index.js'

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    req.body.role = 'user'
    await User.create(req.body)
    res.json({
      code: 200,
      message: 'OK',
    })
  } catch (e) {
    next(e)
  }
})

router.post('/login', async (req, res, next) => {
  try {
    const data = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    })
    if (!data) {
      throw new AppError(401, 'username or password is incorrect')
    }
    req.session.user = data
    res.json({
      code: 200,
      message: 'OK',
      data,
    })
  } catch (e) {
    next(e)
  }
})

router.post('/logout', async (req, res, next) => {
  try {
    req.session.user = null
    res.json({
      code: 200,
      message: 'OK',
    })
  } catch (e) {
    next(e)
  }
})

router.get('/me', async (req, res, next) => {
  try {
    let data = req.session.user
    if (data) {
      data = await User.findById(data.id)
      req.session.user = data
    }
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
