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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h-2m-2 0h-2m-2 0h-2m-2 0h-2M12 7v2m0 4v2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
        完善组织资料
      </h2>

      <form
        novalidate
        @submit.prevent="handleSubmit"
      >
        <!-- LOGO 和状态 -->
        <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
          <div class="text-center">
            <label class="block text-gray-600 text-sm mb-2">组织 LOGO（选填）</label>
            <div
              class="relative w-36 h-36 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-indigo-100 shadow-md"
            >
              <img
                v-if="form.avatar"
                :src="form.avatar"
                alt="组织 LOGO"
                class="w-full h-full object-cover"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500"
              >
                无 LOGO
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
              {{ form.avatar ? '更换 LOGO' : '上传 LOGO' }}
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
            <label class="block text-gray-600 text-sm mb-1">组织状态</label>
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
              {{ form.status === 'ACTIVE' ? '账户正常，可开展公益活动' : '账户已禁用，请联系管理员' }}
            </p>
            <label class="block text-gray-600 text-sm mt-4 mb-1">认证状态</label>
            <div class="flex items-center justify-center md:justify-start gap-2">
              <span
                :class="{
                  'bg-yellow-100 text-yellow-700': form.certification_status === 'PENDING',
                  'bg-green-100 text-green-700': form.certification_status === 'APPROVED',
                  'bg-red-100 text-red-700': form.certification_status === 'REJECTED'
                }"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              >
                {{
                  form.certification_status === 'PENDING' ? '待审核' :
                  form.certification_status === 'APPROVED' ? '已通过' :
                  '已拒绝'
                }}
              </span>
            </div>
            <p
              v-if="form.certification_notes"
              class="text-gray-500 text-xs mt-2"
            >
              审核备注：{{ form.certification_notes }}
            </p>
          </div>
        </div>

        <!-- 表单字段（网格布局） -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <!-- 组织名称 -->
          <div>
            <label
              class="block text-gray-600 text-sm mb-1"
              for="orgName"
            >组织名称（必填）</label>
            <input
              id="orgName"
              v-model="form.orgName"
              :aria-describedby="orgNameError ? 'org-name-error' : null"
              :class="{ 'border-red-500 ring-red-500': orgNameError }"
              aria-invalid="!!orgNameError"
              aria-required="true"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="请输入组织名称"
              required
              type="text"
              @blur="validateOrgName"
              @input="validateOrgName"
            />
            <p
              v-if="orgNameError"
              id="org-name-error"
              class="text-red-600 text-xs mt-1 h-4"
              role="alert"
            >
              {{ orgNameError }}
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

          <!-- 联系人姓名 -->
          <div>
            <label
              class="block text-gray-600 text-sm mb-1"
              for="contactPersonName"
            >联系人姓名（必填）</label>
            <input
              id="contactPersonName"
              v-model="form.contactPersonName"
              :aria-describedby="contactPersonNameError ? 'contact-person-name-error' : null"
              :class="{ 'border-red-500 ring-red-500': contactPersonNameError }"
              aria-invalid="!!contactPersonNameError"
              aria-required="true"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="请输入联系人姓名"
              required
              type="text"
              @blur="validateContactPersonName"
              @input="validateContactPersonName"
            />
            <p
              v-if="contactPersonNameError"
              id="contact-person-name-error"
              class="text-red-600 text-xs mt-1 h-4"
              role="alert"
            >
              {{ contactPersonNameError }}
            </p>
            <div
              v-else
              class="h-4 mt-1"
            />
          </div>

          <!-- 组织许可证号 -->
          <div>
            <label
              class="block text-gray-600 text-sm mb-1"
              for="orgLicenseNumber"
            >组织许可证号（必填）</label>
            <input
              id="orgLicenseNumber"
              v-model="form.orgLicenseNumber"
              :aria-describedby="orgLicenseNumberError ? 'org-license-number-error' : null"
              :class="{ 'border-red-500 ring-red-500': orgLicenseNumberError }"
              aria-invalid="!!orgLicenseNumberError"
              aria-required="true"
              class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
              placeholder="请输入组织许可证号"
              required
              type="text"
              @blur="validateOrgLicenseNumber"
              @input="validateOrgLicenseNumber"
            />
            <p
              v-if="orgLicenseNumberError"
              id="org-license-number-error"
              class="text-red-600 text-xs mt-1 h-4"
              role="alert"
            >
              {{ orgLicenseNumberError }}
            </p>
            <div
              v-else
              class="h-4 mt-1"
            />
          </div>
        </div>

        <!-- 组织简介 -->
        <div class="mb-10">
          <label
            class="block text-gray-600 text-sm mb-1"
            for="orgBio"
          >组织简介（选填，200字以内）</label>
          <textarea
            id="orgBio"
            v-model="form.orgBio"
            :aria-describedby="orgBioError ? 'org-bio-error' : null"
            :class="{ 'border-red-500 ring-red-500': orgBioError }"
            aria-invalid="!!orgBioError"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
            placeholder="介绍一下您的组织吧！（例如宗旨、公益项目）"
            rows="5"
            @blur="validateOrgBio"
            @input="validateOrgBio"
          />
          <p
            v-if="orgBioError"
            id="org-bio-error"
            class="text-red-600 text-xs mt-1 h-4"
            role="alert"
          >
            {{ orgBioError }}
          </p>
          <div
            v-else
            class="h-4 mt-1"
          />
        </div>

        <!-- 组织银行账户 -->
        <div class="mb-10">
          <label
            class="block text-gray-600 text-sm mb-1"
            for="orgBankAccount"
          >组织银行账户（选填，仅平台可见）</label>
          <input
            id="orgBankAccount"
            v-model="form.orgBankAccount"
            :aria-describedby="orgBankAccountError ? 'org-bank-account-error' : null"
            :class="{ 'border-red-500 ring-red-500': orgBankAccountError }"
            aria-invalid="!!orgBankAccountError"
            class="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 placeholder-gray-500"
            placeholder="请输入银行账户信息（用于公益资金结算）"
            type="text"
            @blur="validateOrgBankAccount"
            @input="validateOrgBankAccount"
          />
          <p
            v-if="orgBankAccountError"
            id="org-bank-account-error"
            class="text-red-600 text-xs mt-1 h-4"
            role="alert"
          >
            {{ orgBankAccountError }}
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

// 表单数据（公益组织字段）
const form = ref({
  orgName: '',
  phoneNumber: '',
  avatar: '',
  email: '',
  status: 'ACTIVE',
  contactPersonName: '',
  orgLicenseNumber: '',
  orgBio: '',
  orgBankAccount: '',
  certification_status: 'PENDING',
  certification_notes: '',
  donationHistory: [],
  assistanceHistory: []
})

// 错误信息
const orgNameError = ref('')
const emailError = ref('')
const avatarError = ref('')
const contactPersonNameError = ref('')
const orgLicenseNumberError = ref('')
const orgBioError = ref('')
const orgBankAccountError = ref('')
const errorMessage = ref('')

// 状态
const loading = ref(false)
const avatarFile = ref(null)
const historyDetails = ref({
  donation: {},
  assistance: {}
})
const errorMessageType = ref('error') // error 或 success

// 提交按钮禁用状态
const isSubmitDisabled = computed(() => {
  return (
    !!orgNameError.value ||
    !!contactPersonNameError.value ||
    !!orgLicenseNumberError.value ||
    !form.value.orgName ||
    !form.value.contactPersonName ||
    !form.value.orgLicenseNumber
  )
})

// 验证函数
const validateOrgName = () => {
  if (!form.value.orgName) {
    orgNameError.value = '组织名称不能为空'
  } else if (form.value.orgName.length < 2 || form.value.orgName.length > 255) {
    orgNameError.value = '组织名称需2-255个字符'
  } else {
    orgNameError.value = ''
  }
  return !orgNameError.value
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

const validateContactPersonName = () => {
  if (!form.value.contactPersonName) {
    contactPersonNameError.value = '联系人姓名不能为空'
  } else if (form.value.contactPersonName.length < 2 || form.value.contactPersonName.length > 255) {
    contactPersonNameError.value = '联系人姓名需2-255个字符'
  } else {
    contactPersonNameError.value = ''
  }
  return !contactPersonNameError.value
}

const validateOrgLicenseNumber = () => {
  const licenseRegex = /^[A-Za-z0-9]{8,255}$/
  if (!form.value.orgLicenseNumber) {
    orgLicenseNumberError.value = '组织许可证号不能为空'
  } else if (!licenseRegex.test(form.value.orgLicenseNumber)) {
    orgLicenseNumberError.value = '许可证号需8-255位数字或字母'
  } else {
    orgLicenseNumberError.value = ''
  }
  return !orgLicenseNumberError.value
}

const validateOrgBio = () => {
  if (form.value.orgBio && form.value.orgBio.length > 200) {
    orgBioError.value = '组织简介不能超过200字'
  } else {
    orgBioError.value = ''
  }
  return !orgBioError.value
}

const validateOrgBankAccount = () => {
  if (form.value.orgBankAccount && form.value.orgBankAccount.length > 255) {
    orgBankAccountError.value = '银行账户信息长度不能超过255个字符'
  } else {
    orgBankAccountError.value = ''
  }
  return !orgBankAccountError.value
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
  return true // LOGO 可选
}

// LOGO 上传处理
const handleAvatarUpload = async (event) => {
  avatarFile.value = event.target.files[0]
  if (avatarFile.value && validateAvatar()) {
    try {
      const formData = new FormData()
      formData.append('avatar', avatarFile.value)
      form.value.avatar = await userApi.uploadAvatar(userStore.userId, formData) // 更新 LOGO URL
      setFlashError('LOGO 上传成功', 3000, 'success')
    } catch (error) {
      console.error('LOGO 上传失败:', error)
      avatarError.value = error.message || 'LOGO 上传失败，请重试'
      setFlashError(avatarError.value)
      form.value.avatar = ''
      avatarFile.value = null
    }
  } else {
    form.value.avatar = ''
    avatarFile.value = null
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
  return [
    validateOrgName(),
    validateEmail(),
    validateContactPersonName(),
    validateOrgLicenseNumber(),
    validateOrgBio(),
    validateOrgBankAccount(),
    validateAvatar()
  ].every((isValid) => isValid)
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
      orgName: form.value.orgName,
      email: form.value.email || null,
      contactPersonName: form.value.contactPersonName,
      orgLicenseNumber: form.value.orgLicenseNumber,
      orgBio: form.value.orgBio || null,
      orgBankAccount: form.value.orgBankAccount || null
    }
    const orgData = await userApi.updateOrganization(payload)
    userStore.setUserData(orgData)
    setFlashError('资料保存成功', 3000, 'success')
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
  errorMessageType.value = type
  if (errorTimeout) clearTimeout(errorTimeout)
  errorTimeout = setTimeout(() => {
    errorMessage.value = ''
    errorMessageType.value = 'error'
  }, duration)
}

// 加载已有数据
onMounted(async () => {
  try {
    const orgData = await userApi.getUserInfo(userStore.userId)
    form.value.orgName = orgData.orgName || ''
    form.value.phoneNumber = orgData.phoneNumber || ''
    form.value.avatar = orgData.avatar || ''
    form.value.email = orgData.email || ''
    form.value.status = orgData.status || 'ACTIVE'
    form.value.contactPersonName = orgData.contactPersonName || ''
    form.value.orgLicenseNumber = orgData.orgLicenseNumber || ''
    form.value.orgBio = orgData.orgBio || ''
    form.value.orgBankAccount = orgData.orgBankAccount || ''
    form.value.certification_status = orgData.certificationStatus || 'PENDING'
    form.value.certification_notes = orgData.certificationNotes || ''
    form.value.donationHistory = orgData.donationHistory ? JSON.parse(orgData.donationHistory) : []
    form.value.assistanceHistory = orgData.assistanceHistory ? JSON.parse(orgData.assistanceHistory) : []
  } catch (error) {
    console.error('加载组织资料失败:', error)
    errorMessage.value = '加载组织资料失败，请稍后重试'
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
