import MockDevice from './mock-device.js'

const model = {
  name: 'Lamp',
  properties: {
    is_open: {
      type: 'boolean',
    },
    brightness: {
      type: 'number',
      unit: '%',
    },
  },
  services: {
    on: {
      brightness: {
        type: 'number',
        unit: '%',
      },
    },
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

export default class Lamp extends MockDevice {
  constructor(deviceId) {
    super(deviceId, model)
    this.properties = {
      is_open: false,
      brightness: 0,
    }
  }

  service_on(data) {
    this.properties.is_open = true
    for (const key in data) {
      this.properties[key] = data[key] || this.properties[key]
    }
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
}
