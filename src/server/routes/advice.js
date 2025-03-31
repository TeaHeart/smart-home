import http from 'http'
import url from 'url'
import { Log } from '../models/index.js'

export class AppError extends Error {
  constructor(code = 400, message = http.STATUS_CODES[code], cause = undefined) {
    super(message)
    this.code = code
    this.message = message
    this.cause = cause
  }
}

export function parseQuery(req, res, next) {
  for (const key in req.query) {
    if (!isNaN(req.query[key])) {
      req.query[key] = Number(req.query[key])
    } else if (req.query[key] === 'true' || req.query[key] === 'false') {
      req.query[key] = req.query[key] === 'true'
    }
  }
  next()
}

export function logger(req, res, next) {
  const startTime = Date.now()
  res.on('finish', async () => {
    const responseTime = Date.now() - startTime
    let level = 'info'
    if (req.method !== 'GET') {
      level = 'warning'
    }
    const appError = res.getHeader('AppError')
    if (appError) {
      level = 'error'
    }
    const log = await Log.create({
      user: req.session.user?.id,
      time: startTime,
      operation: `${req.method} ${url.parse(req.originalUrl).pathname}`,
      level,
      data: {
        address: req.socket.remoteAddress,
        port: req.socket.remotePort,
        query: req.query,
        body: req.body,
        params: req.params,
        responseTime,
        code: res.statusCode,
        error: appError,
      },
    })
    console.log(log)
  })
  next()
}

export function authentication(req, res, next) {
  const user = req.session.user
  if (!user) {
    next(new AppError(401))
    return
  }
  if (user.role !== 'admin' && req.method !== 'GET') {
    next(new AppError(403))
    return
  }
  next()
}

// eslint-disable-next-line no-unused-vars
export async function errorHandler(err, req, res, next) {
  console.error(err)
  const code = Math.min(err.code, 500) || 500
  const message = err.message || http.STATUS_CODES[code] || 'Internal Server Error'
  const cause = err.cause || undefined
  res.setHeader('AppError', message)
  res.status(code).json({
    code,
    message,
    cause,
  })
}
