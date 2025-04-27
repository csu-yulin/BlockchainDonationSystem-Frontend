<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900 py-12">
    <!-- 标题和描述 -->
    <div class="max-w-6xl mx-auto px-6 mb-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-4">
        审核求助
      </h1>
      <p class="text-lg text-gray-600">
        查看和管理用户提交的求助申请，决定通过或拒绝。
      </p>
    </div>

    <!-- 资金流动记录列表 -->
    <div class="max-w-6xl mx-auto px-6">
      <div
        v-if="loading"
        class="bg-white rounded-xl shadow-lg p-6"
      >
        <!-- 骨架屏 -->
        <div
          v-for="n in 5"
          :key="n"
          class="animate-pulse border-b py-4"
        >
          <div class="grid grid-cols-8 gap-4">
            <div class="h-5 bg-gray-200 rounded col-span-2" />
            <div class="h-5 bg-gray-200 rounded col-span-1" />
            <div class="h-5 bg-gray-200 rounded col-span-1" />
            <div class="h-5 bg-gray-200 rounded col-span-1" />
            <div class="h-5 bg-gray-200 rounded col-span-1" />
            <div class="h-5 bg-gray-200 rounded col-span-1" />
            <div class="h-5 bg-gray-200 rounded col-span-1" />
          </div>
        </div>
      </div>
      <div
        v-else-if="fundFlows.length"
        class="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <table class="w-full text-sm text-left text-gray-700">
          <thead class="bg-indigo-50 text-gray-800 uppercase">
            <tr>
              <th class="px-6 py-3">
                记录ID
              </th>
              <th class="px-6 py-3">
                项目
              </th>
              <th class="px-6 py-3">
                求助者
              </th>
              <th class="px-6 py-3">
                金额
              </th>
              <th class="px-6 py-3">
                原因
              </th>
              <th class="px-6 py-3">
                证明文件
              </th>
              <th class="px-6 py-3">
                管理员审核意见
              </th>
              <th class="px-6 py-3">
                公益组织审核意见
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="flow in paginatedFundFlows"
              :key="flow.flowId"
              class="border-b hover:bg-indigo-50 transition-all duration-200"
            >
              <td class="px-6 py-4">
                {{ flow.flowId }}
              </td>
              <td class="px-6 py-4">
                <router-link
                  :to="`/project/${flow.projectId}`"
                  class="text-indigo-600 hover:underline"
                >
                  {{ projectNames[flow.projectId] || flow.projectId }}
                </router-link>
              </td>
              <td class="px-6 py-4">
                {{ userNames[flow.recipientId] || flow.recipientId }}
              </td>
              <td class="px-6 py-4">
                ¥{{ flow.amount.toFixed(2) }}
              </td>
              <td class="px-6 py-4">
                {{ flow.reason }}
              </td>
              <td class="px-6 py-4">
                <a
                  :href="flow.proofFileUrl"
                  class="text-indigo-600 hover:underline"
                  target="_blank"
                >
                  查看
                </a>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'text-yellow-600': flow.status === 'PENDING',
                    'text-green-600': flow.status === 'APPROVED',
                    'text-red-600': flow.status === 'REJECTED'
                  }"
                >
                  {{ formatStatus(flow.status) }}
                </span>
              </td>
              <td class="px-6 py-4 flex gap-2">
                <button
                  v-if="flow.status === 'PENDING' && !flow.voucherId"
                  class="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  @click="openReviewModal(flow, 'APPROVED')"
                >
                  通过
                </button>
                <!--                <button-->
                <!--                  v-if="flow.status === 'PENDING' && !flow.voucherId"-->
                <!--                  class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"-->
                <!--                  @click="openReviewModal(flow, 'REJECTED')"-->
                <!--                >-->
                <!--                  拒绝-->
                <!--                </button>-->
                <button
                  v-if="flow.status === 'PENDING' && flow.voucherId"
                  class="px-3 py-1 bg-gray-400 text-white rounded cursor-not-allowed"
                  disabled
                >
                  已通过
                </button>
                <button
                  v-if="flow.status !== 'PENDING'"
                  class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                  @click="openReviewModal(flow, 'VIEW')"
                >
                  查看
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        v-else
        class="text-center text-gray-600 py-10"
      >
        暂无符合条件的求助记录
      </div>

      <!-- 分页 -->
      <div
        v-if="fundFlows.length"
        class="mt-6 flex justify-center gap-2"
      >
        <button
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600"
          @click="currentPage = 1"
        >
          首页
        </button>
        <button
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600"
          @click="currentPage--"
        >
          上一页
        </button>
        <span class="px-4 py-2 text-gray-700 font-medium">
          第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
        </span>
        <button
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600"
          @click="currentPage++"
        >
          下一页
        </button>
        <button
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-indigo-500 text-white rounded-lg disabled:opacity-50 hover:bg-indigo-600"
          @click="currentPage = totalPages"
        >
          末页
        </button>
      </div>
    </div>

    <!-- 审核模态框 -->
    <transition name="slide">
      <div
        v-if="showReviewModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            {{ reviewMode === 'VIEW' ? '查看审核详情' : reviewMode === 'APPROVED' ? '通过求助' : '拒绝求助' }}
          </h2>
          <div
            v-if="reviewMode === 'APPROVED'"
            class="mb-4"
          >
            <label class="block text-sm font-medium text-gray-700">盖章证明文件</label>
            <input
              accept="image/*,application/pdf"
              class="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
              type="file"
              @change="handleFileUpload($event)"
            />
            <p
              v-if="proofFileName"
              class="mt-2 text-sm text-gray-600"
            >
              已选择: {{ proofFileName }}
            </p>
          </div>
          <div
            v-if="reviewMode === 'VIEW'"
            class="space-y-2"
          >
            <p><strong>状态：</strong>{{ formatStatus(selectedFlow.status) }}</p>
            <p><strong>审核备注：</strong>{{ selectedFlow.reviewNotes || '无' }}</p>
            <p><strong>审核者ID：</strong>{{ selectedFlow.reviewerId || '无' }}</p>
          </div>
          <div class="mt-6 flex justify-end gap-4">
            <button
              class="px-4 py-2 bg-gray-200 text-white rounded-lg hover:bg-gray-300"
              @click="showReviewModal = false"
            >
              关闭
            </button>
            <button
              v-if="reviewMode === 'APPROVED'"
              :disabled="submitting || !proofFile"
              class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600"
              @click="submitReview"
            >
              {{ submitting ? '提交中...' : '确认' }}
            </button>
            <button
              v-if="reviewMode === 'REJECTED'"
              :disabled="submitting"
              class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-lg hover:from-indigo-600 hover:to-blue-600"
              @click="submitReview"
            >
              {{ submitting ? '提交中...' : '确认' }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
import fundFlowApi from '@/api/fundflow'
import projectApi from '@/api/project'
import userApi from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

// 状态管理
const fundFlows = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const loading = ref(false)
const submitting = ref(false)

// 审核模态框
const showReviewModal = ref(false)
const selectedFlow = ref(null)
const reviewMode = ref('') // 'APPROVED', 'REJECTED', or 'VIEW'
const proofFile = ref(null)
const proofFileName = ref('')

// 项目和用户信息缓存
const projectNames = ref({})
const userNames = ref({})

// 获取资金流动记录
const fetchFundFlows = async () => {
  loading.value = true
  try {
    const response = await fundFlowApi.getFundFlowListByOrgId(userStore.userId)
    fundFlows.value = response || []
    // 获取项目和用户信息
    const projectIds = [...new Set(fundFlows.value.map(flow => flow.projectId))]
    const userIds = [...new Set(fundFlows.value.map(flow => flow.recipientId))]

    // 批量查询项目名称
    await Promise.all(projectIds.map(async (id) => {
      if (!projectNames.value[id]) {
        try {
          const project = await projectApi.getProjectDetail(id)
          projectNames.value[id] = project.projectName
        } catch (error) {
          projectNames.value[id] = `项目 ${id}`
        }
      }
    }))

    // 批量查询用户名
    await Promise.all(userIds.map(async (id) => {
      if (!userNames.value[id]) {
        try {
          const user = await userApi.getUserInfo(id)
          userNames.value[id] = user.userRealName || user.username || `用户 ${id}`
        } catch (error) {
          userNames.value[id] = `用户 ${id}`
        }
      }
    }))
  } catch (error) {
    console.error('获取资金流动记录失败:', error)
    fundFlows.value = []
  } finally {
    loading.value = false
  }
}

// 计算分页后的记录
const paginatedFundFlows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return fundFlows.value.slice(start, end)
})

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(fundFlows.value.length / pageSize.value)
})

// 格式化状态
const formatStatus = (status) => {
  const statusMap = {
    PENDING: '管理员待审核',
    APPROVED: '已通过',
    REJECTED: '已拒绝'
  }
  return statusMap[status] || status
}

// 打开审核模态框
const openReviewModal = (flow, mode) => {
  selectedFlow.value = flow
  reviewMode.value = mode
  proofFile.value = null
  proofFileName.value = ''
  showReviewModal.value = true
}

// 处理文件上传
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  if (!validTypes.includes(file.type)) {
    alert('请上传图片（JPEG、PNG、GIF）或PDF文件！')
    return
  }

  proofFile.value = file
  proofFileName.value = file.name
}

// 提交审核
const submitReview = async () => {
  if (reviewMode.value === 'APPROVED' && !proofFile.value) {
    alert('请上传盖章证明文件！')
    return
  }

  submitting.value = true
  try {
    const formData = new FormData()
    formData.append('flowId', selectedFlow.value.flowId)
    formData.append('projectId', selectedFlow.value.projectId)
    if (reviewMode.value === 'APPROVED') {
      formData.append('proofFile', proofFile.value)
    }

    await fundFlowApi.updateOrgFundFlow(formData)
    alert(`${reviewMode.value === 'APPROVED' ? '通过' : '拒绝'}求助成功！`)
    showReviewModal.value = false
    await fetchFundFlows()
  } catch (error) {
    console.error('审核失败:', error)
    alert('审核失败，请重试！')
  } finally {
    submitting.value = false
    proofFile.value = null
    proofFileName.value = ''
  }
}

// 初始化加载
onMounted(async () => {
  if (userStore.role !== 'ORG') {
    router.push('/login')
    return
  }
  await fetchFundFlows()
})
</script>

<style scoped>
.rounded-2xl {
  border-radius: 1rem;
}

.shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
