import { SerialPort, DelimiterParser } from 'serialport'
import mqtt from 'mqtt'
import process from 'process'

const ports = await SerialPort.list()

if (!ports) {
  throw new Error('no serial ports found')
}

const com = ports[0].path
const serialport = new SerialPort({
  path: com,
  baudRate: 9600,
})

const parser = serialport.pipe(new DelimiterParser({ delimiter: '\n' }))

parser.on('data', (data) => {
  handlerSerialPortMessage(data.toString())
})

const model = {
  name: '物理设备',
  properties: {
    inf: {
      type: 'boolean',
    },
    led: {
      type: 'boolean',
    },
    btn: {
      type: 'boolean',
    },
    bzr: {
      type: 'boolean',
    },
    light: {
      type: 'number',
      unit: 'lux',
    },
    temp: {
      type: 'number',
      unit: '°C',
    },
    hum: {
      type: 'number',
      unit: '%',
    },
  },
  services: {
    led1_on: {},
    led1_off: {},
    buzzer_on: {},
    buzzer_off: {},
  },
  events: {
    led1_on: {
      message: {
        type: 'string',
      },
    },
    led1_off: {
      message: {
        type: 'string',
      },
    },
    buzzer_on: {
      message: {
        type: 'string',
      },
    },
    buzzer_off: {
      message: {
        type: 'string',
      },
    },
  },
}

const deviceId = 'ffffffffffffffffffffffffffffffff'
const client = mqtt.connect(process.env.VITE_MQTT_SOCKET_URL)
client.on('connect', () => {
  client.subscribe(`device/service/${deviceId}`, { qos: 2 })
  client.on('message', (topic, payload) => {
    try {
      payload = JSON.parse(payload.toString())
      handlerMqttMessage(payload)
    } catch (e) {
      console.error('handlerMessage', e)
    }
  })
  client.publish(`device/online/${deviceId}`, JSON.stringify(model), { qos: 2 })
})

const properties = {}

function handlerSerialPortMessage(message) {
  const split = message.split('=')
  switch (split[0]) {
    case 'inf':
    case 'led':
    case 'btn':
    case 'bzr':
      properties[split[0]] = split[1] === '0'
      break
    case 'light':
    case 'temp':
    case 'hum':
      properties[split[0]] = parseFloat(split[1])
      break
    case 'cmd': {
      if (!split[1] || !split[2]) {
        break
      }
      const event = JSON.stringify({
        event: split[1],
        message: split[2],
      })
      console.log('event', event)
      client.publish(`device/event/${deviceId}`, event, { qos: 2 })
      break
    }
  }
}

setInterval(() => {
  const msg = JSON.stringify(properties)
  console.log('publish', msg)
  client.publish(`device/upload/${deviceId}`, msg)
}, 1000)

function handlerMqttMessage(message) {
  console.log('service', message)
  serialport.write(message.service + '\n')
}
