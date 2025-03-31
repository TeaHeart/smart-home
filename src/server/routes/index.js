import express from 'express'
import session from 'cookie-session'
import cors from 'cors'
import process from 'process'
import ViteExpress from 'vite-express'
import publicRouter from './public.js'
import authRouter from './auth.js'
import userRouter from './user.js'
import deviceRouter from './device.js'
import messageRouter from './message.js'
import ruleRouter from './rule.js'
import logRouter from './log.js'
import { AppError, parseQuery, logger, authentication, errorHandler } from './advice.js'

export { AppError }

export default function setupExpress() {
  return new Promise((resolve) => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    app.use(
      session({
        secret: process.env.VITE_APP_NAME,
        maxAge: 24 * 60 * 60 * 1000,
      }),
    )
    app.use('/api', parseQuery)
    app.use('/api', logger)
    app.use('/api/public', publicRouter)
    app.use('/api/auth', authRouter)
    app.use('/api', authentication)
    app.use('/api/user', userRouter)
    app.use('/api/device', deviceRouter)
    app.use('/api/message', messageRouter)
    app.use('/api/rule', ruleRouter)
    app.use('/api/log', logRouter)
    app.use('/api', errorHandler)

    ViteExpress.listen(app, process.env.VITE_SERVER_PORT, () => {
      console.log('express is running on', process.env.VITE_SERVER_URL)
      resolve()
    })
  })
}
