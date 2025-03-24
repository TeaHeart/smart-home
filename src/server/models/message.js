import mongoose from 'mongoose'
import { idPlugin } from './plugin.js'

export const typeList = ['online', 'upload', 'service', 'event', 'offline']

const schema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: typeList,
      required: true,
    },
    device: {
      type: mongoose.Types.ObjectId,
      ref: 'Device',
      required: true,
      index: true,
    },
    time: {
      type: Date,
      required: true,
      index: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  {
    virtuals: true,
    minimize: false,
  },
)

schema.plugin(idPlugin)

export default mongoose.model('Message', schema)
