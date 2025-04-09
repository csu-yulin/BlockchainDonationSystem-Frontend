import {ref} from 'vue'
import {defineStore} from 'pinia'
import userApi from '@/api/user'
import projectApi from '@/api/Project'
import donationApi from '@/api/Donation'

export const useStatsStore = defineStore('stats', () => {
    // 定义统计数据的响应式状态
    const donationCount = ref(0) // 捐款总额
    const projectCount = ref(0) // 项目总数
    const userCount = ref(0)    // 用户总数
    const isLoaded = ref(false) // 是否已加载数据

    // 加载统计数据
    async function loadStats() {
      if (isLoaded.value) return // 如果已加载，直接返回，避免重复请求

      try {
        const [donationRes, projectRes, userRes] = await Promise.all([
          donationApi.getDonationAmount(),
          projectApi.getProjectCount(),
          userApi.getUserCount(),
        ])
        donationCount.value = donationRes || 0
        projectCount.value = projectRes || 0
        userCount.value = userRes || 0
        isLoaded.value = true // 标记为已加载
      } catch (error) {
        console.error('加载统计数据失败:', error)
        // 可选：设置默认值或提示用户
        donationCount.value = 0
        projectCount.value = 0
        userCount.value = 0
      }
    }

    // 重置数据（可选，例如刷新时使用）
    function resetStats() {
      donationCount.value = 0
      projectCount.value = 0
      userCount.value = 0
      isLoaded.value = false
    }

    return {
      donationCount,
      projectCount,
      userCount,
      isLoaded,
      loadStats,
      resetStats,
    }
  }, {
    persist: {
      omit: ['isLoaded'],
    }
  }
)
