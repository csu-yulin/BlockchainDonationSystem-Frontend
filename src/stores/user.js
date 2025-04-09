import {computed, ref} from 'vue'
import {defineStore} from 'pinia'

// 30 天过期（毫秒数）
const EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000

export const useUserStore = defineStore('user', () => {
  const userId = ref(null)
  const email = ref(null)
  const phoneNumber = ref(null)
  const avatar = ref(null)
  const role = ref(null)
  const status = ref(null)
  const loginTime = ref(0) // 🕒 记录登录时间戳

  const userInfo = computed(() => ({
    userId: userId.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    avatar: avatar.value,
    role: role.value,
    status: status.value
  }))

  function setUserData(userData) {
    userId.value = userData.userId
    email.value = userData.email
    phoneNumber.value = userData.phoneNumber
    avatar.value = userData.avatar
    role.value = userData.role
    status.value = userData.status
    loginTime.value = Date.now() // 设置当前时间戳
  }

  function clearUserData() {
    userId.value = null
    email.value = null
    phoneNumber.value = null
    avatar.value = null
    role.value = null
    status.value = null
    loginTime.value = 0
  }

  // 初始化时检查是否过期
  function checkExpired() {
    if (loginTime.value && Date.now() - loginTime.value > EXPIRE_TIME) {
      clearUserData()
    }
  }

  // 立即调用以在页面刷新时生效
  checkExpired()

  return {
    userId,
    email,
    phoneNumber,
    avatar,
    role,
    status,
    loginTime,
    userInfo,
    setUserData,
    clearUserData,
    checkExpired
  }
}, {
  persist: true
})
