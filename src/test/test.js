import { Parser } from 'expr-eval'

const parser = new Parser()

const on = {
  service: 'on',
  data: {
    temperature: 'temperature',
    humidity: 'humidity * 2',
  },
}

const ctx = {
  temperature: 22,
  humidity: 30,
}

for (const key in on.data) {
  const value = on.data[key]
  on.data[key] = parser.evaluate(value, ctx)
}

console.log(on)
