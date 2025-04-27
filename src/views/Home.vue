<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <!-- 英雄区 -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div
          v-if="!isHeroImageLoaded"
          class="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800"
        />
        <img
          :style="{ transform: `translateY(${scrollOffset * 0.3}px)` }"
          alt="Hero Background"
          class="w-full h-full object-cover opacity-70 transition-transform duration-1000"
          src="@/assets/images/hero.jpg"
          @load="isHeroImageLoaded = true"
        />
      </div>
      <div
        :style="{ transform: `translateY(${scrollOffset * -0.1}px)` }"
        class="relative z-10 text-center transform transition-transform duration-1000"
      >
        <h1 class="text-6xl md:text-8xl font-bold tracking-tight animate-hero-title">
          HopeChain
        </h1>
        <p class="mt-4 text-xl md:text-2xl opacity-90 animate-hero-subtitle">
          用区块链点亮公益的透明未来
        </p>
        <router-link
          class="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full font-semibold hover:scale-110 hover:shadow-xl transition-all duration-300 animate-hero-button"
          to="/project-list"
        >
          探索项目
        </router-link>
      </div>
    </section>

    <!-- 区块链网络展示区 -->
    <section class="py-24 bg-gray-900">
      <div class="max-w-7xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-8">
          区块链驱动的透明公益
        </h2>
        <p class="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
          基于 FISCO BCOS 和 IPFS 的去中心化技术，确保每一笔捐款安全、透明、不可篡改。
        </p>
        <div
          ref="blockchainSvgContainer"
          class="flex justify-center"
        >
          <svg
            class="w-full h-auto blockchain-svg"
            viewBox="0 0 800 400"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <!-- 渐变定义，柔和蓝色调 -->
              <linearGradient
                id="bgGradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stop-color="#FFFFFF"
                />
                <stop
                  offset="100%"
                  stop-color="#F3F4F6"
                />
              </linearGradient>
              <linearGradient
                id="blueGradient"
                x1="0%"
                x2="100%"
                y1="0%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stop-color="#3B82F6"
                />
                <stop
                  offset="100%"
                  stop-color="#93C5FD"
                />
              </linearGradient>
              <!-- 柔和发光滤镜 -->
              <filter
                id="glow"
                height="140%"
                width="140%"
                x="-20%"
                y="-20%"
              >
                <feGaussianBlur
                  result="blur"
                  stdDeviation="3"
                />
                <feComposite
                  in="SourceGraphic"
                  in2="blur"
                  operator="over"
                />
              </filter>
            </defs>
            <!-- 背景 -->
            <rect
              fill="url(#bgGradient)"
              height="100%"
              width="100%"
            />
            <!-- 网格背景，极浅灰色 -->
            <g opacity="0.08">
              <path
                d="M0,100 L800,100"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M0,200 L800,200"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M0,300 L800,300"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M100,0 L100,400"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M200,0 L200,400"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M300,0 L300,400"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M400,0 L400,400"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M500,0 L500,400"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M600,0 L600,400"
                stroke="#E5E7EB"
                stroke-width="1"
              />
              <path
                d="M700,0 L700,400"
                stroke="#E5E7EB"
                stroke-width="1"
              />
            </g>
            <!-- 旋转六边形，象征 FISCO BCOS 区块链网络 -->
            <g
              class="rotate"
              filter="url(#glow)"
              opacity="0.4"
            >
              <polygon
                fill="none"
                points="400,100 450,150 450,250 400,300 350,250 350,150"
                stroke="url(#blueGradient)"
                stroke-width="1.5"
              />
              <polygon
                fill="none"
                points="400,80 470,130 470,270 400,320 330,270 330,130"
                stroke="url(#blueGradient)"
                stroke-width="1"
              />
            </g>
            <!-- 区块链节点，象征捐款节点 -->
            <g class="float">
              <!-- 中心节点（FISCO BCOS 核心） -->
              <g class="node-group">
                <circle
                  class="node"
                  cx="400"
                  cy="200"
                  fill="#3B82F6"
                  filter="url(#glow)"
                  r="12"
                />
              </g>
              <!-- 周围节点（IPFS 存储/捐款者） -->
              <g class="node-group">
                <circle
                  class="node delay-1"
                  cx="300"
                  cy="150"
                  fill="#93C5FD"
                  r="8"
                />
              </g>
              <g class="node-group">
                <circle
                  class="node delay-2"
                  cx="500"
                  cy="150"
                  fill="#93C5FD"
                  r="8"
                />
              </g>
              <g class="node-group">
                <circle
                  class="node delay-3"
                  cx="300"
                  cy="250"
                  fill="#93C5FD"
                  r="8"
                />
              </g>
              <g class="node-group">
                <circle
                  class="node delay-1"
                  cx="500"
                  cy="250"
                  fill="#93C5FD"
                  r="8"
                />
              </g>
              <!-- 连接线，象征数据流 -->
              <line
                class="connection"
                opacity="0.5"
                stroke="url(#blueGradient)"
                stroke-width="1.5"
                x1="400"
                x2="300"
                y1="200"
                y2="150"
              />
              <line
                class="connection"
                opacity="0.5"
                stroke="url(#blueGradient)"
                stroke-width="1.5"
                x1="400"
                x2="500"
                y1="200"
                y2="150"
              />
              <line
                class="connection"
                opacity="0.5"
                stroke="url(#blueGradient)"
                stroke-width="1.5"
                x1="400"
                x2="300"
                y1="200"
                y2="250"
              />
              <line
                class="connection"
                opacity="0.5"
                stroke="url(#blueGradient)"
                stroke-width="1.5"
                x1="400"
                x2="500"
                y1="200"
                y2="250"
              />
              <!-- 节点间连接，象征信任网络 -->
              <path
                class="connection"
                d="M300,150 C320,120 380,120 400,120"
                opacity="0.3"
                stroke="#93C5FD"
                stroke-width="1"
              />
              <path
                class="connection"
                d="M400,120 C420,120 480,120 500,150"
                opacity="0.3"
                stroke="#93C5FD"
                stroke-width="1"
              />
              <path
                class="connection"
                d="M300,250 C320,280 380,280 400,280"
                opacity="0.3"
                stroke="#93C5FD"
                stroke-width="1"
              />
              <path
                class="connection"
                d="M400,280 C420,280 480,280 500,250"
                opacity="0.3"
                stroke="#93C5FD"
                stroke-width="1"
              />
            </g>
            <!-- 飞行粒子效果，象征数据流动 -->
            <g class="float delay-2">
              <circle
                cx="250"
                cy="100"
                fill="#93C5FD"
                opacity="0.6"
                r="1.5"
              />
              <circle
                cx="300"
                cy="80"
                fill="#93C5FD"
                opacity="0.4"
                r="1"
              />
              <circle
                cx="350"
                cy="50"
                fill="#93C5FD"
                opacity="0.4"
                r="1"
              />
              <circle
                cx="450"
                cy="50"
                fill="#93C5FD"
                opacity="0.4"
                r="1"
              />
              <circle
                cx="500"
                cy="80"
                fill="#93C5FD"
                opacity="0.4"
                r="1"
              />
              <circle
                cx="550"
                cy="100"
                fill="#93C5FD"
                opacity="0.6"
                r="1.5"
              />
            </g>
            <!-- 小标签，突出安全特性 -->
            <g class="fade-in delay-3">
              <g class="label-group">
                <rect
                  fill="rgba(59, 130, 246, 0.1)"
                  height="24"
                  rx="12"
                  stroke="#3B82F6"
                  stroke-width="1"
                  width="110"
                  x="135"
                  y="175"
                />
                <text
                  class="label"
                  fill="#1F2937"
                  font-family="Inter, Arial, sans-serif"
                  font-size="12"
                  text-anchor="middle"
                  x="190"
                  y="192"
                >
                  安全捐款
                </text>
              </g>
              <g class="label-group">
                <rect
                  fill="rgba(59, 130, 246, 0.1)"
                  height="24"
                  rx="12"
                  stroke="#3B82F6"
                  stroke-width="1"
                  width="110"
                  x="555"
                  y="175"
                />
                <text
                  class="label"
                  fill="#1F2937"
                  font-family="Inter, Arial, sans-serif"
                  font-size="12"
                  text-anchor="middle"
                  x="610"
                  y="192"
                >
                  IPFS 存储
                </text>
              </g>
              <g class="label-group">
                <rect
                  fill="rgba(59, 130, 246, 0.1)"
                  height="24"
                  rx="12"
                  stroke="#3B82F6"
                  stroke-width="1"
                  width="170"
                  x="315"
                  y="45"
                />
                <text
                  class="label"
                  fill="#1F2937"
                  font-family="Inter, Arial, sans-serif"
                  font-size="12"
                  text-anchor="middle"
                  x="400"
                  y="62"
                >
                  FISCO BCOS 保障
                </text>
              </g>
              <g class="label-group">
                <rect
                  fill="rgba(59, 130, 246, 0.1)"
                  height="24"
                  rx="12"
                  stroke="#3B82F6"
                  stroke-width="1"
                  width="170"
                  x="315"
                  y="325"
                />
                <text
                  class="label"
                  fill="#1F2937"
                  font-family="Inter, Arial, sans-serif"
                  font-size="12"
                  text-anchor="middle"
                  x="400"
                  y="342"
                >
                  数据不可篡改
                </text>
              </g>
            </g>
            <!-- 可访问性 -->
            <title>HopeChain Donation Safety Animation</title>
            <desc>A static SVG showcasing the secure donation process powered by FISCO BCOS and IPFS.</desc>
          </svg>
        </div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="py-20 bg-white text-gray-900">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        <div ref="donationCountEl">
          <h3 class="text-5xl md:text-6xl font-bold animate-stat">
            {{ donationCount.toLocaleString() }}
          </h3>
          <p class="mt-4 text-lg text-gray-600">
            累计捐款 (元)
          </p>
        </div>
        <div ref="projectCountEl">
          <h3 class="text-5xl md:text-6xl font-bold animate-stat">
            {{ projectCount }}
          </h3>
          <p class="mt-4 text-lg text-gray-600">
            公益项目
          </p>
        </div>
        <div ref="userCountEl">
          <h3 class="text-5xl md:text-6xl font-bold animate-stat">
            {{ userCount.toLocaleString() }}
          </h3>
          <p class="mt-4 text-lg text-gray-600">
            参与用户
          </p>
        </div>
      </div>
    </section>

    <!-- 推荐项目 -->
    <section
      ref="projectSection"
      class="py-20 bg-gray-50"
    >
      <div class="max-w-6xl mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          推荐公益项目
        </h2>
        <div
          v-if="projects.length > 0"
          class="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            v-for="(project, index) in projects"
            :key="project.projectId"
            :ref="(el) => (projectCardRefs[index] = el)"
            class="card bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div class="relative w-full h-56 bg-gray-200">
              <img
                :alt="project.projectName"
                :src="project.coverImage || defaultImage"
                class="w-full h-56 object-cover"
                @error="project.coverImage = defaultImage"
              />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-semibold text-gray-900">
                {{ project.projectName }}
              </h3>
              <p class="mt-3 text-gray-600 line-clamp-3">
                {{ project.description }}
              </p>
              <router-link
                :to="`/project/${project.projectId}`"
                class="mt-5 inline-block px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
              >
                支持项目
              </router-link>
            </div>
          </div>
        </div>
        <div
          v-else
          class="text-center text-gray-600"
        >
          <p>暂无推荐项目</p>
        </div>
      </div>
    </section>

    <!-- 底部信息 -->
    <SiteFooter />
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {useScroll} from '@vueuse/core'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'
import SiteFooter from '@/components/SiteFooter.vue'
import {useStatsStore} from '@/stores/stats.js'
import {useProjectStore} from '@/stores/project.js'

gsap.registerPlugin(ScrollTrigger)

// 滚动视差
const {y: scrollOffset} = useScroll(window)

// 控制英雄区背景图加载状态
const isHeroImageLoaded = ref(false)

// 默认图片
const defaultImage = new URL('@/assets/images/monstera-8957004_640.jpg', import.meta.url).href

// 数据统计值
const statsStore = useStatsStore()
const donationCount = ref(statsStore.donationCount)
const projectCount = ref(statsStore.projectCount)
const userCount = ref(statsStore.userCount)

// 项目数据
const projectStore = useProjectStore()
const projects = ref(projectStore.getRandomProjects)

// 绑定元素
const donationCountEl = ref(null)
const projectCountEl = ref(null)
const userCountEl = ref(null)
const projectCardRefs = ref([])
const projectSection = ref(null)
const blockchainSvgContainer = ref(null)

// 预加载图片
const preloadImages = async () => {
  const imageUrls = [
    new URL('@/assets/images/hero.jpg', import.meta.url).href,
    defaultImage,
  ]

  const loadImage = (url) =>
    new Promise((resolve) => {
      const img = new Image()
      img.src = url
      img.onload = resolve
      img.onerror = resolve
    })

  await Promise.all(imageUrls.map(loadImage))
}

// 加载随机项目
const loadRandomProjects = async () => {
  await projectStore.loadRandomProjects()
  projects.value = projectStore.getRandomProjects
}

onMounted(async () => {
  // 预加载图片
  await preloadImages()

  // 加载统计数据
  await statsStore.loadStats()

  // 加载随机项目
  await loadRandomProjects()

  // 同步 store 数据到本地 ref，并添加动画
  gsap.to(donationCount, {
    value: statsStore.donationCount,
    duration: 2,
    ease: 'power2.out',
    roundProps: 'value',
  })
  gsap.to(projectCount, {
    value: statsStore.projectCount,
    duration: 2,
    ease: 'power2.out',
    roundProps: 'value',
  })
  gsap.to(userCount, {
    value: statsStore.userCount,
    duration: 2,
    ease: 'power2.out',
    roundProps: 'value',
  })

  // 数据统计动画
  gsap.from([donationCountEl.value, projectCountEl.value, userCountEl.value], {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: donationCountEl.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })

  // 区块链 SVG 进入动画
  gsap.from(blockchainSvgContainer.value, {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: blockchainSvgContainer.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  })
})
</script>

<style scoped>
/* 原有样式 */
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
    opacity: 0.9;
    transform: translateY(0);
  }
}

.animate-hero-button {
  animation: heroButton 2s ease-out;
}

@keyframes heroButton {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
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

.card img {
  transition: transform 0.3s ease;
}

.card:hover img {
  transform: scale(1.05);
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* SVG 样式 */
.blockchain-svg {
  width: 100%;
  height: auto;
  max-height: 600px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  background: rgba(255, 255, 255, 0.05);
}

/* SVG 动画样式 */
.blockchain-svg .node {
  animation: pulse 2s infinite ease-in-out;
}

.blockchain-svg .connection {
  stroke-dasharray: 8;
  animation: dash 10s linear infinite;
}

.blockchain-svg .rotate {
  transform-origin: center;
  animation: rotate 25s linear infinite;
}

.blockchain-svg .float {
  animation: float 3.5s ease-in-out infinite;
}

.blockchain-svg .fade-in {
  animation: fadeIn 1.5s ease-in-out forwards;
}

.blockchain-svg .delay-1 {
  animation-delay: 0.3s;
}

.blockchain-svg .delay-2 {
  animation-delay: 0.5s;
}

.blockchain-svg .delay-3 {
  animation-delay: 0.7s;
}

/* SVG 动画关键帧 */
@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: 800;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

/* 响应式样式 */
@media (max-width: 1024px) {
  .blockchain-svg {
    max-height: 500px;
  }
}

@media (max-width: 768px) {
  .blockchain-svg {
    max-height: 400px;
  }
}

@media (max-width: 640px) {
  .blockchain-svg {
    max-height: 300px;
  }
}
</style>
