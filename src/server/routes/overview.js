import express from 'express'
import { User, Device, Message, messageTypeList, Rule, Log, logLevelList } from '../models/index.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = { user: {}, device: {}, message: {}, rule: {}, log: {} }

    const [userCounts, deviceCounts, messageCounts, ruleCounts, logCounts] = await Promise.all([
      User.countDocuments(),
      // Device counts (online/total)
      Device.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            online: {
              $sum: { $cond: [{ $eq: ['$online', true] }, 1, 0] },
            },
          },
        },
      ]),
      // Message counts by type
      Message.aggregate([
        {
          $group: {
            _id: '$type',
            count: { $sum: 1 },
          },
        },
      ]),
      // Rule counts (enabled/total)
      Rule.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: 1 },
            enabled: {
              $sum: { $cond: [{ $eq: ['$enabled', true] }, 1, 0] },
            },
          },
        },
      ]),
      // Log counts by level
      Log.aggregate([
        {
          $group: {
            _id: '$level',
            count: { $sum: 1 },
          },
        },
      ]),
    ])

    console.log('!!!!', userCounts, deviceCounts, messageCounts, ruleCounts, logCounts)

    data.user.total = userCounts || 0

    // Process device counts
    data.device.total = deviceCounts[0]?.total || 0
    data.device.online = deviceCounts[0]?.online || 0

    // Process message counts
    messageTypeList.forEach((type) => {
      data.message[type] = messageCounts.find((m) => m._id === type)?.count || 0
    })

    // Process rule counts
    data.rule.total = ruleCounts[0]?.total || 0
    data.rule.enabled = ruleCounts[0]?.enabled || 0

    // Process log counts
    logLevelList.forEach((level) => {
      data.log[level] = logCounts.find((l) => l._id === level)?.count || 0
    })

    console.log(data)

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
