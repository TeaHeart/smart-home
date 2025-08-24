import mongoose from 'mongoose'
import process from 'process'
import User, { userRoleList } from './user.js'
import Device from './device.js'
import Message, { messageTypeList } from './message.js'
import Rule from './rule.js'
import Log, { logLevelList } from './log.js'

export { User, userRoleList, Device, Message, messageTypeList, Rule, Log, logLevelList }

export default async function setupMongo() {
  await mongoose.connect(process.env.MONGO_URL)

  const user = await User.findOne({ username: 'sa' })

  if (!user) {
    const adminUser = await User.create({
      role: 'admin',
      username: 'sa',
      password: 'sa',
    })
    console.log('default admin created', adminUser)
  }

  console.log('mongo is connected', process.env.MONGO_URL)
}
