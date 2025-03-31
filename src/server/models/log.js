import mongoose from 'mongoose'
import { idPlugin } from './plugin.js'

export const logLevelList = ['info', 'warning', 'error']

const schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    level: {
      type: String,
      enum: logLevelList,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    operation: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
    },
  },
  {
    virtuals: true,
    minimize: false,
  },
)

schema.plugin(idPlugin)

export default mongoose.model('Log', schema)
