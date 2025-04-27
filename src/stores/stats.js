import {ref} from 'vue'
import {defineStore} from 'pinia'
import userApi from '@/api/user'
import projectApi from '@/api/Project'
import donationApi from '@/api/Donation'

export const useStatsStore = defineStore(
  'stats',
  () => {
    // 定义统计数据的响应式状态
    const donationCount = ref(0) // 捐款总额
    const projectCount = ref(0) // 项目总数
    const userCount = ref(0) // 用户总数
    const isLoaded = ref(false) // 是否已加载数据
    const lastFetched = ref(null) // 记录最后获取数据的时间

    // 缓存期限（1 小时，单位：毫秒）
    const CACHE_DURATION = 60 * 60 * 1000 // 1 小时

    // 加载统计数据
    async function loadStats() {
      const now = Date.now()

      // 检查是否需要重新加载数据（未加载或缓存过期）
      if (isLoaded.value && lastFetched.value && now - lastFetched.value < CACHE_DURATION) {
        return
      }

      try {
        const [donationRes, projectRes, userRes] = await Promise.all([
          donationApi.getDonationAmount(),
          projectApi.getProjectCount(),
          userApi.getUserCount(),
        ])

        // 更新状态
        donationCount.value = donationRes || 0
        projectCount.value = projectRes || 0
        userCount.value = userRes || 0
        isLoaded.value = true
        lastFetched.value = now
      } catch (error) {
        console.error('加载统计数据失败:', error)
        donationCount.value = 0
        projectCount.value = 0
        userCount.value = 0
        isLoaded.value = true // 即使失败也标记为已加载，避免重复请求
      }
    }

    // 重置数据
    function resetStats() {
      donationCount.value = 0
      projectCount.value = 0
      userCount.value = 0
      isLoaded.value = false
      lastFetched.value = null
    }

    return {
      donationCount,
      projectCount,
      userCount,
      isLoaded,
      lastFetched,
      loadStats,
      resetStats,
    }
  },
  {
    persist: {
      omit: ['isLoaded'], // 不持久化 isLoaded
      beforeRestore: (ctx) => {
        const now = Date.now()
        const lastFetched = ctx.store.$state.lastFetched
        // 如果缓存数据已过期，重置状态
        if (lastFetched && now - lastFetched >= 60 * 60 * 1000) {
          ctx.store.$reset()
        }
      }
    },
  }
)
