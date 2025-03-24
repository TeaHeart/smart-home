export function random(min, max, curr, step, handler = (x) => x) {
  if (min > max) {
    return random(max, min, curr, step, handler)
  }
  step = Math.abs(step)
  const low = Math.max(min, curr - step)
  const high = Math.min(max, curr + step)
  const next = Math.random() * (high - low) + low
  return handler(next)
}

export function toFixed(num, digit = 0) {
  return Number(num.toFixed(digit))
}

export function toFixedFn(digit = 0) {
  return (num) => toFixed(num, digit)
}

export function clamp(value, min, max) {
  value = Math.max(value, min)
  value = Math.min(value, max)
  return value
}
