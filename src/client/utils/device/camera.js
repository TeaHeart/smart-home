import MockDevice from './mock-device.js'
import { MathUtil } from '../index.js'

const model = {
  name: 'Camera',
  properties: {
    entity_count: {
      type: 'number',
    },
  },
  services: {},
  events: {
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
      entity_count: 0,
    }
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
    if (this.properties.entity_count > 0) {
      this.event_entity_detected({
        entity_count: this.properties.entity_count,
      })
    }
  }
}
