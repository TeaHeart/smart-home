import publicRouter from './public.js'
import authRouter from './auth.js'
import userRouter from './user.js'
import deviceRouter from './device.js'
import messageRouter from './message.js'
import ruleRouter from './rule.js'
import logRouter from './log.js'
import { AppError, parseQuery, logger, authentication, errorHandler } from './advice.js'
import setupExpress from './setup.js'

export {
  setupExpress,
  publicRouter,
  authRouter,
  userRouter,
  deviceRouter,
  messageRouter,
  ruleRouter,
  logRouter,
  AppError,
  parseQuery,
  logger,
  authentication,
  errorHandler,
}
