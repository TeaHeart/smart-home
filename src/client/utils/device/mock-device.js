import mqtt from 'mqtt'

export default class MockDevice {
  constructor(deviceId, model) {
    this.deviceId = deviceId
    this.model = model
    this.isAutoMode = false
  }

  connect() {
    this.disconnect()
    this.client = mqtt.connect(import.meta.env.VITE_MQTT_SOCKET_URL)
    this.client.on('connect', () => {
      this.client.subscribe(`device/service/${this.deviceId}`, { qos: 2 })
      this.client.on('message', (topic, payload) => {
        try {
          payload = JSON.parse(payload.toString())
          this.handlerMessage(payload)
        } catch (e) {
          console.error('handlerMessage', e)
        }
      })
      this.online()
    })
  }

  disconnect() {
    this.client?.end()
    this.client = null
  }

  online() {
    console.log(this.model.name, this.deviceId, 'online')
    this.client?.publish(`device/online/${this.deviceId}`, JSON.stringify(this.model), { qos: 2 })
  }

  upload() {
    console.log(this.model.name, this.deviceId, 'upload', this.properties)
    this.client?.publish(`device/upload/${this.deviceId}`, JSON.stringify(this.properties))
  }

  emit(event) {
    console.log(this.model.name, this.deviceId, 'event', event)
    this.client?.publish(`device/event/${this.deviceId}`, JSON.stringify(event), { qos: 2 })
  }

  handlerMessage(message) {
    console.log(this.model.name, this.deviceId, 'service', message)
    this[`service_${message.service}`](message.data)
  }

  next() {
    if (this.isAutoMode) {
      this.randomData()
    }
    this.checkEvent()
    this.upload()
  }

  checkEvent() {}

  randomData() {}
}
