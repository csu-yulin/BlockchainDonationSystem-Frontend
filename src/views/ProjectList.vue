<template>
  <div class="p-6 min-h-screen bg-gradient-to-b from-indigo-50 to-white">
    <!-- 筛选区域 -->
    <div
      class="flex flex-wrap gap-4 mb-6 bg-gradient-to-r from-indigo-100 to-blue-100 p-6 rounded-xl shadow-lg transition-all duration-300"
    >
      <!-- 关键字搜索 -->
      <input
        v-model="filters.keyword"
        class="p-3 border border-indigo-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm transition-all duration-300"
        placeholder="搜索项目..."
        @keyup.enter="fetchProjectsWithFilters"
      />

      <!-- 创建者角色（非组织模式时显示） -->
      <select
        v-if="!isOrgMode"
        v-model="filters.creatorRole"
        class="p-3 border border-indigo-300 rounded-lg w-full md:w-40 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
      >
        <option value="">
          所有创建者
        </option>
        <option value="ORG">
          公益组织
        </option>
        <option value="INDIVIDUAL">
          个人
        </option>
      </select>

      <!-- 审批状态（非组织模式时显示） -->
      <select
        v-if="!isOrgMode"
        v-model="filters.approvalStatus"
        class="p-3 border border-indigo-300 rounded-lg w-full md:w-40 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
      >
        <option value="">
          所有审批状态
        </option>
        <option value="PENDING">
          待审核
        </option>
        <option value="APPROVED">
          已通过
        </option>
        <option value="REJECTED">
          已拒绝
        </option>
      </select>

      <!-- 项目状态 -->
      <select
        v-model="filters.status"
        class="p-3 border border-indigo-300 rounded-lg w-full md:w-40 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
      >
        <option value="">
          所有项目状态
        </option>
        <option value="ACTIVE">
          进行中
        </option>
        <option value="EXPIRED">
          已过期
        </option>
        <option value="COMPLETED">
          已完成
        </option>
        <option value="CANCELLED">
          已取消
        </option>
      </select>

      <!-- 开始日期（非组织模式时显示） -->
      <input
        v-if="!isOrgMode"
        v-model="filters.startDate"
        class="p-3 border border-indigo-300 rounded-lg w-full md:w-40 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
        type="date"
      />

      <!-- 结束日期（非组织模式时显示） -->
      <input
        v-if="!isOrgMode"
        v-model="filters.endDate"
        class="p-3 border border-indigo-300 rounded-lg w-full md:w-40 bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
        type="date"
      />

      <!-- 搜索按钮 -->
      <button
        class="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
        @click="fetchProjectsWithFilters"
      >
        搜索
      </button>
    </div>

    <!-- 项目列表 -->
    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <!-- 骨架屏 -->
      <div
        v-for="n in 12"
        :key="n"
        class="border rounded-xl p-3 animate-pulse bg-white shadow-md"
      >
        <div class="w-full h-40 bg-gray-200 rounded-lg" />
        <div class="h-5 bg-gray-200 rounded mt-2" />
        <div class="h-4 bg-gray-200 rounded mt-2" />
        <div class="h-2 bg-gray-200 rounded mt-2" />
        <div class="h-4 bg-gray-200 rounded mt-2" />
      </div>
    </div>
    <div
      v-else-if="paginatedProjects.length"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      <div
        v-for="project in paginatedProjects"
        :key="project.projectId"
        class="border rounded-xl p-3 bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        <router-link :to="`/project/${project.projectId}`">
          <img
            :src="project.coverImage"
            alt="项目封面"
            class="w-full h-40 object-cover rounded-lg"
            loading="lazy"
          />
          <h3
            class="text-lg font-semibold mt-2 text-gray-800"
            v-html="highlightKeyword(project.projectName)"
          />
          <p class="text-gray-600 text-sm mt-1">
            发起人：{{ project.orgName || '个人用户' }}
          </p>
          <div class="relative w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
            <div
              :style="{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }"
              class="absolute h-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full transition-all duration-500"
            />
          </div>
          <p class="text-xs mt-1 text-gray-700">
            ¥{{ project.raisedAmount.toFixed(2) }} / ¥{{ project.targetAmount.toFixed(2) }}
          </p>
          <p class="text-xs text-gray-500 mt-1">
            状态：{{ formatStatus(project.status) }}
          </p>
        </router-link>
      </div>
    </div>
    <div
      v-else
      class="text-center text-gray-600 py-10"
    >
      暂无符合条件的项目
    </div>

    <!-- 分页 -->
    <div
      v-if="projects.length"
      class="mt-6 flex justify-center gap-2"
    >
      <button
        :disabled="currentPage === 1"
        class="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg disabled:opacity-50 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md"
        @click="currentPage = 1"
      >
        首页
      </button>
      <button
        :disabled="currentPage === 1"
        class="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg disabled:opacity-50 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md"
        @click="currentPage--"
      >
        上一页
      </button>
      <span class="px-4 py-2 text-gray-700 font-medium">第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button
        :disabled="currentPage === totalPages"
        class="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg disabled:opacity-50 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md"
        @click="currentPage++"
      >
        下一页
      </button>
      <button
        :disabled="currentPage === totalPages"
        class="px-3 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg disabled:opacity-50 hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-md"
        @click="currentPage = totalPages"
      >
        末页
      </button>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
import projectApi from '@/api/project'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

// 状态管理
const projects = ref([])
const currentPage = ref(1)
const pageSize = ref(12) // 每页展示 12 个项目
const total = ref(0)
const totalPages = ref(0)
const loading = ref(false)

// 是否为组织模式（从 OrgDashboard 进入）
const isOrgMode = ref(false)

// 筛选条件
const filters = ref({
  keyword: '',
  creatorRole: '',
  approvalStatus: '',
  status: '',
  startDate: '',
  endDate: '',
  creatorId: ''
})

// 计算当前页的项目
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return projects.value.slice(start, end)
})

// 获取项目列表
const fetchProjects = async (useFilters = false) => {
  loading.value = true
  try {
    const payload = {
      page: currentPage.value,
      size: pageSize.value,
      keyword: useFilters ? filters.value.keyword || undefined : undefined,
      creatorRole: useFilters ? filters.value.creatorRole || undefined : undefined,
      approvalStatus: useFilters ? filters.value.approvalStatus || undefined : undefined,
      status: useFilters ? filters.value.status || undefined : undefined,
      startDate: useFilters ? filters.value.startDate || undefined : undefined,
      endDate: useFilters ? filters.value.endDate || undefined : undefined,
      creatorId: isOrgMode.value ? filters.value.creatorId || undefined : undefined
    }
    const data = await projectApi.getProjectList(payload)
    projects.value = data.records || []
    total.value = data.total || 0
    totalPages.value = data.pages || 0
  } catch (error) {
    console.error('获取项目列表失败:', error)
    projects.value = []
    total.value = 0
    totalPages.value = 0
  } finally {
    loading.value = false
  }
}

// 点击搜索按钮或按 Enter 时触发，带筛选条件
const fetchProjectsWithFilters = () => {
  currentPage.value = 1 // 重置到第一页
  fetchProjects(true)
}

// 高亮关键词
const highlightKeyword = (name) => {
  if (!filters.value.keyword) return name
  const regex = new RegExp(`(${filters.value.keyword})`, 'gi')
  return name.replace(regex, '<em class="text-indigo-600 font-semibold">$1</em>')
}

// 格式化项目状态
const formatStatus = (status) => {
  const statusMap = {
    ACTIVE: '进行中',
    EXPIRED: '已过期',
    COMPLETED: '已完成',
    CANCELLED: '已取消'
  }
  return statusMap[status] || status
}

// 监听页面变化
watch(currentPage, () => {
  fetchProjects(
    filters.value.keyword ||
    filters.value.creatorRole ||
    filters.value.approvalStatus ||
    filters.value.status ||
    filters.value.startDate ||
    filters.value.endDate ||
    isOrgMode.value
  )
})

// 初始化加载
onMounted(() => {
  // 检查是否从 OrgDashboard 进入
  isOrgMode.value = route.query.from === 'orgDashboard'
  if (isOrgMode.value && userStore.role === 'ORG') {
    filters.value.creatorId = userStore.userId // 按 orgId 过滤
    filters.value.creatorRole = 'ORG' // 限制为组织项目
    fetchProjects(true)
  } else {
    fetchProjects()
  }
})
</script>

<style scoped>
/* 筛选区域动画 */
select,
input {
  animation: slideDown 0.5s ease-in-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 卡片 hover 动画 */
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
