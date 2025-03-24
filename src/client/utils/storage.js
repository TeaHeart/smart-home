const namespace = import.meta.env.VITE_APP_NAME

function getStorage() {
  return JSON.parse(window.localStorage.getItem(namespace) || '{}')
}

function setStorage(storage) {
  window.localStorage.setItem(namespace, JSON.stringify(storage))
}

function removeStorage() {
  window.localStorage.removeItem(namespace)
}

function get(key) {
  return getStorage()[key]
}

function set(key, value) {
  const storage = getStorage()
  storage[key] = value
  setStorage(storage)
}

function remove(key) {
  const storage = getStorage()
  delete storage[key]
  setStorage(storage)
}

export default {
  getStorage,
  setStorage,
  removeStorage,
  set,
  get,
  remove,
}
