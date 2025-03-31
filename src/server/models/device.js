import mongoose from 'mongoose'
import { idPlugin } from './plugin.js'

const schema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true,
    },
    online: {
      type: Boolean,
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
