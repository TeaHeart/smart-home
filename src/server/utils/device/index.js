import MockDevice from './mock-device.js'
import Lamp from './lamp.js'
import Curtain from './curtain.js'
import Camera from './camera.js'
import AirConditioner from './air-conditioner.js'

export { MockDevice, Lamp, Curtain, Camera, AirConditioner }

export default function setupMockDevice() {
  return new Promise((resolve) => {
    const deviceList = [
      new Lamp('00000000000000000000000000000001'),
      new Curtain('00000000000000000000000000000002'),
      new Camera('00000000000000000000000000000003'),
      new AirConditioner('00000000000000000000000000000004'),
    ]

    for (const device of deviceList) {
      device.connect()

      setInterval(() => {
        device.next()
      }, 3000)
    }

    console.log('mock device loaded', deviceList.length)

    resolve()
  })
}
