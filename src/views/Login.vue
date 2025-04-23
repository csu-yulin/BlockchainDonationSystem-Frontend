<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-800 to-indigo-900 text-white"
  >
    <div class="bg-white bg-opacity-90 p-8 rounded-2xl shadow-xl w-full max-w-md backdrop-blur-lg">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-6">
        登录
      </h2>

      <!-- 角色选择 -->
      <div class="flex justify-center mb-6">
        <button
          :class="[
            'px-4 py-2 mx-2 rounded-full font-semibold transition-all duration-300',
            role === 'INDIVIDUAL' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="role = 'INDIVIDUAL'"
        >
          个人用户
        </button>
        <button
          :class="[
            'px-4 py-2 mx-2 rounded-full font-semibold transition-all duration-300',
            role === 'ORG' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="role = 'ORG'"
        >
          公益组织
        </button>
      </div>

      <!-- 个人用户登录 -->
      <form
        v-if="role === 'INDIVIDUAL'"
        @submit.prevent="handleLogin"
      >
        <div class="mb-4">
          <input
            v-model="form.phoneNumber"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            placeholder="手机号"
            type="text"
            @blur="validatePhone"
            @input="restrictToNumbers"
          />
          <p
            v-if="phoneError"
            class="text-red-500 text-sm mt-1"
          >
            {{ phoneError }}
          </p>
        </div>
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 pr-14"
              placeholder="密码"
              @blur="validatePassword"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            v-if="passwordError"
            class="text-red-500 text-sm mt-1"
          >
            {{ passwordError }}
          </p>
        </div>
        <button
          :disabled="loading || phoneError || passwordError || !form.phoneNumber || !form.password"
          class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
          type="submit"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <!-- 公益组织登录 -->
      <form
        v-else
        @submit.prevent="handleLogin"
      >
        <div class="mb-4">
          <input
            v-model="form.email"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            placeholder="邮箱"
            type="email"
            @blur="validateEmail"
          />
          <p
            v-if="emailError"
            class="text-red-500 text-sm mt-1"
          >
            {{ emailError }}
          </p>
        </div>
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 pr-14"
              placeholder="密码"
              @blur="validatePassword"
            />
            <button
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
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
            v-if="passwordError"
            class="text-red-500 text-sm mt-1"
          >
            {{ passwordError }}
          </p>
        </div>
        <button
          :disabled="loading || emailError || passwordError || !form.email || !form.password"
          class="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
          type="submit"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <!-- 错误提示 -->
      <p
        v-if="errorMessage"
        class="mt-4 text-center text-red-500 animate-flash"
      >
        {{ errorMessage }}
      </p>
      <p class="mt-4 text-center text-gray-600">
        没有账号？
        <router-link
          class="text-indigo-500 hover:underline"
          to="/register/Individual"
        >
          注册
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
import userApi from '@/api/user'

const router = useRouter()
const userStore = useUserStore()

const role = ref('INDIVIDUAL')
const form = ref({
  phoneNumber: '',
  email: '',
  password: '',
})
const loading = ref(false)
const errorMessage = ref('')
const phoneError = ref('')
const emailError = ref('')
const passwordError = ref('')
const showPassword = ref(false)

const validatePhone = () => {
  const phoneRegex = /^1[3-9]\d{9}$/
  if (!form.value.phoneNumber) {
    phoneError.value = '手机号不能为空'
  } else if (!phoneRegex.test(form.value.phoneNumber)) {
    phoneError.value = '请输入正确的手机号'
  } else {
    phoneError.value = ''
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email) {
    emailError.value = '邮箱不能为空'
  } else if (!emailRegex.test(form.value.email)) {
    emailError.value = '请输入正确的邮箱地址'
  } else {
    emailError.value = ''
  }
}

const restrictToNumbers = (event) => {
  form.value.phoneNumber = event.target.value.replace(/\D/g, '')
}

const validatePassword = () => {
  if (!form.value.password) {
    passwordError.value = '密码不能为空'
  } else {
    passwordError.value = ''
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleLogin = async () => {
  if (role.value === 'INDIVIDUAL') {
    validatePhone()
    validatePassword()
    if (phoneError.value || passwordError.value) {
      errorMessage.value = '请检查输入内容'
      flashError()
      return
    }
  } else {
    validateEmail()
    validatePassword()
    if (emailError.value || passwordError.value) {
      errorMessage.value = '请检查输入内容'
      flashError()
      return
    }
  }

  loading.value = true
  errorMessage.value = ''
  try {
    let userData
    if (role.value === 'INDIVIDUAL') {
      userData = await userApi.loginByPhone(form.value)
    } else {
      userData = await userApi.loginByEmail(form.value)
    }
    userStore.setUserData(userData)
    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect)
  } catch (error) {
    errorMessage.value = error.message || '登录失败，请检查登录信息'
    flashError()
  } finally {
    loading.value = false
  }
}

const flashError = () => {
  setTimeout(() => {
    errorMessage.value = ''
  }, 2000)
}
</script>

<style scoped>
input {
  transition: all 0.3s ease;
}

input:focus {
  border-color: #6366f1;
}

.animate-flash {
  animation: flash 0.5s ease-in-out 3;
}

@keyframes flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.relative {
  position: relative;
}

input[type="password"], input[type="text"], input[type="email"] {
  height: 48px;
}

button svg {
  vertical-align: middle;
}

/* Ensure toggle button is properly aligned and not clipped */
.relative button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
}

/* Adjust padding to prevent icon clipping */
input[type="password"] {
  padding-right: 3.5rem; /* Increased from pr-12 to pr-14 in Tailwind classes */
}
</style>
