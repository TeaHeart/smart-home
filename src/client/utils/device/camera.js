import MockDevice from './mock-device.js'
import { MathUtil } from '../index.js'

const model = {
  name: 'Camera',
  properties: {
    is_open: {
      type: 'boolean',
    },
    entity_count: {
      type: 'number',
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
    entity_detected: {
      entity_count: {
        type: 'number',
      },
    },
  },
}

export default class Camera extends MockDevice {
  constructor(deviceId) {
    super(deviceId, model)
    this.properties = {
      is_open: false,
      entity_count: 0,
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

  event_entity_detected(data) {
    this.emit({ event: 'entity_detected', data })
  }

  randomData() {
    this.properties.entity_count = MathUtil.random(
      0,
      2,
      this.properties.entity_count,
      1,
      MathUtil.toFixedFn(0),
    )
  }

  checkEvent() {
    if (this.properties.is_open && this.properties.entity_count > 0) {
      this.event_entity_detected({
        entity_count: this.properties.entity_count,
      })
    }
  }
}
