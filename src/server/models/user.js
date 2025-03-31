import mongoose from 'mongoose'
import { idPlugin } from './plugin.js'

export const userRoleList = ['admin', 'user']

const schema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: userRoleList,
      required: false,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    virtuals: true,
    minimize: false,
  },
)

schema.plugin(idPlugin)

export default mongoose.model('User', schema)
