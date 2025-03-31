import mongoose from 'mongoose'
import { idPlugin } from './plugin.js'

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    enabled: {
      type: Boolean,
      required: true,
    },
    source: {
      type: mongoose.Types.ObjectId,
      ref: 'Device',
      required: true,
      index: true,
    },
    condition: {
      type: String,
      required: true,
    },
    target: {
      type: mongoose.Types.ObjectId,
      ref: 'Device',
      required: true,
      index: true,
    },
    service: {
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

export default mongoose.model('Rule', schema)
