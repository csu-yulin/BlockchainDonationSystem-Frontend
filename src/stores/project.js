// src/stores/project.js
import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import projectApi from '@/api/project.js'

// 缓存过期时间：1小时（毫秒数）
const CACHE_EXPIRE_TIME = 60 * 60 * 1000

export const useProjectStore = defineStore('project', () => {
  // 随机项目数据
  const randomProjects = ref([])
  // 缓存时间戳
  const cacheTime = ref(0)

  // 计算属性：获取随机项目
  const getRandomProjects = computed(() => randomProjects.value)

  // 加载随机项目
  async function loadRandomProjects(force = false) {
    // 如果没有强制刷新且缓存未过期，直接返回缓存数据
    if (!force && cacheTime.value && Date.now() - cacheTime.value < CACHE_EXPIRE_TIME) {
      return randomProjects.value
    }

    try {
      const response = await projectApi.getRandomProjects()
      if (response) {
        console.log(response)
        randomProjects.value = response
        cacheTime.value = Date.now() // 更新缓存时间
        return randomProjects.value
      } else {
        console.error('Failed to load random projects:', response)
        randomProjects.value = []
      }
    } catch (error) {
      console.error('Error fetching random projects:', error)
      randomProjects.value = []
    }
    return randomProjects.value
  }

  // 清除缓存
  function clearRandomProjects() {
    randomProjects.value = []
    cacheTime.value = 0
  }

  // 检查缓存是否过期
  function checkCacheExpired() {
    if (cacheTime.value && Date.now() - cacheTime.value > CACHE_EXPIRE_TIME) {
      clearRandomProjects()
    }
  }

  // 初始化时检查缓存
  checkCacheExpired()

  return {
    randomProjects,
    cacheTime,
    getRandomProjects,
    loadRandomProjects,
    clearRandomProjects,
    checkCacheExpired
  }
}, {
  persist: true // 持久化存储
})
