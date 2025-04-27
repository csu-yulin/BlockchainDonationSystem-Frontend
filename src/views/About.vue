<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <!-- 背景装饰：静态网格线 -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <svg
        class="w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="#3B82F6"
          stroke-width="1"
        >
          <path d="M0,200 H1200" />
          <path d="M0,400 H1200" />
          <path d="M0,600 H1200" />
          <path d="M300,0 V800" />
          <path d="M600,0 V800" />
          <path d="M900,0 V800" />
        </g>
      </svg>
    </div>

    <!-- 简介区 -->
    <section class="py-24 relative z-10">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h1
          class="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-blue-600 mb-6 tracking-tight"
        >
          关于 HopeChain
        </h1>
        <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          HopeChain 是一个基于 FISCO BCOS 和 IPFS 的公益平台，通过区块链和智能合约实现捐款全流程透明可追溯。我们致力于连接爱心人士与公益项目，用技术点亮希望。
        </p>
        <router-link
          class="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
          to="/project-list"
        >
          探索我们的项目
        </router-link>
      </div>
    </section>

    <!-- 技术介绍区 -->
    <section class="py-20 bg-gray-800/50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          核心技术
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            v-for="(tech, index) in technologies"
            :key="tech.title"
            :class="{ 'md:mt-[-20px]': index % 2 === 0, 'md:mt-[20px]': index % 2 === 1 }"
            class="tech-card bg-gray-900 rounded-xl shadow-lg p-6 flex flex-col"
          >
            <h3 class="text-2xl font-semibold text-white mb-4">
              {{ tech.title }}
            </h3>
            <p class="text-gray-300 leading-relaxed mb-4 text-sm md:text-base">
              {{ tech.description }}
            </p>
            <h4 class="text-lg font-medium text-indigo-400 mb-2">
              在 HopeChain 中的应用
            </h4>
            <p class="text-gray-400 mb-4 text-sm md:text-base">
              {{ tech.application }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 行动号召区 -->
    <section class="py-20 bg-gradient-to-r from-indigo-900 to-blue-900 text-center">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          加入透明公益的未来
        </h2>
        <p class="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          探索 HopeChain 的区块链公益项目，或联系我们，一起打造透明可信的公益生态！
        </p>
        <div class="flex justify-center space-x-4">
          <router-link
            class="px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 hover:shadow-xl transition-all duration-300"
            to="/project-list"
          >
            浏览项目
          </router-link>
          <a
            class="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
            href="mailto:csu_yulin@163.com"
          >
            联系我们
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {reactive} from 'vue'

// 技术数据
const technologies = reactive([
  {
    title: '区块链技术',
    description: '区块链通过去中心化的分布式账本确保捐款透明，采用 PBFT 共识机制实现高效交易确认。每个区块记录捐款数据，包含交易哈希和时间戳，通过 SHA-256 加密链接形成不可篡改的链条。HopeChain 利用区块链打造公开可查的捐款记录，增强用户信任。',
    application: 'HopeChain 使用区块链存储每笔捐款的交易详情（如捐款人、金额、项目 ID）。用户可通过 FISCO BCOS 区块链浏览器输入交易哈希查询资金流向，验证是否用于指定公益项目。PBFT 共识支持秒级确认，满足高频小额捐款需求。',
  },
  {
    title: 'FISCO BCOS',
    description: 'FISCO BCOS 是一个高性能企业级区块链平台，支持 TPS 超 10,000，采用 PBFT 和国密算法（如 SM2、SM3）。平台提供全节点、轻节点和预编译合约，优化交易处理效率。HopeChain 基于 FISCO BCOS 部署公益链，运行捐款管理逻辑。',
    application: 'HopeChain 部署 FISCO BCOS 全节点，运行捐款智能合约，平均交易确认时间低于 100ms。预编译合约加速验证，AMOP 协议实现节点间高效通信。项目资料通过 IPFS 存储，CID 记录在链上，确保数据可追溯。',
  },
  {
    title: '智能合约',
    description: '智能合约是区块链上的自动化程序，使用 Solidity 编写，执行预定义规则，公开透明。HopeChain 的智能合约管理捐款分配，自动按比例（90% 项目，10% 运营）分配资金，并通过事件日志记录操作，任何人都可审计。',
    application: 'HopeChain 部署智能合约，定义捐款分配规则，用户捐款触发合约执行，链上记录分配详情。合约支持多签验证（需 2/3 签名确认大额转账），防止资金滥用。Gas 优化降低小额捐款成本，平均每笔交易 Gas 低于 50,000。',
  },
  {
    title: 'IPFS 存储',
    description: 'IPFS（星际文件系统）通过内容寻址（CID，基于 SHA-256 哈希）实现去中心化存储，文件分片存储在全球节点，利用 DHT 快速定位。HopeChain 使用 IPFS 存储项目资料和捐款凭证，确保数据高可用且不可篡改。',
    application: 'HopeChain 将公益项目介绍、图片和捐款凭证上传至 IPFS，生成 CID 存储在 FISCO BCOS 链上。用户通过 CID 访问文件，验证数据完整性。IPFS Pinning 服务（如 Pinata）确保文件长期可用，平均访问延迟低于 500ms。',
  },
])
</script>

<style scoped>
/* 基础样式 */
section {
  font-family: 'Inter', 'Arial', sans-serif;
}

/* 卡片样式 */
.tech-card {
  background: #1a1a1a;
  border-radius: 0.75rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .tech-card {
    margin-bottom: 2rem;
    margin-top: 0 !important; /* 移动端取消高低差 */
  }
}

@media (max-width: 640px) {
  .tech-card {
    margin-bottom: 2.5rem;
  }
}
</style>
