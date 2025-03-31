import setupMongo from './models/index.js'
import setupMqtt from './mqtt/index.js'
import setupExpress from './routes/index.js'

const startTime = Date.now()

await setupMongo()
await setupMqtt()
await setupExpress()

console.log('server startup using:', Date.now() - startTime, 'ms')
