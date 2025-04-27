<template>
  <div class="min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900 py-12">
    <!-- 标题和欢迎信息 -->
    <div class="max-w-6xl mx-auto px-6 mb-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-4 animate-hero-title">
        欢迎，{{ orgName || '公益组织' }}
      </h1>
      <p class="text-lg text-gray-600 animate-hero-subtitle">
        管理您的公益项目、审核求助申请和上传凭证，共同打造透明的捐赠生态。
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="max-w-6xl mx-auto px-6 mb-12">
      <div
        v-if="loading"
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div
          v-for="n in 3"
          class="bg-white p-6 rounded-2xl shadow-lg animate-pulse"
        >
          <div class="h-6 bg-gray-200 rounded" />
          <div class="h-10 bg-gray-200 rounded mt-2" />
        </div>
      </div>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div
          ref="projectCountEl"
          class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            项目总数
          </h3>
          <p class="text-3xl font-bold text-indigo-600 mt-2 animate-stat">
            {{ stats.projectCount }}
          </p>
        </div>
        <div
          ref="targetAmountEl"
          class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 class="text-lg font-medium text-gray-800">
            目标总金额
          </h3>
          <p class="text-3xl font-bold text-indigo-600 mt-2 animate-stat">
            ¥{{ stats.totalTargetAmount.toFixed(2) }}
          </p>
        </div>
        <div
          ref="raisedAmountEl"
          class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 class="text-lg font-semibold text-gray-800">
            已筹款金额
          </h3>
          <p class="text-3xl font-bold text-indigo-600 mt-2 animate-stat">
            ¥{{ stats.totalRaisedAmount.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>

    <!-- 快速导航 -->
    <div class="max-w-6xl mx-auto px-6">
      <div class="bg-gradient-to-r from-blue-100 to-indigo-100 p-8 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6">
          快速导航
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="block p-6 bg-white rounded-lg hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            @click="handleCreateProjectClick"
          >
            <h3 class="text-lg font-semibold text-gray-800">
              创建新项目
            </h3>
            <p class="text-gray-600 text-sm mt-2">
              发起一个新的公益项目，吸引捐款支持。
            </p>
          </div>
          <router-link
            class="block p-6 bg-white rounded-lg hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1"
            to="/project-list?from=orgDashboard"
          >
            <h3 class="text-lg font-semibold text-gray-800">
              管理项目
            </h3>
            <p class="text-gray-600 text-sm mt-2">
              查看和编辑项目详情，上传资金使用凭证。
            </p>
          </router-link>
          <router-link
            class="block p-6 bg-white rounded-lg hover:bg-indigo-50 transition-all duration-300 transform hover:-translate-y-1"
            to="/org/assistance/review"
          >
            <h3 class="text-lg font-semibold text-gray-800">
              审核求助
            </h3>
            <p class="text-gray-600 text-sm mt-2">
              处理用户提交的求助申请，决定通过或拒绝。
            </p>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 创建项目模态框 -->
    <transition name="slide">
      <div
        v-if="showCreateProjectModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">
            创建新项目
          </h2>
          <form @submit.prevent="createProject">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  项目名称
                </label>
                <input
                  v-model="projectForm.projectName"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="请输入项目名称"
                  required
                  type="text"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  项目描述
                </label>
                <textarea
                  v-model="projectForm.description"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="请输入项目描述"
                  required
                  rows="4"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  目标金额 (¥)
                </label>
                <input
                  v-model.number="projectForm.targetAmount"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  max="1000000"
                  min="0"
                  placeholder="请输入目标金额（不超过100万）"
                  required
                  step="0.01"
                  type="number"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  开始日期
                </label>
                <input
                  v-model="projectForm.startDate"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  type="date"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  结束日期
                </label>
                <input
                  v-model="projectForm.endDate"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  required
                  type="date"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">
                  封面图
                </label>
                <input
                  accept="image/*"
                  class="mt-1 block w-full p-3 border border-gray-300 rounded-lg"
                  type="file"
                  @change="handleFileUpload($event)"
                />
                <p
                  v-if="projectForm.coverImageUrl"
                  class="mt-2 text-sm text-gray-600"
                >
                  已上传: {{ projectForm.coverImageUrl }}
                </p>
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-4">
              <button
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                type="button"
                @click="showCreateProjectModal = false"
              >
                取消
              </button>
              <button
                :disabled="submitting"
                class="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
                type="submit"
              >
                {{ submitting ? '提交中...' : '创建项目' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
import projectApi from '@/api/project'
import userApi from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

// 统计数据
const stats = ref({
  projectCount: 0,
  totalTargetAmount: 0,
  totalRaisedAmount: 0
})

// 组织名称和银行账户
const orgName = ref('')
const orgBankAccount = ref('')

// 加载状态
const loading = ref(false)

// 模态框状态
const showCreateProjectModal = ref(false)
const submitting = ref(false)

// 项目表单
const projectForm = ref({
  projectName: '',
  description: '',
  targetAmount: null,
  startDate: '',
  endDate: '',
  coverImage: null,
  coverImageUrl: ''
})

// 绑定元素用于动画
const projectCountEl = ref(null)
const targetAmountEl = ref(null)
const raisedAmountEl = ref(null)

// 获取组织信息
const fetchOrgProfile = async () => {
  try {
    const response = await userApi.getUserInfo(userStore.userId)
    orgName.value = response.orgName || '公益组织'
    orgBankAccount.value = response.orgBankAccount || ''
  } catch (error) {
    console.error('获取组织信息失败:', error)
    orgName.value = '公益组织'
    orgBankAccount.value = ''
  }
}

// 获取统计数据
const fetchStats = async () => {
  loading.value = true
  try {
    const response = await projectApi.getProjectStatsByOrgId(userStore.userId)
    stats.value = {
      projectCount: response.projectCount || 0,
      totalTargetAmount: response.totalTargetAmount || 0,
      totalRaisedAmount: response.totalRaisedAmount || 0
    }
  } catch (error) {
    console.error('获取统计数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 检查银行账户并触发模态框
const handleCreateProjectClick = () => {
  if (!orgBankAccount.value) {
    alert('请先设置组织银行账户信息！')
    return
  }
  showCreateProjectModal.value = true
}

// 处理文件上传
const handleFileUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 验证文件类型
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!validImageTypes.includes(file.type)) {
    alert('请上传图片文件（JPEG、PNG、GIF）！')
    return
  }

  const formData = new FormData()
  formData.append('cover', file)

  try {
    const response = await projectApi.uploadCover(formData)
    projectForm.value.coverImage = file
    projectForm.value.coverImageUrl = response || ''
  } catch (error) {
    console.error('封面上传失败:', error)
    alert('封面上传失败，请重试！')
  }
}

// 创建项目
const createProject = async () => {
  if (submitting.value) return

  // 表单验证
  if (!projectForm.value.projectName || !projectForm.value.description ||
    !projectForm.value.targetAmount || !projectForm.value.startDate ||
    !projectForm.value.endDate) {
    alert('请填写所有必填字段！')
    return
  }

  if (projectForm.value.targetAmount > 1000000) {
    alert('目标金额不能超过100万元！')
    return
  }

  if (new Date(projectForm.value.startDate) >= new Date(projectForm.value.endDate)) {
    alert('结束日期必须晚于开始日期！')
    return
  }

  submitting.value = true
  try {
    const projectData = {
      projectName: projectForm.value.projectName,
      description: projectForm.value.description,
      coverImage: projectForm.value.coverImageUrl || '',
      targetAmount: projectForm.value.targetAmount,
      startDate: projectForm.value.startDate,
      endDate: projectForm.value.endDate
    }

    await projectApi.createProject(projectData)
    alert('项目创建成功！')
    showCreateProjectModal.value = false
    projectForm.value = {
      projectName: '',
      description: '',
      targetAmount: null,
      startDate: '',
      endDate: '',
      coverImage: null,
      coverImageUrl: ''
    }
    await fetchStats() // 刷新统计数据
  } catch (error) {
    console.error('创建项目失败:', error)
    alert('创建项目失败，请重试！')
  } finally {
    submitting.value = false
  }
}

// 动画效果
const animateStats = () => {
  const elements = [projectCountEl.value, targetAmountEl.value, raisedAmountEl.value]
  elements.forEach((el, index) => {
    if (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      setTimeout(() => {
        el.style.transition = 'opacity 1s ease-out, transform 1s ease-out'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, index * 200)
    }
  })
}

onMounted(async () => {
  // 权限检查
  if (userStore.role !== 'ORG') {
    router.push('/login')
    return
  }

  // 获取数据
  await Promise.all([fetchOrgProfile(), fetchStats()])
  animateStats()
})
</script>

<style scoped>
.rounded-2xl {
  border-radius: 1rem;
}

.shadow-lg {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.animate-hero-title {
  animation: heroTitle 1.5s ease-out;
}

@keyframes heroTitle {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(30px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-hero-subtitle {
  animation: heroSubtitle 1.8s ease-out;
}

@keyframes heroSubtitle {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-stat {
  animation: statFade 1s ease-out;
}

@keyframes statFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
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
