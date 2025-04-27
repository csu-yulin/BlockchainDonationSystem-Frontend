<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
      <h2 class="text-2xl font-bold mb-4 text-gray-800">
        申请受助
      </h2>
      <form @submit.prevent="handleApply">
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">申请金额（元）</label>
          <input
            v-model.number="form.amount"
            :max="projectFunds"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="1"
            placeholder="请输入申请金额"
            required
            type="number"
          />
          <p class="text-gray-500 text-sm mt-1">
            项目可用资金：{{ projectFunds }} 元
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">申请理由</label>
          <textarea
            v-model="form.reason"
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="请说明您的受助需求"
            required
            rows="4"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">证明材料</label>
          <input
            ref="fileInput"
            accept="image/*,application/pdf"
            class="w-full p-3 border border-gray-300 rounded-lg"
            required
            type="file"
            @change="handleFileUpload"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-600 mb-1">联系方式</label>
          <input
            v-model="form.contact"
            class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
            disabled
          />
        </div>
        <div class="flex gap-4">
          <button
            :disabled="loading || !isVerified || form.amount > projectFunds"
            class="flex-1 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 disabled:bg-gray-400"
            type="submit"
          >
            {{ loading ? '提交中...' : '提交申请' }}
          </button>
          <button
            class="flex-1 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
            type="button"
            @click="$emit('close')"
          >
            取消
          </button>
        </div>
        <p
          v-if="errorMessage"
          class="text-red-600 mt-2"
        >
          {{ errorMessage }}
        </p>
        <p
          v-if="!isVerified"
          class="text-red-600 mt-2"
        >
          {{ verificationError }}
        </p>
        <p
          v-if="form.amount > projectFunds"
          class="text-red-600 mt-2"
        >
          申请金额不能超过项目可用资金
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import FundFlowAPI from '@/api/fundflow'
import userApi from '@/api/user'
import {useUserStore} from '@/stores/user'

const props = defineProps(['projectId', 'projectFunds'])
const emit = defineEmits(['close'])
const userStore = useUserStore()

const form = ref({
  amount: null,
  reason: '',
  proof: null,
  contact: userStore.phoneNumber || ''
})
const loading = ref(false)
const errorMessage = ref('')
const fileInput = ref(null)
const userInfo = ref({})
const isVerified = computed(() =>
  userInfo.value.userRealName &&
  userInfo.value.idCardNumber &&
  userInfo.value.userBankAccount
)
const verificationError = computed(() => {
  if (!userInfo.value.userRealName || !userInfo.value.idCardNumber) {
    return '请先完成实名认证'
  }
  if (!userInfo.value.userBankAccount) {
    return '请先绑定银行卡'
  }
  return ''
})

const handleFileUpload = (event) => {
  form.value.proof = event.target.files[0]
}

const fetchUserInfo = async () => {
  try {
    const response = await userApi.getUserInfo(userStore.userId)
    userInfo.value = response || {}
  } catch (error) {
    console.error('获取用户信息失败:', error)
    errorMessage.value = '无法验证用户信息，请稍后重试'
  }
}

const handleApply = async () => {
  if (!isVerified.value) {
    errorMessage.value = verificationError.value
    return
  }
  if (!form.value.reason) {
    errorMessage.value = '请填写申请理由'
    return
  }
  if (!form.value.amount || form.value.amount <= 0) {
    errorMessage.value = '请输入有效金额'
    return
  }
  if (form.value.amount > props.projectFunds) {
    errorMessage.value = '申请金额不能超过项目可用资金'
    return
  }
  if (!form.value.proof) {
    errorMessage.value = '请上传证明材料'
    return
  }

  loading.value = true
  try {
    const formData = new FormData()
    formData.append('projectId', props.projectId)
    formData.append('recipientId', userStore.userId)
    formData.append('amount', form.value.amount)
    formData.append('proofFile', form.value.proof)

    const response = await FundFlowAPI.createIndividualFundFlow(formData)
    if (response) {
      alert('申请已提交，等待审核')
      emit('close')
    } else {
      errorMessage.value = response || '提交失败，请重试'
    }
  } catch (error) {
    errorMessage.value = error.message || '提交失败，请重试'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchUserInfo()
})
</script>
