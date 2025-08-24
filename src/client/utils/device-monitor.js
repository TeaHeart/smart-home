import mqtt from 'mqtt'

export default class DeviceMonitor {
  constructor(device) {
    this.deviceId = device.deviceId
    this.online = device.online
    this.model = device.model
    this.description = device.description
    this.properties = {}
    this.events = []
  }

  connect() {
    this.disconnect()
    this.client = mqtt.connect(import.meta.env.VITE_MQTT_SOCKET_URL)
    this.client.on('connect', () => {
      this.client.subscribe(`device/online/${this.deviceId}`, { qos: 2 })
      this.client.subscribe(`device/upload/${this.deviceId}`)
      this.client.subscribe(`device/event/${this.deviceId}`, { qos: 2 })
      this.client.subscribe(`device/offline/${this.deviceId}`, { qos: 2 })
      this.client.on('message', (topic, payload) => {
        try {
          const split = topic.split('/', 2)
          topic = `${split[0]}/${split[1]}`
          payload = JSON.parse(payload.toString())
          console.log('subscribe', topic, payload)
          this.handlerMessage(topic, payload)
        } catch (e) {
          console.error('handlerMessage', e)
        }
      })
    })
  }

  disconnect() {
    this.client?.end()
    this.client = null
  }

  services(service, data) {
    console.log(this.model.name, this.deviceId, 'service', service)
    this.client?.publish(
      `device/service/${this.deviceId}`,
      JSON.stringify({
        service,
        data,
      }),
      {
        qos: 2,
      },
    )
  }

  handlerMessage(topic, message) {
    switch (topic) {
      case 'device/online':
        this.online = true
        break
      case 'device/upload':
        Object.assign(this.properties, message)
        break
      case 'device/event':
        this.events.unshift(message)
        if (this.events.length > 10) {
          this.events.pop()
        }
        break
      case 'device/offline':
        this.online = false
        break
    }
  }
}
