import useAuthStore from './auth.js'

export { useAuthStore }

export default async function setupStore() {
  const authStore = useAuthStore()
  const { me } = authStore
  await me()
}
