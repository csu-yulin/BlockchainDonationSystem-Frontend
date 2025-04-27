<template>
  <div class="min-h-screen bg-gray-100 text-gray-900 py-12">
    <!-- 页面标题与 IPFS 介绍 -->
    <div class="max-w-6xl mx-auto px-6">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold text-gray-800">
          项目凭证详情
        </h1>
        <router-link
          :to="`/project/${route.params.projectId}`"
          class="text-blue-600 hover:underline flex items-center text-sm"
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M15 19l-7-7 7-7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          返回项目详情
        </router-link>
      </div>

      <!-- IPFS 介绍 -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg mb-12">
        <h2 class="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <svg
            class="w-6 h-6 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 12h14M12 5l7 7-7 7"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
          为什么选择 IPFS？
        </h2>
        <p class="text-gray-600 mb-6 leading-relaxed">
          我们使用 <strong>IPFS（星际文件系统）</strong> 存储项目凭证，确保每一份记录都安全、透明且不可篡改。
          IPFS 的分布式存储让您可以随时验证凭证的真实性，结合区块链技术，打造公开可信的捐款生态。
        </p>
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-6"
          style="transform: translateY(-8px);"
        >
          <div class="flex items-center">
            <svg
              class="w-8 h-8 text-blue-500 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              style="vertical-align: middle; transform: translateY(-20px);"
              viewBox="0 0 24 24"
            >
              <path
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <div class="w-full">
              <h3 class="text-lg font-medium text-gray-800">
                去中心化
              </h3>
              <p class="text-gray-500 text-sm">
                凭证文件存储在全球分布式网络中，无单点故障，数据永不丢失。
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <svg
              class="w-8 h-8 text-blue-500 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              style="vertical-align: middle; transform: translateY(-20px);"
              viewBox="0 0 24 24"
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
            <div class="w-full">
              <h3 class="text-lg font-medium text-gray-800">
                透明性
              </h3>
              <p class="text-gray-500 text-sm">
                任何人都可以通过 IPFS 哈希访问凭证文件，公开验证资金流向。
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <svg
              class="w-8 h-8 text-blue-500 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              style="vertical-align: middle; transform: translateY(-20px);"
              viewBox="0 0 24 24"
            >
              <path
                d="M6 3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <div class="w-full">
              <h3 class="text-lg font-medium text-gray-800">
                不可篡改
              </h3>
              <p class="text-gray-500 text-sm">
                每个文件生成唯一哈希，任何修改都会改变哈希，确保数据完整性。
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 凭证列表 -->
      <div
        v-if="loading"
        class="space-y-6"
      >
        <div
          v-for="i in 3"
          :key="i"
          class="p-6 bg-white rounded-2xl shadow-md animate-pulse"
        >
          <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
          <div class="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div
        v-else-if="pagedVouchers.length"
        class="space-y-6"
      >
        <div
          v-for="voucher in pagedVouchers"
          :key="voucher.voucherId"
          class="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p class="text-gray-500 text-sm font-medium">
                凭证 ID
              </p>
              <p class="text-base text-gray-800">
                {{ voucher.voucherId }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 text-sm font-medium">
                公益组织
              </p>
              <p class="text-base text-gray-800">
                {{ projectName }}
              </p>
            </div>
            <div>
              <p class="text-gray-500 text-sm font-medium">
                上传时间
              </p>
              <p class="text-base text-gray-800">
                {{ formatDate(voucher.timestamp) }}
              </p>
            </div>
            <div class="md:col-span-3">
              <p class="text-gray-500 text-sm font-medium">
                IPFS 哈希
              </p>
              <div class="flex items-center mt-1">
                <code class="text-sm font-mono text-blue-600 truncate flex-1">{{ voucher.ipfsHash }}</code>
                <button
                  aria-label="复制 IPFS 哈希"
                  class="ml-2 text-gray-500 hover:text-blue-600 transition-colors"
                  @click="copyToClipboard(voucher.ipfsHash)"
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
            <div class="md:col-span-3">
              <p class="text-gray-500 text-sm font-medium">
                交易哈希
              </p>
              <div class="flex items-center mt-1">
                <code class="text-sm font-mono text-blue-600 truncate flex-1">{{ voucher.transactionHash }}</code>
                <button
                  aria-label="复制交易哈希"
                  class="ml-2 text-gray-500 hover:text-blue-600 transition-colors"
                  @click="copyToClipboard(voucher.transactionHash)"
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
            <div class="md:col-span-3">
              <p class="text-gray-500 text-sm font-medium">
                凭证文件
              </p>
              <div class="flex items-center mt-1 space-x-4">
                <a
                  :href="voucher.fileUrl"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  target="_blank"
                >
                  查看凭证文件
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
                </a>
                <a
                  :href="voucher.fileUrl.replace('https://ipfs.io', 'http://118.145.177.151:8080')"
                  class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
                  target="_blank"
                >
                  备用链接
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
                </a>
              </div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <div class="flex justify-center mt-8">
          <button
            :disabled="currentPage === 1"
            class="px-4 py-2 mx-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            @click="currentPage--"
          >
            上一页
          </button>
          <span class="px-4 py-2 text-gray-700">{{ currentPage }} / {{ totalPages }}</span>
          <button
            :disabled="currentPage === totalPages"
            class="px-4 py-2 mx-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            @click="currentPage++"
          >
            下一页
          </button>
        </div>
      </div>
      <div
        v-else
        class="p-8 bg-white rounded-2xl shadow-md text-center text-gray-600"
      >
        暂无凭证记录
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import voucherApi from '@/api/voucher'
import projectApi from '@/api/project'

const route = useRoute()

const vouchers = ref([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 5 // 每页显示 5 条记录
const projectName = ref('') // 新增变量存储项目名称

const fetchVouchers = async () => {
  loading.value = true
  try {
    const response = await voucherApi.getVouchersByProjectId(route.params.projectId)
    // 按 timestamp 降序排序（最新凭证在最前）
    vouchers.value = response
      ? response.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      : []
  } catch (error) {
    console.error('获取凭证列表失败:', error)
    vouchers.value = []
  } finally {
    loading.value = false
  }
}

// 新增方法获取项目详情
const fetchProjectDetail = async () => {
  try {
    const response = await projectApi.getProjectDetail(route.params.projectId)
    projectName.value = response.projectName || '未设置名称'
  } catch (error) {
    console.error('获取项目详情失败:', error)
    projectName.value = '获取失败'
  }
}

const totalPages = computed(() => Math.ceil(vouchers.value.length / pageSize))
const pagedVouchers = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return vouchers.value.slice(start, start + pageSize)
})

const formatDate = (date) => {
  if (!date) return '未设置'
  return new Date(date).toLocaleDateString('zh-CN', {year: 'numeric', month: '2-digit', day: '2-digit'})
}

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制到剪贴板！')
  })
}

onMounted(() => {
  fetchVouchers()
  fetchProjectDetail()
})
</script>

<style scoped>
/* 优化样式 */
.min-h-screen {
  background: linear-gradient(to bottom, #f3f4f6, #e5e7eb);
}

.rounded-2xl {
  border-radius: 1rem;
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.hover\:shadow-xl:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.transition-shadow {
  transition: box-shadow 0.3s ease;
}

.transition-colors {
  transition: color 0.2s ease;
}
</style>
