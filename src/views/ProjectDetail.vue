<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- 骨架屏 -->
    <div
      v-if="loading"
      class="max-w-6xl mx-auto p-6"
    >
      <div class="animate-pulse space-y-6">
        <div class="w-full h-80 bg-gray-200 rounded-2xl" />
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-2 space-y-4">
            <div class="h-10 bg-gray-200 rounded w-3/4" />
            <div class="h-32 bg-gray-200 rounded" />
            <div class="h-6 bg-gray-200 rounded w-1/2" />
          </div>
          <div class="space-y-4">
            <div class="h-16 bg-gray-200 rounded" />
            <div class="h-16 bg-gray-200 rounded" />
            <div class="h-24 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>

    <!-- 项目详情 -->
    <div
      v-else-if="project.projectId"
      class="max-w-6xl mx-auto p-6"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 左侧：核心信息 -->
        <div class="md:col-span-2 space-y-6">
          <!-- 封面图 -->
          <div class="relative">
            <img
              :src="project.coverImage"
              alt="项目封面"
              class="w-full h-80 object-cover rounded-2xl shadow-xl"
              loading="lazy"
            />
            <div class="absolute bottom-0 left-0 p-6 bg-gradient-to-t from-black/70 to-transparent rounded-b-2xl">
              <h1 class="text-4xl font-bold text-white">
                {{ project.projectName }}
              </h1>
              <p class="text-gray-200">
                {{ project.orgName || '个人用户' }}
              </p>
            </div>
            <!-- 项目状态标签 -->
            <div class="absolute top-4 right-4">
              <span
                :class="statusBadgeClass(project.status)"
                class="px-3 py-1 rounded-full text-sm font-medium text-white"
              >
                {{ formatStatus(project.status) }}
              </span>
            </div>
          </div>

          <!-- 筹款进度 -->
          <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-2xl font-semibold">
              筹款进度
            </h2>
            <div
              :title="`已筹 ¥${project.raisedAmount.toFixed(2)} / 目标 ¥${project.targetAmount.toFixed(2)}`"
              class="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden mt-4"
            >
              <div
                :style="{ width: `${(project.raisedAmount / project.targetAmount) * 100}%` }"
                class="absolute h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full transition-all duration-500"
              >
                <span class="absolute right-2 top-0.5 text-xs text-white">
                  {{ ((project.raisedAmount / project.targetAmount) * 100).toFixed(1) }}%
                </span>
              </div>
            </div>
            <p class="text-sm mt-2 text-gray-500">
              已筹 ¥{{ project.raisedAmount.toFixed(2) }} / 目标 ¥{{ project.targetAmount.toFixed(2) }}
            </p>
          </div>

          <!-- 项目描述 -->
          <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-2xl font-semibold">
              项目描述
            </h2>
            <p
              class="mt-4 text-gray-600 leading-relaxed"
              v-html="project.description"
            />
          </div>

          <!-- 操作按钮 -->
          <div class="flex gap-4">
            <button
              v-if="userRole === 'INDIVIDUAL' && project.status === 'ACTIVE'"
              class="px-6 py-3 bg-gradient-to-r from-blue-400 to-indigo-400 text-white rounded-lg hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-md"
              @click="showDonationModal = true"
            >
              立即捐款
            </button>
            <button
              v-if="userRole === 'INDIVIDUAL' && (project.status === 'ACTIVE' || project.status === 'COMPLETED')"
              class="px-6 py-3 bg-gradient-to-r from-green-400 to-teal-400 text-white rounded-lg hover:from-green-500 hover:to-teal-500 transition-all duration-300 shadow-md"
              @click="showAssistanceModal = true"
            >
              申请受助
            </button>
            <router-link
              v-if="userRole === 'INDIVIDUAL' || userRole === 'ORG'"
              :to="`/voucher/${project.projectId}`"
              class="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-md text-center"
            >
              查看凭证
            </router-link>
            <label
              v-if="userRole === 'ORG' && userStore.userId === project.creatorId"
              class="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md cursor-pointer text-center"
            >
              上传凭证
              <input
                accept=".pdf,.jpg,.png"
                class="hidden"
                type="file"
                @change="handleFileUpload($event)"
              />
            </label>
            <button
              v-if="userRole === 'ORG' && userStore.userId === project.creatorId"
              class="px-6 py-3 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 shadow-md"
              @click="showFundTransferModal = true"
            >
              资金挪用
            </button>
          </div>

          <!-- 捐款记录 -->
          <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-xl font-semibold">
              捐款记录
            </h2>
            <div
              v-if="parsedDonationRecords.length"
              class="mt-4 space-y-3"
            >
              <div
                v-for="record in parsedDonationRecords.slice(0, 5)"
                :key="record.donationId"
                class="p-3 bg-gray-100 rounded-lg"
              >
                <p class="text-gray-600 text-sm">
                  {{ formatDate(record.timestamp) }}: 用户ID {{ record.userId }} 捐款 ¥{{ record.amount.toFixed(2) }}
                </p>
                <div class="flex items-center mt-1">
                  <code class="text-sm font-mono text-blue-600 truncate">{{ record.txHash }}</code>
                  <button
                    aria-label="复制交易哈希"
                    class="ml-2 text-gray-500 hover:text-gray-700"
                    @click="copyToClipboard(record.txHash)"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <button
                v-if="parsedDonationRecords.length > 5"
                class="mt-4 text-blue-600 hover:underline text-sm"
                @click="showAllDonations = true"
              >
                查看更多
              </button>
            </div>
            <p
              v-else
              class="mt-4 text-gray-500 text-sm"
            >
              暂无捐款记录
            </p>
          </div>
        </div>

        <!-- 右侧：辅助信息 -->
        <div class="space-y-6">
          <!-- 项目统计 -->
          <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-xl font-semibold">
              项目信息
            </h2>
            <div class="mt-4 space-y-3">
              <div>
                <p class="text-gray-500 text-sm">
                  状态
                </p>
                <p class="text-base font-medium">
                  <span
                    :class="statusBadgeClass(project.status)"
                    class="inline-block px-2 py-1 rounded text-sm text-white"
                  >
                    {{ formatStatus(project.status) }}
                  </span>
                </p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">
                  审批状态
                </p>
                <p class="text-base font-medium">
                  {{ formatApprovalStatus(project.approvalStatus) }}
                  <span
                    v-if="project.verifierId"
                    class="text-sm text-gray-500"
                  >
                    (验证者ID: {{ project.verifierId }})
                  </span>
                </p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">
                  时间线
                </p>
                <p class="text-base font-medium">
                  {{ formatDate(project.startDate) }} - {{ formatDate(project.endDate) }}
                </p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">
                  联系人
                </p>
                <p class="text-base font-medium">
                  {{ project.contactPersonName || '未提供' }}
                </p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">
                  创建时间
                </p>
                <p class="text-base font-medium">
                  {{ formatDate(project.createdAt) }}
                </p>
              </div>
            </div>
          </div>

          <!-- 区块链透明度 -->
          <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-xl font-semibold flex items-center">
              区块链透明度
              <svg
                class="w-5 h-5 ml-2 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </h2>
            <div class="mt-4">
              <p class="text-gray-500 text-sm">
                交易哈希
              </p>
              <div class="flex items-center mt-1">
                <code class="text-sm font-mono text-blue-600 truncate">{{ project.transactionHash }}</code>
                <button
                  aria-label="复制交易哈希"
                  class="ml-2 text-gray-500 hover:text-gray-700"
                  @click="copyToClipboard(project.transactionHash)"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </button>
              </div>
              <router-link
                :to="`/hash-verification/${project.transactionHash}`"
                class="mt-2 inline-flex items-center text-blue-600 hover:underline text-sm"
              >
                校验交易
                <svg
                  class="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
              </router-link>
            </div>
          </div>

          <!-- 项目动态 -->
          <div class="p-6 bg-white rounded-xl shadow-md">
            <h2 class="text-xl font-semibold">
              项目动态
            </h2>
            <div
              v-if="project.activityRecords?.length"
              class="mt-4 space-y-3"
            >
              <div
                v-for="activity in project.activityRecords"
                :key="activity.id"
                class="p-3 bg-gray-100 rounded-lg"
              >
                <p class="text-gray-600 text-sm">
                  {{ formatDate(activity.date) }}: {{ activity.content }}
                </p>
              </div>
            </div>
            <p
              v-else
              class="mt-4 text-gray-500 text-sm"
            >
              暂无动态更新
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div
      v-else
      class="text-center text-gray-500 py-10"
    >
      项目不存在或已被删除
    </div>

    <!-- 模态框 -->
    <transition name="slide">
      <donation-form
        v-if="showDonationModal"
        :project-id="project.projectId"
        @close="showDonationModal = false"
        @success="fetchProject"
      />
    </transition>
    <transition name="slide">
      <assistance-apply
        v-if="showAssistanceModal"
        :project-funds="project.raisedAmount"
        :project-id="project.projectId"
        @close="showAssistanceModal = false"
      />
    </transition>
    <transition name="slide">
      <div
        v-if="showFundTransferModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            资金挪用
          </h2>
          <form @submit.prevent="submitFundTransfer">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  挪用金额 (¥)
                </label>
                <input
                  v-model.number="fundTransferForm.amount"
                  :max="project.raisedAmount"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  min="0"
                  placeholder="请输入挪用金额"
                  required
                  step="0.01"
                  type="number"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  证明文件
                </label>
                <input
                  accept="image/*,application/pdf"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                  required
                  type="file"
                  @change="handleFundTransferFileUpload($event)"
                />
                <p
                  v-if="fundTransferForm.proofFileName"
                  class="mt-2 text-sm text-gray-600"
                >
                  已选择: {{ fundTransferForm.proofFileName }}
                </p>
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-4">
              <button
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                type="button"
                @click="showFundTransferModal = false"
              >
                取消
              </button>
              <button
                :disabled="submitting"
                class="px-4 py-2 bg-gradient-to-r from-orange-400 to-red-400 text-white rounded-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300"
                type="submit"
              >
                {{ submitting ? '提交中...' : '确认' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import projectApi from '@/api/project'
import voucherApi from '@/api/voucher'
import fundFlowApi from '@/api/fundflow'
import DonationForm from '@/components/DonationForm.vue'
import AssistanceApply from '@/components/AssistanceApply.vue'
import {useUserStore} from '@/stores/user'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const project = ref({})
const loading = ref(false)
const showDonationModal = ref(false)
const showAssistanceModal = ref(false)
const showFundTransferModal = ref(false)
const showAllDonations = ref(false)
const submitting = ref(false)
const userRole = ref(userStore.role)

// 资金挪用表单
const fundTransferForm = ref({
  amount: null,
  proofFile: null,
  proofFileName: ''
})

// 获取项目详情
const fetchProject = async () => {
  loading.value = true
  try {
    const data = await projectApi.getProjectDetail(route.params.id)
    project.value = data || {}
  } catch (error) {
    console.error('获取项目详情失败:', error)
    project.value = {}
  } finally {
    loading.value = false
  }
}

// 上传凭证
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)
  formData.append('projectId', project.value.projectId)
  formData.append('orgId', userStore.userId)

  try {
    const response = await voucherApi.uploadVoucher(formData)
    alert('凭证上传成功！')
    router.push(`/voucher/${project.value.projectId}`)
  } catch (error) {
    console.error('上传凭证失败:', error)
    alert('凭证上传失败，请重试！')
  }
}

// 处理资金挪用文件上传
const handleFundTransferFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  if (!validTypes.includes(file.type)) {
    alert('请上传图片（JPEG、PNG、GIF）或PDF文件！')
    return
  }

  fundTransferForm.value.proofFile = file
  fundTransferForm.value.proofFileName = file.name
}

// 提交资金挪用
const submitFundTransfer = async () => {
  if (!fundTransferForm.value.amount || fundTransferForm.value.amount <= 0) {
    alert('请输入有效挪用金额！')
    return
  }
  if (fundTransferForm.value.amount > project.value.raisedAmount) {
    alert('挪用金额不能超过已筹金额！')
    return
  }
  if (!fundTransferForm.value.proofFile) {
    alert('请上传证明文件！')
    return
  }

  submitting.value = true
  try {
    const formData = new FormData()
    formData.append('projectId', project.value.projectId)
    formData.append('recipientId', userStore.userId)
    formData.append('amount', fundTransferForm.value.amount)
    formData.append('proofFile', fundTransferForm.value.proofFile)

    await fundFlowApi.createOrgFundFlow(formData)
    alert('资金挪用申请提交成功！')
    showFundTransferModal.value = false
    fundTransferForm.value = {
      amount: null,
      proofFile: null,
      proofFileName: ''
    }
  } catch (error) {
    console.error('资金挪用申请失败:', error)
    alert('资金挪用申请失败，请重试！')
  } finally {
    submitting.value = false
  }
}

// 解析捐款记录
const parsedDonationRecords = computed(() => {
  if (project.value.donationRecords) {
    try {
      return JSON.parse(project.value.donationRecords) || []
    } catch (error) {
      console.error('解析捐款记录失败:', error)
      return []
    }
  }
  return []
})

// 格式化日期
const formatDate = (date) => {
  if (!date) return '未设置'
  return new Date(date).toLocaleDateString('zh-CN', {year: 'numeric', month: '2-digit', day: '2-digit'})
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

// 格式化审批状态
const formatApprovalStatus = (status) => {
  const statusMap = {
    PENDING: '待审批',
    APPROVED: '已通过',
    REJECTED: '已拒绝'
  }
  return statusMap[status] || status
}

// 项目状态徽章样式
const statusBadgeClass = (status) => {
  const statusClasses = {
    ACTIVE: 'bg-green-500',
    EXPIRED: 'bg-red-500',
    COMPLETED: 'bg-blue-500',
    CANCELLED: 'bg-gray-500'
  }
  return statusClasses[status] || 'bg-gray-500'
}

// 复制到剪贴板
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制到剪贴板！')
  })
}

onMounted(() => {
  fetchProject()
})
</script>

<style scoped>
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
