import net from 'net'
import http from 'http'
import ws from 'websocket-stream'
import process from 'process'
import aedes from './aedes.js'
import './device.js'

export default function setupMqtt() {
  return new Promise((resolve) => {
    let mqttServerReady = false
    let socketServerReady = false

    function checkReady() {
      if (mqttServerReady && socketServerReady) {
        resolve()
      }
    }

    const mqttServer = net.createServer(aedes.handle)
    mqttServer.listen(process.env.VITE_MQTT_PORT, () => {
      console.log('mqtt broker is running on', process.env.VITE_MQTT_URL)
      mqttServerReady = true
      checkReady()
    })

    const webSocketServer = http.createServer()
    ws.createServer({ server: webSocketServer }, aedes.handle)
    webSocketServer.listen(process.env.VITE_MQTT_SOCKET_PORT, () => {
      console.log('websocket server is running on', process.env.VITE_MQTT_SOCKET_URL)
      socketServerReady = true
      checkReady()
    })
  })
}
