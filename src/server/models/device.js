import mongoose from 'mongoose'
import { idPlugin } from './plugin.js'

export const stateList = ['online', 'offline']

const schema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },
    state: {
      type: String,
      enum: stateList,
      required: true,
    },
    model: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
    },
  },
  {
    virtuals: true,
    minimize: false,
  },
)

schema.plugin(idPlugin)

export default mongoose.model('Device', schema)
