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
    data.is_open = true
    let modify = false
    for (const key in data) {
      const value = data[key]
      if (value && value !== this.properties[key]) {
        this.properties[key] = value
        modify = true
      }
    }
    if (!modify) {
      return
    }
    this.event_on({
      message: 'on ok',
    })
  }

  service_off() {
    if (!this.properties.is_open) {
      return
    }
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
