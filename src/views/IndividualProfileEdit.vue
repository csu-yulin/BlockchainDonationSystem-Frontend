<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-indigo-900 text-white px-4 py-12"
  >
    <div class="bg-white bg-opacity-95 p-10 rounded-2xl shadow-xl w-full max-w-4xl lg:max-w-5xl backdrop-blur-lg">
      <h2 class="text-4xl font-bold text-center text-gray-900 mb-10 flex items-center justify-center">
        <svg
          class="w-8 h-8 mr-2 text-indigo-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        完善个人资料
      </h2>

      <form
        novalidate
        @submit.prevent="handleSubmit"
      >
        <!-- 头像和状态 -->
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div class="text-center">
            <label class="block text-gray-600 text-sm mb-2">头像（选填）</label>
            <div
              class="relative w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md"
            >
              <img
                v-if="form.avatar"
                :src="form.avatar"
                alt="用户头像"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500"
              >
                无头像
              </div>
              <input
                id="avatar"
                ref="avatarInput"
                accept="image/*"
                class="hidden"
                type="file"
                @change="handleAvatarUpload"
              />
            </div>
            <button
              class="mt-3 px-4 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="button"
              @click="$refs.avatarInput.click()"
            >
              {{ form.avatar ? '更换头像' : '上传头像' }}
            </button>
            <p
              v-if="avatarError"
              class="text-red-600 text-xs mt-2 h-4"
              role="alert"
            >
              {{ avatarError }}
            </p>
            <div
              v-else
              class="h-4 mt-2"
            />
          </div>
          <div class="flex-1 text-center md:text-left">
            <label class="block text-gray-600 text-sm mb-1">用户状态</label>
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span
                :class="{
                  'bg-green-100 text-green-700': form.status === 'ACTIVE',
                  'bg-gray-100 text-gray-700': form.status === 'INACTIVE'
                }"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              >
                <svg
                  v-if="form.status === 'ACTIVE'"
                  class="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                {{ form.status === 'ACTIVE' ? '已启用' : '已禁用' }}
              </span>
            </div>
            <p class="text-gray-500 text-xs mt-2">
              {{ form.status === 'ACTIVE' ? '账户正常，可参与捐赠和受助' : '账户已禁用，请联系管理员' }}
            </p>
          </div>
        </div>

        <!-- 表单字段（网格布局） -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <!-- 用户昵称 -->
          <div>
            <label
              class="block text-gray-600 text-sm mb-1"
              for="username"
            >昵称（必填）</label>
            <input
              id="username"
              v-model="form.username"
              :aria-describedby="usernameError ? 'username-error' : null"
              :class="{ 'border-red-500 ring-red-500': usernameError }"
              aria-invalid="!!usernameError"
              aria-required="true"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="请输入昵称"
              required
              type="text"
              @blur="validateUsername"
              @input="validateUsername"
            />
            <p
              v-if="usernameError"
              id="username-error"
              class="text-red-600 text-xs mt-1 h-4"
              role="alert"
            >
              {{ usernameError }}
            </p>
            <div
              v-else
              class="h-4 mt-1"
            />
          </div>

          <!-- 电话号码 -->
          <div>
            <label
              class="block text-gray-600 text-sm mb-1"
              for="phoneNumber"
            >电话号码（不可编辑）</label>
            <input
              id="phoneNumber"
              v-model="form.phoneNumber"
              class="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 placeholder-gray-500 cursor-not-allowed"
              disabled
              type="text"
            />
            <p class="text-gray-500 text-xs mt-1">
              注册时绑定的电话号码
            </p>
          </div>

          <!-- 电子邮件 -->
          <div>
            <label
              class="block text-gray-600 text-sm mb-1"
              for="email"
            >电子邮件</label>
            <input
              id="email"
              v-model="form.email"
              :aria-describedby="emailError ? 'email-error' : null"
              :class="{ 'border-red-500 ring-red-500': emailError }"
              aria-invalid="!!emailError"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="请输入电子邮件"
              type="email"
              @blur="validateEmail"
              @input="validateEmail"
            />
            <p
              v-if="emailError"
              id="email-error"
              class="text-red-600 text-xs mt-1 h-4"
              role="alert"
            >
              {{ emailError }}
            </p>
            <div
              v-else
              class="h-4 mt-1"
            />
          </div>

          <!-- 实名认证 -->
          <div>
            <label class="block text-gray-600 text-sm mb-1">实名认证</label>
            <div class="flex items-center gap-4">
              <input
                id="userRealName"
                v-model="form.userRealName"
                :aria-describedby="userRealNameError ? 'user-real-name-error' : null"
                :class="{ 'border-red-500 ring-red-500': userRealNameError }"
                :disabled="isVerified"
                aria-invalid="!!userRealNameError"
                class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                placeholder="真实姓名"
                type="text"
                @blur="validateUserRealName"
                @input="validateUserRealName"
              />
              <input
                id="idCardNumber"
                v-model="form.idCardNumber"
                :aria-describedby="idCardNumberError ? 'id-card-number-error' : null"
                :class="{ 'border-red-500 ring-red-500': idCardNumberError }"
                :disabled="isVerified"
                aria-invalid="!!idCardNumberError"
                class="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                placeholder="身份证号"
                type="text"
                @blur="validateIdCardNumber"
                @input="validateIdCardNumber"
              />
            </div>
            <div class="flex items-center gap-4 mt-2">
              <p
                v-if="userRealNameError"
                id="user-real-name-error"
                class="text-red-600 text-xs h-4"
                role="alert"
              >
                {{ userRealNameError }}
              </p>
              <p
                v-if="idCardNumberError"
                id="id-card-number-error"
                class="text-red-600 text-xs h-4"
                role="alert"
              >
                {{ idCardNumberError }}
              </p>
            </div>
            <div class="mt-2">
              <button
                v-if="!isVerified"
                :disabled="loadingVerification || !form.userRealName || !form.idCardNumber"
                class="px-4 py-1 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                @click="handleVerifyIdentity"
              >
                {{ loadingVerification ? '认证中...' : '实名认证' }}
              </button>
              <span
                v-else
                class="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
              >
                <svg
                  class="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 13l4 4L19 7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  />
                </svg>
                已认证
              </span>
            </div>
            <p class="text-gray-500 text-xs mt-2">
              实名认证用于捐赠或受助身份验证，信息加密存储
            </p>
          </div>
        </div>

        <!-- 个人简介 -->
        <div class="mb-10">
          <label
            class="block text-gray-600 text-sm mb-1"
            for="userBio"
          >个人简介（选填，200字以内）</label>
          <textarea
            id="userBio"
            v-model="form.userBio"
            :aria-describedby="userBioError ? 'user-bio-error' : null"
            :class="{ 'border-red-500 ring-red-500': userBioError }"
            aria-invalid="!!userBioError"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
            placeholder="介绍一下自己吧！（例如兴趣、公益经历）"
            rows="5"
            @blur="validateUserBio"
            @input="validateUserBio"
          />
          <p
            v-if="userBioError"
            id="user-bio-error"
            class="text-red-600 text-xs mt-1 h-4"
            role="alert"
          >
            {{ userBioError }}
          </p>
          <div
            v-else
            class="h-4 mt-1"
          />
        </div>

        <!-- 银行账户信息 -->
        <div class="mb-10">
          <label
            class="block text-gray-600 text-sm mb-1"
            for="userBankAccount"
          >银行账户信息（选填，仅平台可见）</label>
          <input
            id="userBankAccount"
            v-model="form.userBankAccount"
            :aria-describedby="userBankAccountError ? 'user-bank-account-error' : null"
            :class="{ 'border-red-500 ring-red-500': userBankAccountError }"
            aria-invalid="!!userBankAccountError"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
            placeholder="请输入银行账户信息（用于受助或捐赠结算）"
            type="text"
            @blur="validateUserBankAccount"
            @input="validateUserBankAccount"
          />
          <p
            v-if="userBankAccountError"
            id="user-bank-account-error"
            class="text-red-600 text-xs mt-1 h-4"
            role="alert"
          >
            {{ userBankAccountError }}
          </p>
          <p
            v-else
            class="text-gray-500 text-xs mt-1"
          >
            信息加密存储，仅用于公益资金结算
          </p>
        </div>

        <!-- 捐赠历史 -->
        <div class="mb-10">
          <label class="block text-gray-600 text-sm mb-1">捐赠历史</label>
          <div
            v-if="!form.donationHistory || form.donationHistory.length === 0"
            class="p-4 bg-gray-100 rounded-lg text-gray-500 text-sm"
          >
            暂无捐赠记录，快去支持公益项目吧！
          </div>
          <div
            v-else
            class="space-y-4"
          >
            <div
              v-for="(record, index) in form.donationHistory"
              :key="index"
              class="p-4 bg-indigo-50 rounded-lg shadow-sm"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-gray-900 font-medium">
                    {{ record.projectName }}
                  </p>
                  <p class="text-gray-600 text-sm">
                    捐赠金额：¥{{ record.amount }}
                  </p>
                  <p class="text-gray-500 text-xs">
                    时间：{{ formatDate(record.date) }}
                  </p>
                </div>
                <button
                  class="text-indigo-600 hover:text-indigo-800 text-sm"
                  @click="toggleHistoryDetail(index, 'donation')"
                >
                  {{ historyDetails.donation[index] ? '收起' : '详情' }}
                </button>
              </div>
              <transition name="fade">
                <div
                  v-if="historyDetails.donation[index]"
                  class="mt-2 text-gray-600 text-sm"
                >
                  <p>交易哈希：{{ record.txHash }}</p>
                  <p>备注：{{ record.note || '无' }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- 受助历史 -->
        <div class="mb-10">
          <label class="block text-gray-600 text-sm mb-1">受助历史</label>
          <div
            v-if="!form.assistanceHistory || form.assistanceHistory.length === 0"
            class="p-4 bg-gray-100 rounded-lg text-gray-500 text-sm"
          >
            暂无受助记录
          </div>
          <div
            v-else
            class="space-y-4"
          >
            <div
              v-for="(record, index) in form.assistanceHistory"
              :key="index"
              class="p-4 bg-indigo-50 rounded-lg shadow-sm"
            >
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-gray-900 font-medium">
                    {{ record.projectName }}
                  </p>
                  <p class="text-gray-600 text-sm">
                    受助金额：¥{{ record.amount }}
                  </p>
                  <p class="text-gray-500 text-xs">
                    时间：{{ formatDate(record.date) }}
                  </p>
                </div>
                <button
                  class="text-indigo-600 hover:text-indigo-800 text-sm"
                  @click="toggleHistoryDetail(index, 'assistance')"
                >
                  {{ historyDetails.assistance[index] ? '收起' : '详情' }}
                </button>
              </div>
              <transition name="fade">
                <div
                  v-if="historyDetails.assistance[index]"
                  class="mt-2 text-gray-600 text-sm"
                >
                  <p>交易哈希：{{ record.txHash }}</p>
                  <p>备注：{{ record.note || '无' }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>

        <!-- 错误提示 -->
        <!-- 错误/成功提示 -->
        <div
          v-if="errorMessage"
          :class="{
            'bg-red-100 border-red-400 text-red-700': errorMessageType === 'error',
            'bg-green-100 border-green-400 text-green-700': errorMessageType === 'success'
          }"
          aria-live="assertive"
          class="mb-6 p-4 border rounded-lg text-sm"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <!-- 提交按钮 -->
        <button
          :disabled="isSubmitDisabled || loading"
          class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          <span v-if="loading">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
              />
            </svg>
            保存中...
          </span>
          <span v-else>保存资料</span>
        </button>
      </form>

      <!-- 返回首页 -->
      <p class="mt-6 text-center text-sm text-gray-600">
        <router-link
          class="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
          to="/"
        >
          返回首页
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
import userApi from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

// 表单数据（仅个体用户字段）
const form = ref({
  username: '',
  phoneNumber: '',
  avatar: '',
  email: '',
  status: 'ACTIVE',
  userRealName: '',
  idCardNumber: '',
  userBio: '',
  userBankAccount: '',
  donationHistory: [],
  assistanceHistory: []
})

// 错误信息
const usernameError = ref('')
const emailError = ref('')
const avatarError = ref('')
const userRealNameError = ref('')
const idCardNumberError = ref('')
const userBioError = ref('')
const userBankAccountError = ref('')
const errorMessage = ref('')

// 状态
const loading = ref(false)
const loadingVerification = ref(false)
const isVerified = ref(false)
const avatarFile = ref(null)
const historyDetails = ref({
  donation: {},
  assistance: {}
})
const errorMessageType = ref('error') // 新增：error 或 success

// 提交按钮禁用状态
const isSubmitDisabled = computed(() => {
  return !!usernameError.value || !form.value.username
})

// 验证函数
const validateUsername = () => {
  if (!form.value.username) {
    usernameError.value = '昵称不能为空'
  } else if (form.value.username.length > 255) {
    usernameError.value = '昵称长度不能超过255个字符'
  } else {
    usernameError.value = ''
  }
  return !usernameError.value
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (form.value.email && !emailRegex.test(form.value.email)) {
    emailError.value = '请输入有效的电子邮件地址'
  } else if (form.value.email && form.value.email.length > 255) {
    emailError.value = '电子邮件长度不能超过255个字符'
  } else {
    emailError.value = ''
  }
  return !emailError.value
}

const validateUserRealName = () => {
  if (form.value.userRealName && form.value.userRealName.length > 255) {
    userRealNameError.value = '真实姓名长度不能超过255个字符'
  } else {
    userRealNameError.value = ''
  }
  return !userRealNameError.value
}

const validateIdCardNumber = () => {
  const idCardRegex = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/
  if (form.value.idCardNumber && !idCardRegex.test(form.value.idCardNumber)) {
    idCardNumberError.value = '请输入有效的18位身份证号'
  } else if (form.value.idCardNumber && form.value.idCardNumber.length > 18) {
    idCardNumberError.value = '身份证号长度不能超过18个字符'
  } else {
    idCardNumberError.value = ''
  }
  return !idCardNumberError.value
}

const validateUserBio = () => {
  if (form.value.userBio && form.value.userBio.length > 200) {
    userBioError.value = '个人简介不能超过200字'
  } else {
    userBioError.value = ''
  }
  return !userBioError.value
}

const validateUserBankAccount = () => {
  if (form.value.userBankAccount && form.value.userBankAccount.length > 255) {
    userBankAccountError.value = '银行账户信息长度不能超过255个字符'
  } else {
    userBankAccountError.value = ''
  }
  return !userBankAccountError.value
}

const validateAvatar = () => {
  if (avatarFile.value) {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxSize = 2 * 1024 * 1024 // 2MB
    if (!validTypes.includes(avatarFile.value.type)) {
      avatarError.value = '仅支持 JPEG、PNG 或 GIF 格式的图片'
      return false
    }
    if (avatarFile.value.size > maxSize) {
      avatarError.value = '图片大小不能超过2MB'
      return false
    }
    avatarError.value = ''
    return true
  }
  return true // 头像可选
}

// 头像上传处理
const handleAvatarUpload = async (event) => {
  avatarFile.value = event.target.files[0]
  if (avatarFile.value && validateAvatar()) {
    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile.value)
      form.value.avatar = await userApi.uploadAvatar(userStore.userId, formData) // 更新头像 URL
      setFlashError('头像上传成功', 3000, 'success') // 提示成功
    } catch (error) {
      console.error('头像上传失败:', error)
      avatarError.value = error.message || '头像上传失败，请重试'
      setFlashError(avatarError.value)
      form.value.avatar = '' // 清除无效头像
      avatarFile.value = null // 清除文件
    }
  } else {
    form.value.avatar = ''
    avatarFile.value = null
  }
}

// 实名认证
const handleVerifyIdentity = async () => {
  if (!validateUserRealName() || !validateIdCardNumber()) {
    return
  }
  loadingVerification.value = true
  try {
    const payload = {
      userId: userStore.userId,
      userRealName: form.value.userRealName,
      idCardNumber: form.value.idCardNumber
    }
    console.log(payload)
    const response = await userApi.individualVerify(payload)
    console.log(response)
    if (response === '身份认证成功') {
      isVerified.value = true
      setFlashError('实名认证成功', 3000, 'success')
    } else {
      setFlashError(response || '实名认证失败，请检查信息')
    }
  } catch (error) {
    console.error('实名认证失败:', error)
    setFlashError(error.message || '实名认证失败，请稍后重试')
  } finally {
    loadingVerification.value = false
  }
}

// 历史记录详情切换
const toggleHistoryDetail = (index, type) => {
  historyDetails.value[type][index] = !historyDetails.value[type][index]
}

// 格式化日期
const formatDate = (date) => {
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 运行所有验证
const runAllValidations = () => {
  const validations = [
    validateUsername(),
    validateEmail(),
    validateUserRealName(),
    validateIdCardNumber(),
    validateUserBio(),
    validateUserBankAccount(),
    validateAvatar()
  ]
  return validations.every((isValid) => isValid)
}

// 表单提交
const handleSubmit = async () => {
  errorMessage.value = ''
  if (!runAllValidations()) {
    setFlashError('请检查表单中的错误')
    return
  }
  if (loading.value) return

  loading.value = true
  try {
    const payload = {
      userId: userStore.userId,
      username: form.value.username,
      email: form.value.email || null,
      userRealName: form.value.userRealName || null,
      idCardNumber: form.value.idCardNumber || null,
      userBio: form.value.userBio || null,
      userBankAccount: form.value.userBankAccount || null
    }
    const userData = await userApi.updateIndividual(payload)
    userStore.setUserData(userData)
    setFlashError('资料保存成功', 3000, 'success')
    // setTimeout(() => {
    //   router.push('/')
    // }, 1000)
  } catch (error) {
    console.error('保存资料失败:', error)
    errorMessage.value = error.message || '保存资料失败，请稍后重试'
    setFlashError(errorMessage.value)
  } finally {
    loading.value = false
  }
}

// 错误/成功提示闪烁
let errorTimeout = null
const setFlashError = (message, duration = 3000, type = 'error') => {
  errorMessage.value = message
  errorMessageType.value = type // 新增类型状态
  if (errorTimeout) clearTimeout(errorTimeout)
  errorTimeout = setTimeout(() => {
    errorMessage.value = ''
    errorMessageType.value = 'error'
  }, duration)
}

// 加载已有数据
onMounted(async () => {
  try {
    const userData = await userApi.getUserInfo(userStore.userId)
    form.value.username = userData.username || ''
    form.value.phoneNumber = userData.phoneNumber || ''
    form.value.avatar = userData.avatar || ''
    form.value.email = userData.email || ''
    form.value.status = userData.status || 'ACTIVE'
    form.value.userRealName = userData.userRealName || ''
    form.value.idCardNumber = userData.idCardNumber || ''
    form.value.userBio = userData.userBio || ''
    form.value.userBankAccount = userData.userBankAccount || ''
    form.value.donationHistory = userData.donationHistory ? JSON.parse(userData.donationHistory) : []
    form.value.assistanceHistory = userData.assistanceHistory ? JSON.parse(userData.assistanceHistory) : []
    isVerified.value = !!(userData.userRealName && userData.idCardNumber) // 假设已填写即认证
  } catch (error) {
    console.error('加载用户资料失败:', error)
    errorMessage.value = '加载用户资料失败，请稍后重试'
    setFlashError(errorMessage.value)
  }
})

// 清理定时器
onUnmounted(() => {
  if (errorTimeout) clearTimeout(errorTimeout)
})
</script>

<style scoped>
input,
textarea {
  transition: all 0.3s ease;
  height: 48px;
}

textarea {
  height: auto;
}

input:focus,
textarea:focus {
  border-color: #6366f1;
}

input[aria-invalid='true'],
textarea[aria-invalid='true'] {
  border-color: #e53e3e;
}

.text-red-600 {
  transition: all 0.2s ease-in-out;
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
