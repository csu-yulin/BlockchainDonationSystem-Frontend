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

    // 缓存键名
    const CACHE_KEY = 'stats_cache'
    // 缓存期限（1 小时，单位：毫秒）
    const CACHE_DURATION = 60 * 60 * 1000 // 1 小时

    // 加载统计数据
    async function loadStats() {
      // 检查缓存
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        const {data, timestamp} = JSON.parse(cachedData)
        const now = Date.now()

        // 如果缓存未过期，直接使用缓存数据
        if (now - timestamp < CACHE_DURATION) {
          donationCount.value = data.donationCount || 0
          projectCount.value = data.projectCount || 0
          userCount.value = data.userCount || 0
          isLoaded.value = true
          console.log('使用缓存数据:', data)
          return
        } else {
          console.log('缓存已过期，重新加载数据')
        }
      }

      // 如果没有缓存或缓存已过期，发起请求
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

        // 缓存数据
        const cacheData = {
          data: {
            donationCount: donationCount.value,
            projectCount: projectCount.value,
            userCount: userCount.value,
          },
          timestamp: Date.now(),
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
        console.log('数据已缓存:', cacheData)
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
      localStorage.removeItem(CACHE_KEY) // 清除缓存
    }

    return {
      donationCount,
      projectCount,
      userCount,
      isLoaded,
      loadStats,
      resetStats,
    }
  },
  {
    persist: {
      omit: ['isLoaded'], // 保持原有的持久化配置
    },
  }
)
