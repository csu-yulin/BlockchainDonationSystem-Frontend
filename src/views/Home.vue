<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <!-- 英雄区 -->
    <section class="relative h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <!-- 渐变色占位 -->
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(project, index) in projects"
            :key="index"
            :ref="(el) => (projectCardRefs[index] = el)"
            class="card bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div class="relative w-full h-56 bg-gray-200">
              <img
                :alt="project.title"
                :src="project.image"
                class="w-full h-56 object-cover"
              />
            </div>
            <div class="p-6">
              <h3 class="text-2xl font-semibold text-gray-900">
                {{ project.title }}
              </h3>
              <p class="mt-3 text-gray-600">
                {{ project.description }}
              </p>
              <button
                class="mt-5 px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
              >
                支持项目
              </button>
            </div>
          </div>
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

gsap.registerPlugin(ScrollTrigger)

// 滚动视差
const {y: scrollOffset} = useScroll(window)

// 控制英雄区背景图加载状态
const isHeroImageLoaded = ref(false)

// 数据统计值
const statsStore = useStatsStore()
const donationCount = ref(statsStore.donationCount)
const projectCount = ref(statsStore.projectCount)
const userCount = ref(statsStore.userCount)

// 绑定元素
const donationCountEl = ref(null)
const projectCountEl = ref(null)
const userCountEl = ref(null)
const projectCardRefs = ref([])
const projectSection = ref(null)

// 项目列表
const projects = ref([
  {
    title: '教育援助计划',
    description: '为偏远地区儿童提供教育资源。',
    image: new URL('@/assets/images/monstera-8957004_640.jpg', import.meta.url).href,
  },
  {
    title: '医疗救助项目',
    description: '资助贫困家庭的医疗费用。',
    image: new URL('@/assets/images/monstera-8957004_640.jpg', import.meta.url).href,
  },
  {
    title: '环保行动',
    description: '支持可持续发展的环保项目。',
    image: new URL('@/assets/images/monstera-8957004_640.jpg', import.meta.url).href,
  },
])

// 预加载图片
const preloadImages = async () => {
  const imageUrls = [
    new URL('@/assets/images/hero.jpg', import.meta.url).href,
    new URL('@/assets/images/monstera-8957004_640.jpg', import.meta.url).href,
  ]

  const loadImage = (url) =>
    new Promise((resolve) => {
      const img = new Image()
      img.src = url
      img.onload = resolve
      img.onerror = resolve // 即使加载失败也继续
    })

  await Promise.all(imageUrls.map(loadImage))
}

onMounted(async () => {
  // 预加载图片
  await preloadImages()

  // 加载统计数据
  await statsStore.loadStats()

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
})
</script>

<style scoped>
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
</style>
