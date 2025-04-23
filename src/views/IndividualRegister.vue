<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-indigo-900 text-white px-4 py-8"
  >
    <div class="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-lg">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-6">
        个人用户注册
      </h2>

      <div class="flex justify-center mb-8">
        <button
          class="px-5 py-2 mx-2 rounded-full font-semibold bg-indigo-600 text-white shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled
        >
          个人用户
        </button>
        <router-link
          class="px-5 py-2 mx-2 rounded-full font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          to="/register/org"
        >
          公益组织
        </router-link>
      </div>

      <form
        novalidate
        @submit.prevent="handleRegister"
      >
        <div class="mb-5">
          <label
            class="sr-only"
            for="phoneNumber"
          >手机号</label>
          <input
            id="phoneNumber"
            v-model="form.phoneNumber"
            :aria-describedby="phoneError ? 'phone-error' : null"
            :class="{ 'border-red-500 ring-red-500': phoneError }"
            aria-invalid="!!phoneError"
            aria-required="true"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
            inputmode="numeric"
            maxlength="11"
            placeholder="手机号"
            required
            type="tel"
            @blur="validatePhone"
            @input="restrictToNumbers(); validatePhone();"
          />
          <p
            v-if="phoneError"
            id="phone-error"
            class="text-red-600 text-xs mt-1 h-4"
            role="alert"
          >
            {{ phoneError }}
          </p>
          <div
            v-else
            class="h-4 mt-1"
          />
        </div>

        <div class="mb-5">
          <label
            class="sr-only"
            for="captcha"
          >图形验证码</label>
          <div class="flex items-start space-x-2">
            <div class="flex-grow">
              <input
                id="captcha"
                v-model="form.captcha"
                :aria-describedby="captchaError ? 'captcha-error' : null"
                :class="{ 'border-red-500 ring-red-500': captchaError }"
                aria-invalid="!!captchaError"
                aria-required="true"
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                maxlength="6"
                placeholder="图形验证码"
                required
                type="text"
                @blur="validateCaptcha"
                @input="validateCaptcha"
              />
              <p
                v-if="captchaError"
                id="captcha-error"
                class="text-red-600 text-xs mt-1 h-4"
                role="alert"
              >
                {{ captchaError }}
              </p>
              <div
                v-else
                class="h-4 mt-1"
              />
            </div>
            <img
              v-if="captchaImage"
              :src="captchaImage"
              alt="图形验证码"
              class="w-1/3 h-12 rounded border border-gray-300 cursor-pointer flex-shrink-0"
              title="点击刷新验证码"
              @click="fetchCaptcha"
            />
            <div
              v-else
              class="w-1/3 h-12 rounded border border-gray-300 flex items-center justify-center text-gray-500 text-sm flex-shrink-0"
            >
              加载中...
            </div>
          </div>
        </div>

        <div class="mb-5">
          <label
            class="sr-only"
            for="smsCode"
          >手机验证码</label>
          <div class="flex items-start space-x-2">
            <div class="flex-grow">
              <input
                id="smsCode"
                v-model="form.smsCode"
                :aria-describedby="smsCodeError ? 'sms-error' : null"
                :class="{ 'border-red-500 ring-red-500': smsCodeError }"
                aria-invalid="!!smsCodeError"
                aria-required="true"
                class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
                inputmode="numeric"
                maxlength="6"
                placeholder="手机验证码"
                required
                type="text"
                @blur="validateSmsCode"
                @input="validateSmsCode"
              />
              <p
                v-if="smsCodeError"
                id="sms-error"
                class="text-red-600 text-xs mt-1 h-4"
                role="alert"
              >
                {{ smsCodeError }}
              </p>
              <div
                v-else
                class="h-4 mt-1"
              />
            </div>
            <button
              :class="
                isSmsButtonDisabled
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-500'
              "
              :disabled="isSmsButtonDisabled"
              class="w-1/3 flex-shrink-0 p-3 rounded-lg text-sm font-semibold transition-colors duration-200"
              type="button"
              @click="fetchSmsCode"
            >
              {{ smsButtonText }}
            </button>
          </div>
        </div>

        <div class="mb-1 relative">
          <label
            class="sr-only"
            for="password"
          >密码</label>
          <input
            id="password"
            v-model="form.password"
            :aria-describedby="passwordError ? 'password-error' : 'password-hint'"
            :class="{ 'border-red-500 ring-red-500': passwordError }"
            :type="showPassword ? 'text' : 'password'"
            aria-invalid="!!passwordError"
            aria-required="true"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500 pr-12"
            placeholder="密码"
            required
            @blur="validatePassword"
            @input="validatePassword"
          />
          <button
            :aria-label="showPassword ? '隐藏密码' : '显示密码'"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100 p-2 rounded-full"
            type="button"
            @click="togglePassword"
          >
            <svg
              v-if="showPassword"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
        <p
          id="password-hint"
          class="text-gray-600 text-xs mb-1"
        >
          密码需8位以上，可含字母、数字和!@#$%^&*
        </p>
        <p
          v-if="passwordError"
          id="password-error"
          class="text-red-600 text-xs mt-1 h-4"
          role="alert"
        >
          {{ passwordError }}
        </p>
        <div
          v-else
          class="h-4 mt-1"
        />

        <div class="mb-6 relative">
          <label
            class="sr-only"
            for="confirmPassword"
          >再次输入密码</label>
          <div class="relative">
            <input
              id="confirmPassword"
              v-model="form.confirmPassword"
              :aria-describedby="confirmPasswordError ? 'confirm-password-error' : null"
              :class="{ 'border-red-500 ring-red-500': confirmPasswordError }"
              :type="showConfirmPassword ? 'text' : 'password'"
              aria-invalid="!!confirmPasswordError"
              aria-required="true"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500 pr-12"
              placeholder="再次输入密码"
              required
              @blur="validateConfirmPassword"
              @input="validateConfirmPassword"
            />
            <button
              :aria-label="showConfirmPassword ? '隐藏密码' : '显示密码'"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100 p-2 rounded-full"
              type="button"
              @click="toggleConfirmPassword"
            >
              <svg
                v-if="showConfirmPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
              </svg>
            </button>
          </div>
          <p
            v-if="confirmPasswordError"
            id="confirm-password-error"
            class="text-red-600 text-xs mt-1 h-4"
            role="alert"
          >
            {{ confirmPasswordError }}
          </p>
          <div
            v-else
            class="h-4 mt-1"
          />
        </div>

        <div
          v-if="errorMessage"
          aria-live="assertive"
          class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm"
          role="alert"
        >
          {{ errorMessage }}
        </div>

        <button
          :disabled="isRegisterDisabled || loading"
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
            注册中...
          </span>
          <span v-else>注册</span>
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        已有账号？
        <router-link
          class="font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
          to="/login"
        >
          立即登录
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

// --- 状态 ---
const form = ref({
  phoneNumber: '',
  captcha: '',
  smsCode: '',
  password: '',
  confirmPassword: '',
})
const captchaImage = ref('')
const captchaKey = ref('')
const smsCountdown = ref(0)
const smsLoading = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// 校验错误信息
const phoneError = ref('')
const captchaError = ref('')
const smsCodeError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

let smsTimer = null
let errorTimeout = null

// 判断获取短信按钮是否应该禁用
const isSmsButtonDisabled = computed(() => {
  return (
    smsCountdown.value > 0 ||
    smsLoading.value ||
    !!phoneError.value ||
    !form.value.phoneNumber ||
    !!captchaError.value ||
    !form.value.captcha
  )
})

// 短信按钮显示的文本
const smsButtonText = computed(() => {
  if (smsLoading.value) return '发送中...'
  if (smsCountdown.value > 0) return `${smsCountdown.value}秒后重试`
  return '获取验证码'
})

// 判断注册按钮是否应该禁用
const isRegisterDisabled = computed(() => {
  return (
    !!phoneError.value ||
    !!captchaError.value ||
    !!smsCodeError.value ||
    !!passwordError.value ||
    !!confirmPasswordError.value ||
    !form.value.phoneNumber ||
    !form.value.captcha ||
    !form.value.smsCode ||
    !form.value.password ||
    !form.value.confirmPassword
  )
})

// --- 校验函数 ---
const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!form.value.phoneNumber) {
    phoneError.value = '手机号不能为空'
  } else if (form.value.phoneNumber.length !== 11) {
    phoneError.value = '手机号必须为11位'
  } else if (!phoneRegex.test(form.value.phoneNumber)) {
    phoneError.value = '请输入有效的中国大陆手机号'
  } else {
    phoneError.value = ''
  }
  return !phoneError.value
}

const restrictToNumbers = () => {
  form.value.phoneNumber = form.value.phoneNumber.replace(/\D/g, '')
}

const validateCaptcha = () => {
  if (!form.value.captcha) {
    captchaError.value = '图形验证码不能为空'
  } else if (form.value.captcha.length < 4) {
    captchaError.value = '验证码长度不足'
  } else {
    captchaError.value = ''
  }
  return !captchaError.value
}

const validateSmsCode = () => {
  if (!form.value.smsCode) {
    smsCodeError.value = '手机验证码不能为空'
  } else if (!/^\d{4}$/.test(form.value.smsCode)) {
    smsCodeError.value = '请输入4位数字验证码'
  } else {
    smsCodeError.value = ''
  }
  return !smsCodeError.value
}

const validatePassword = () => {
  const passwordRegex = /^[A-Za-z0-9!@#$%^&*]{8,}$/
  if (!form.value.password) {
    passwordError.value = '密码不能为空'
  } else if (form.value.password.length < 8) {
    passwordError.value = '密码至少需要8位'
  } else if (!passwordRegex.test(form.value.password)) {
    passwordError.value = '密码包含无效字符或长度不足'
  } else {
    passwordError.value = ''
  }
  if (form.value.confirmPassword) {
    validateConfirmPassword()
  }
  return !passwordError.value
}

const validateConfirmPassword = () => {
  if (!form.value.confirmPassword) {
    confirmPasswordError.value = '请再次输入密码'
  } else if (form.value.password !== form.value.confirmPassword) {
    confirmPasswordError.value = '两次输入的密码不一致'
  } else {
    confirmPasswordError.value = ''
  }
  return !confirmPasswordError.value
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const fetchCaptcha = async () => {
  captchaImage.value = ''
  errorMessage.value = ''
  try {
    const data = await userApi.getCaptcha()
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data
    if (parsedData && parsedData.image && parsedData.captchaKey) {
      captchaImage.value = `data:image/png;base64,${parsedData.image}`
      captchaKey.value = parsedData.captchaKey
      captchaError.value = ''
    } else {
      throw new Error('验证码数据格式不正确')
    }
  } catch (error) {
    console.error('获取验证码失败:', error)
    errorMessage.value = '无法加载图形验证码，请稍后重试'
  }
}

const startSmsCountdown = () => {
  smsCountdown.value = 60
  if (smsTimer) clearInterval(smsTimer)
  smsTimer = setInterval(() => {
    smsCountdown.value--
    if (smsCountdown.value <= 0) {
      clearInterval(smsTimer)
      smsTimer = null
    }
  }, 1000)
}

const fetchSmsCode = async () => {
  const isPhoneValid = validatePhone()
  const isCaptchaValid = validateCaptcha()
  if (!isPhoneValid || !isCaptchaValid) {
    setFlashError('请先正确填写所有必填字段')
    return
  }
  if (isSmsButtonDisabled.value) return

  smsLoading.value = true
  errorMessage.value = ''
  try {
    await userApi.validateCaptcha({captchaKey: captchaKey.value, captcha: form.value.captcha})
    await userApi.getSmsCode(form.value.phoneNumber)
    startSmsCountdown()
  } catch (error) {
    console.error('获取短信验证码失败:', error)
    if (error.message && error.message.includes('验证码已过期或无效')) {
      errorMessage.value = '图形验证码已过期或无效，请重试'
      fetchCaptcha()
      form.value.captcha = ''
    } else if (error.message && error.message.includes('验证码错误')) {
      errorMessage.value = '图形验证码错误，请重试'
    } else {
      errorMessage.value = '获取手机验证码失败，请稍后重试'
    }
    setFlashError(errorMessage.value)
  } finally {
    smsLoading.value = false
  }
}

const runAllValidations = () => {
  return [
    validatePhone(),
    validateCaptcha(),
    validateSmsCode(),
    validatePassword(),
    validateConfirmPassword(),
  ].every((isValid) => isValid)
}

const handleRegister = async () => {
  errorMessage.value = ''
  if (!runAllValidations()) {
    setFlashError('请检查表单中的错误')
    return
  }
  if (loading.value) return

  loading.value = true
  try {
    const payload = {
      phoneNumber: form.value.phoneNumber,
      code: form.value.smsCode,
      password: form.value.password,
    }
    const userData = await userApi.registerIndividual(payload)
    userStore.setUserData(userData)
    router.push('/user-center/individual')
  } catch (error) {
    console.error('注册失败:', error)
    if (error.message && error.message.includes('验证码错误或无效')) {
      errorMessage.value = '手机验证码错误或已过期'
      smsCodeError.value = '手机验证码错误或已过期'
    } else if (error.message && error.message.includes('用户已存在')) {
      errorMessage.value = '该手机号已被注册'
      phoneError.value = '该手机号已被注册'
    } else {
      errorMessage.value = '注册失败，请稍后重试'
    }
    setFlashError(errorMessage.value)
  } finally {
    loading.value = false
  }
}

const setFlashError = (message, duration = 3000) => {
  errorMessage.value = message
  if (errorTimeout) clearTimeout(errorTimeout)
  errorTimeout = setTimeout(() => {
    errorMessage.value = ''
  }, duration)
}

onMounted(() => {
  fetchCaptcha()
})

onUnmounted(() => {
  if (smsTimer) clearInterval(smsTimer)
  if (errorTimeout) clearTimeout(errorTimeout)
  if (errorTimeout) clearTimeout(errorTimeout)
})
</script>

<style scoped>
input {
  transition: all 0.3s ease;
  height: 48px;
}

input:focus {
  border-color: #6366f1;
}

input[aria-invalid='true'] {
  border-color: #e53e3e;
}

.text-red-600 {
  transition: all 0.2s ease-in-out;
}

button svg {
  vertical-align: middle;
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
