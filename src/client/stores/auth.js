import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import authApi from '../api/auth.js'
import router from '../router/index.js'

export default defineStore('auth', () => {
  const user = reactive({
    role: 'admin',
    username: 'sa',
    password: 'sa',
  })
  const loginUser = ref({})

  async function register() {
    const json = await authApi.register(user)
    ElMessage.success(json.message)
  }

  async function login() {
    const json = await authApi.login(user)
    ElMessage.success(json.message)
    await me()
    router.push('/overview')
  }

  async function logout() {
    const json = await authApi.logout()
    ElMessage.success(json.message)
    await me()
    router.push('/auth')
  }

  async function me() {
    const json = await authApi.me()
    ElMessage.success(json.message)
    loginUser.value = json.data || {}
  }

  return {
    user,
    loginUser,
    register,
    login,
    logout,
    me,
  }
})
