import MockDevice from './mock-device.js'
import { MathUtil } from '../index.js'

const workModeList = ['cooling', 'heating', 'drying']
const fanSpeedList = ['low', 'medium', 'high']

const model = {
  name: 'AirConditioner',
  properties: {
    temperature: {
      type: 'number',
      unit: '°C',
    },
    humidity: {
      type: 'number',
      unit: '%',
    },
    dirt: {
      type: 'number',
      unit: '%',
    },
    is_open: {
      type: 'boolean',
    },
    work_mode: {
      type: 'enum',
      enum: workModeList,
    },
    target_temperature: {
      type: 'number',
      unit: '°C',
    },
    fan_speed: {
      type: 'enum',
      enum: fanSpeedList,
    },
    timing: {
      type: 'number',
      unit: 'second',
    },
  },
  services: {
    on: {
      work_mode: {
        type: 'enum',
        enum: workModeList,
      },
      target_temperature: {
        type: 'number',
        unit: '°C',
      },
      fan_speed: {
        type: 'enum',
        enum: fanSpeedList,
      },
      timing: {
        type: 'number',
        unit: 'second',
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
    need_clean: {
      dirt: {
        type: 'number',
      },
    },
    timing_close: {
      message: {
        type: 'string',
      },
    },
  },
}

export default class AirConditioner extends MockDevice {
  constructor(deviceId) {
    super(deviceId, model)
    this.properties = {
      temperature: 20,
      humidity: 50,
      dirt: 0,
      is_open: false,
      work_mode: 'cooling',
      target_temperature: 26,
      fan_speed: 'low',
      timing: -1,
    }
  }

  service_on(data) {
    this.properties.is_open = true
    for (const key in data) {
      this.properties[key] = data[key] || this.properties[key]
    }
    this.event_on({
      message: 'off ok',
    })
  }

  service_off() {
    this.properties.is_open = false
    this.timing = -1
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

  event_need_clean(data) {
    this.emit({ event: 'need_clean', data })
  }

  event_timing_close(data) {
    this.emit({ event: 'timing_close', data })
  }

  randomData() {
    this.properties.temperature = MathUtil.random(
      10,
      40,
      this.properties.temperature,
      1,
      MathUtil.toFixedFn(2),
    )
    this.properties.humidity = MathUtil.random(
      20,
      80,
      this.properties.humidity,
      1,
      MathUtil.toFixedFn(2),
    )

    if (!this.properties.is_open) {
      return
    }

    const step = fanSpeedList.indexOf(this.properties.fan_speed) + 1
    switch (this.properties.work_mode) {
      case 'cooling':
        if (this.properties.temperature > this.properties.target_temperature) {
          this.properties.temperature = MathUtil.random(
            this.properties.target_temperature,
            this.properties.temperature,
            this.properties.temperature,
            step,
            MathUtil.toFixedFn(2),
          )
          this.properties.humidity = MathUtil.random(
            20,
            this.properties.humidity,
            this.properties.humidity,
            step,
            MathUtil.toFixedFn(2),
          )
        }
        break
      case 'heating':
        if (this.properties.temperature < this.properties.target_temperature) {
          this.properties.temperature = MathUtil.random(
            this.properties.temperature,
            this.properties.target_temperature,
            this.properties.temperature,
            step,
            MathUtil.toFixedFn(2),
          )
          this.properties.humidity = MathUtil.random(
            20,
            this.properties.humidity,
            this.properties.humidity,
            step,
            MathUtil.toFixedFn(2),
          )
        }
        break
      case 'drying':
        this.properties.humidity = MathUtil.random(
          20,
          this.properties.humidity,
          this.properties.humidity,
          step,
          MathUtil.toFixedFn(2),
        )
        break
    }

    const prevTime = this.prevTime || Date.now()
    const currTime = Date.now()
    this.prevTime = currTime
    const pass = (currTime - prevTime) / 1000
    if (this.properties.timing > 0) {
      this.properties.timing = Math.max(0, this.properties.timing - Math.round(pass))
    }

    this.properties.dirt = Math.min(this.properties.dirt + 1, 100)
  }

  checkEvent() {
    if (this.properties.timing === 0) {
      this.properties.is_open = false
      this.properties.timing = -1
      this.event_timing_close({
        message: 'timing closed',
      })
    }
    if ([80, 90, 100].includes(this.properties.dirt)) {
      if (this.prevDirt !== 100) {
        this.event_need_clean({
          dirt: this.properties.dirt,
        })
        this.prevDirt = this.properties.dirt
      }
    }
  }
}
