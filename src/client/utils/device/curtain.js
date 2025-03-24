import MockDevice from './mock-device.js'
import { MathUtil } from '../index.js'

const model = {
  name: 'Curtain',
  properties: {
    is_open: {
      type: 'boolean',
    },
    illumination: {
      type: 'number',
      unit: 'lux',
    },
  },
  services: {
    on: {},
    off: {},
  },
  events: {
    on: {
      message: {
        type: 'string',
      },
    },
    off: {
      message: {
        type: 'string',
      },
    },
  },
}

export default class Curtain extends MockDevice {
  constructor(deviceId) {
    super(deviceId, model)
    this.properties = {
      is_open: false,
      illumination: 5000,
    }
  }

  service_on() {
    this.properties.is_open = true
    this.event_on({
      message: 'on ok',
    })
  }

  service_off() {
    this.properties.is_open = false
    this.event_off({
      message: 'off ok',
    })
  }

  event_on(data) {
    this.emit({ event: 'on', data })
  }

  event_off(data) {
    this.emit({ event: 'off', data })
  }

  randomData() {
    this.properties.illumination = MathUtil.random(
      0,
      10000,
      this.properties.illumination,
      100,
      MathUtil.toFixedFn(0),
    )
  }
}
