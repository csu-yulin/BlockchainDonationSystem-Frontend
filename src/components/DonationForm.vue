<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-8 rounded-xl w-full max-w-lg shadow-2xl animate-slide-up">
      <h2 class="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <svg
          class="w-6 h-6 mr-2 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 4v16m8-8H4"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        捐款
      </h2>
      <form @submit.prevent="handleDonate">
        <div class="mb-6">
          <label class="block text-gray-600 mb-2 font-medium">捐款金额（元）</label>
          <input
            v-model.number="form.amount"
            :max="remainingAmount"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            min="0.01"
            placeholder="请输入金额（如 100.00）"
            required
            step="0.01"
            type="number"
          />
          <p class="mt-2 text-sm text-gray-500">
            剩余可捐款金额：¥{{ remainingAmount.toFixed(2) }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-600 mb-2 font-medium">支付方式</label>
          <div class="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
            <img
              alt="支付宝"
              class="w-6 h-6 mr-2"
              src="@/assets/images/支付宝支付.svg"
            />
            <span class="text-gray-700 font-medium">支付宝</span>
          </div>
        </div>
        <div class="flex gap-4">
          <button
            :disabled="loading"
            class="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
          >
            {{ loading ? '处理中...' : '确认捐款' }}
          </button>
          <button
            class="flex-1 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all duration-300"
            type="button"
            @click="$emit('close')"
          >
            取消
          </button>
        </div>
        <p
          v-if="errorMessage"
          class="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useUserStore} from '@/stores/user'
import donationApi from '@/api/donation'
import projectApi from '@/api/project'

const props = defineProps(['projectId'])
const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

const form = ref({amount: null})
const loading = ref(false)
const errorMessage = ref('')
const project = ref({})

// 计算剩余可捐款金额
const remainingAmount = computed(() => {
  if (project.value.targetAmount && project.value.raisedAmount) {
    return Math.max(0, project.value.targetAmount - project.value.raisedAmount)
  }
  return 0
})

// 获取项目详情以获取目标金额和已筹金额
const fetchProject = async () => {
  try {
    const data = await projectApi.getProjectDetail(props.projectId)
    project.value = data || {}
  } catch (error) {
    console.error('获取项目详情失败:', error)
    errorMessage.value = '无法加载项目信息'
  }
}

const handleDonate = async () => {
  if (!form.value.amount || form.value.amount <= 0) {
    errorMessage.value = '请输入有效的金额'
    return
  }

  if (form.value.amount > remainingAmount.value) {
    errorMessage.value = `捐款金额不能超过剩余可捐款金额 ¥${remainingAmount.value.toFixed(2)}`
    return
  }

  loading.value = true
  try {
    const payload = {
      userId: userStore.userId,
      projectId: props.projectId,
      amount: Number(form.value.amount.toFixed(2)) // 保留两位小数
    }
    const response = await donationApi.pay(payload)
    console.log(response)
    // 创建临时容器处理支付表单
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = response
    document.body.appendChild(tempDiv)

    // 自动提交表单
    const formElement = tempDiv.querySelector('form')
    if (formElement) {
      formElement.submit()
    } else {
      throw new Error('支付表单未找到')
    }

    emit('success')
    emit('close')
  } catch (error) {
    errorMessage.value = error.message || '捐款失败，请重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProject()
})
</script>

<style scoped>
.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
