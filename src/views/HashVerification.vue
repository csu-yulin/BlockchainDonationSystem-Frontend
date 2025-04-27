<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <div class="max-w-6xl mx-auto p-4 sm:p-8">
      <!-- 输入框和校验按钮 -->
      <div class="mb-10 flex flex-col sm:flex-row items-center gap-4">
        <input
          v-model="transactionHashInput"
          class="w-full px-4 py-3.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-sm placeholder-gray-400"
          placeholder="请输入交易哈希"
          type="text"
        />
        <button
          class="w-full sm:w-auto px-6 h-[48px] bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md font-medium text-sm whitespace-nowrap"
          @click="verifyHash"
        >
          校验
        </button>
      </div>

      <!-- 骨架屏 -->
      <div
        v-if="loading"
        class="animate-pulse space-y-6"
      >
        <div class="h-8 bg-gray-200 rounded-xl w-1/3" />
        <div class="space-y-6">
          <div class="h-16 bg-gray-200 rounded-xl" />
          <div class="h-24 bg-gray-200 rounded-xl" />
          <div class="h-20 bg-gray-200 rounded-xl" />
          <div class="h-32 bg-gray-200 rounded-xl" />
        </div>
      </div>

      <!-- 错误状态 -->
      <div
        v-else-if="error"
        class="text-center py-12"
      >
        <p class="text-red-600 text-lg font-semibold">
          {{ error }}
        </p>
        <button
          class="mt-4 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-md"
          @click="verifyHash"
        >
          重试
        </button>
      </div>

      <!-- 校验结果 -->
      <div
        v-else-if="verificationData"
        class="space-y-8"
      >
        <!-- 标题 -->
        <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          交易校验结果
          <svg
            class="w-6 h-6 ml-2 text-blue-500"
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
        </h1>

        <!-- 验证状态 -->
        <div class="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg flex items-center">
          <svg
            v-if="verificationData.status === '0x0'"
            class="w-8 h-8 text-green-500 mr-4"
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
            class="w-8 h-8 text-red-500 mr-4"
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
          <div>
            <p class="text-xl font-semibold text-gray-800">
              {{ verificationData.status === '0x0' ? '交易验证成功' : '交易验证失败' }}
            </p>
            <p class="text-gray-500 text-sm">
              {{
                verificationData.status === '0x0'
                  ? '此交易已通过FISCO BCOS区块链验证，数据不可篡改'
                  : '验证失败，请检查交易哈希'
              }}
            </p>
          </div>
        </div>

        <!-- 核心信息分组 -->
        <div class="bg-white rounded-xl shadow-lg p-5 sm:p-6 space-y-6">
          <!-- 交易哈希（占一行） -->
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              交易哈希
            </h2>
            <div class="flex items-center mt-3">
              <code class="text-sm font-mono text-blue-600 truncate flex-1">{{
                verificationData.transactionHash
              }}</code>
              <button
                aria-label="复制交易哈希"
                class="ml-2 text-gray-500 hover:text-gray-700"
                @click="copyToClipboard(verificationData.transactionHash)"
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

          <!-- 区块信息（两列并列） -->
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              区块信息
            </h2>
            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-500 text-sm">
                  区块号
                </p>
                <p class="text-base font-medium text-gray-700">
                  {{ verificationData.blockNumber }}
                </p>
              </div>
              <div>
                <p class="text-gray-500 text-sm">
                  区块哈希
                </p>
                <div class="flex items-center">
                  <code class="text-sm font-mono text-blue-600 truncate flex-1">{{ verificationData.blockHash }}</code>
                  <button
                    aria-label="复制区块哈希"
                    class="ml-2 text-gray-500 hover:text-gray-700"
                    @click="copyToClipboard(verificationData.blockHash)"
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
            </div>
          </div>

          <!-- 交易参与方（两列并列） -->
          <div>
            <h2 class="text-lg font-semibold text-gray-800">
              交易参与方
            </h2>
            <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p class="text-gray-500 text-sm">
                  发送方
                </p>
                <div class="flex items-center">
                  <code class="text-sm font-mono text-blue-600 truncate flex-1">{{ verificationData.from }}</code>
                  <button
                    aria-label="复制发送方地址"
                    class="ml-2 text-gray-500 hover:text-gray-700"
                    @click="copyToClipboard(verificationData.from)"
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
              <div>
                <p class="text-gray-500 text-sm">
                  接收方
                </p>
                <div class="flex items-center">
                  <code class="text-sm font-mono text-blue-600 truncate flex-1">{{ verificationData.to }}</code>
                  <button
                    aria-label="复制接收方地址"
                    class="ml-2 text-gray-500 hover:text-gray-700"
                    @click="copyToClipboard(verificationData.to)"
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
            </div>
          </div>
        </div>

        <!-- 事件详情（占一行） -->
        <div class="p-5 sm:p-6 bg-blue-50 rounded-xl shadow-lg">
          <h2 class="text-lg font-semibold text-blue-700">
            事件详情
          </h2>
          <div
            v-if="verificationData.events?.length"
            class="mt-4 space-y-3"
          >
            <div
              v-for="(event, index) in verificationData.events"
              :key="index"
              class="p-4 bg-white rounded-lg shadow-sm slide-enter"
            >
              <p class="text-lg font-medium text-blue-600">
                {{ event.eventName }}
              </p>
              <div class="mt-2 space-y-2 text-sm">
                <p
                  v-for="(value, key) in event.parameters"
                  :key="key"
                >
                  <strong>{{ formatParameterKey(key) }}:</strong> {{ formatParameterValue(key, value) }}
                </p>
              </div>
            </div>
          </div>
          <p
            v-else
            class="mt-4 text-gray-500 text-sm"
          >
            无事件信息
          </p>
        </div>

        <!-- Gas 使用情况（占一行） -->
        <div class="p-5 sm:p-6 bg-white rounded-xl shadow-lg">
          <h2 class="text-lg font-semibold text-gray-800">
            Gas 使用情况
          </h2>
          <div class="mt-3">
            <p class="text-gray-500 text-sm">
              已使用 Gas
            </p>
            <p class="text-base font-medium text-gray-700">
              {{ verificationData.gasUsed }}
            </p>
          </div>
        </div>

        <!-- 字段解释（占一行） -->
        <div class="p-5 sm:p-6 bg-white rounded-xl shadow-lg">
          <h2 class="text-lg font-semibold text-gray-800">
            字段说明
          </h2>
          <div class="mt-3 space-y-2 text-sm text-gray-600">
            <p><strong>交易哈希</strong>：区块链上每笔交易的唯一标识符。</p>
            <p><strong>区块号</strong>：记录此交易的区块编号。</p>
            <p><strong>区块哈希</strong>：区块的唯一标识，确保数据不可篡改。</p>
            <p><strong>发送方/接收方</strong>：交易的发起和接收地址，可能为用户或合约。</p>
            <p><strong>Gas 使用</strong>：执行交易消耗的计算资源量。</p>
            <p><strong>事件详情</strong>：记录交易触发的关键操作，如创建项目或捐款。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import blockchainApi from '@/api/blockchain'

const route = useRoute()
const verificationData = ref(null)
const loading = ref(false)
const error = ref('')
const transactionHashInput = ref('')

// 校验交易哈希
const verifyHash = async () => {
  const transactionHash = transactionHashInput.value.trim() || route.params.transactionHash
  if (!transactionHash) {
    error.value = '未提供交易哈希'
    return
  }

  loading.value = true
  error.value = ''
  try {
    const response = await blockchainApi.verifyTransaction({transactionHash})
    if (response) {
      verificationData.value = response
    } else {
      error.value = response || '交易验证失败'
    }
  } catch (err) {
    error.value = err.message || '校验交易失败'
    console.error('校验交易失败:', err)
  } finally {
    loading.value = false
  }
}

// 复制到剪贴板
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制到剪贴板！')
  })
}

// 格式化事件参数键名
const formatParameterKey = (key) => {
  const keyMap = {
    projectId: '项目ID',
    orgId: '组织ID',
    targetAmount: '目标金额',
    donationId: '捐款ID',
    userId: '用户ID',
    amount: '金额',
    timestamp: '时间戳',
    voucherId: '凭证ID',
    ipfsHash: 'IPFS哈希',
    flowId: '流转ID',
    recipientId: '接收者ID',
  }
  return keyMap[key] || key
}

// 格式化事件参数值
const formatParameterValue = (key, value) => {
  if (key === 'timestamp' && value) {
    try {
      const parsedDate = new Date(Date.parse(value))
      if (isNaN(parsedDate.getTime())) {
        console.warn(`Invalid timestamp format: ${value}`)
        return value // 返回原始值
      }
      return parsedDate.toLocaleString()
    } catch (e) {
      console.warn(`Failed to parse timestamp: ${value}, error: ${e.message}`)
      return value // 返回原始值
    }
  }
  if (key === 'ipfsHash') {
    return value.slice(0, 10) + '...' + value.slice(-10)
  }
  if (['targetAmount', 'amount'].includes(key)) {
    return `${value}`
  }
  return value
}

onMounted(() => {
  // 如果路由参数中有 transactionHash，预填充输入框并触发校验
  if (route.params.transactionHash) {
    transactionHashInput.value = route.params.transactionHash
    verifyHash()
  }
})
</script>

<style scoped>
/* 动画 */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* 自定义样式 */
.bg-blue-50 {
  background-color: #eff6ff;
}
</style>
