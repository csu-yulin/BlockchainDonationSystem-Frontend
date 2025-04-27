<template>
  <footer
    ref="footerEl"
    class="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 overflow-hidden"
  >
    <!-- 背景装饰：微妙的区块链网络线条 -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <svg
        class="w-full h-full"
        viewBox="0 0 1000 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g
          fill="none"
          stroke="#3B82F6"
          stroke-width="1"
        >
          <path d="M0,100 H1000" />
          <path d="M0,200 H1000" />
          <path d="M0,300 H1000" />
          <path d="M200,0 V400" />
          <path d="M400,0 V400" />
          <path d="M600,0 V400" />
          <path d="M800,0 V400" />
        </g>
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
      <!-- 平台简介 -->
      <div class="md:col-span-2">
        <h3
          class="text-3xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
        >
          HopeChain
        </h3>
        <p class="text-gray-300 leading-relaxed max-w-md">
          HopeChain 基于 FISCO BCOS 和 IPFS 打造透明公益平台，连接全球捐助者与公益项目，用区块链技术点亮每一份希望。
        </p>
        <div class="mt-6 flex space-x-4">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :aria-label="social.name"
            :href="social.href"
            class="social-icon text-gray-400 hover:text-white hover:bg-blue-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110"
          >
            <component
              :is="social.icon"
              class="w-6 h-6"
            />
          </a>
        </div>
      </div>

      <!-- 快速链接 -->
      <div>
        <h4 class="text-xl font-semibold mb-4 text-white">
          快速链接
        </h4>
        <ul class="space-y-3">
          <li
            v-for="link in quickLinks"
            :key="link.name"
          >
            <router-link
              :to="link.to"
              class="text-gray-400 hover:text-blue-400 transition duration-300 relative group"
            >
              {{ link.name }}
              <span
                class="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"
              />
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 联系信息 -->
      <div>
        <h4 class="text-xl font-semibold mb-4 text-white">
          联系我们
        </h4>
        <ul class="space-y-3 text-gray-300">
          <li class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 8l9-6 9 6v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <span>中国湖南省长沙市岳麓区</span>
          </li>
          <li class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 8l9-6 9 6v12a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <a
              class="hover:text-blue-400 transition duration-300"
              href="mailto:csu_yulin@163.com"
            >csu_yulin@163.com</a>
          </li>
          <li class="flex items-center space-x-2">
            <svg
              class="w-5 h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
            <span>+86 15696389220</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- 底部版权 -->
    <div class="mt-12 text-center text-gray-400 text-sm border-t border-gray-700 pt-6">
      <p>© 2025 HopeChain. All rights reserved.</p>
      <p class="mt-2">
        Built with <span class="text-red-400">♥</span> by CSU Yulin
      </p>
    </div>
  </footer>
</template>

<script setup>
import {h, onMounted, ref} from 'vue'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

// 动态导入 SVG 图标（示例使用 vue3-sfc-loader 或类似方式）
const TwitterIcon = {
  render: () =>
    h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
      }),
    ]),
}

const GitHubIcon = {
  render: () =>
    h('svg', {
      class: 'w-6 h-6',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24',
    }, [
      h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'stroke-width': '2',
        d: 'M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.153-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.577.688.479C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z',
      }),
    ]),
}

gsap.registerPlugin(ScrollTrigger)

const footerEl = ref(null)

// 社交媒体链接
const socialLinks = [
  {
    name: 'Twitter',
    href: 'https://www.bilibili.com/video/BV1uW4y1C7Z3/?spm_id_from=333.337.search-card.all.click&vd_source=f10b27b2eed78f213e42f0fc4ceeb9f3',
    icon: TwitterIcon
  },
  {name: 'GitHub', href: 'https://github.com/csu-yulin', icon: GitHubIcon},
]

// 快速链接
const quickLinks = [
  {name: '首页', to: '/'},
  {name: '项目列表', to: '/project-list'},
  {name: '关于我们', to: '/about'},
  {name: '登录', to: '/login'},
]

onMounted(() => {
  // 整体进入动画
  gsap.from(footerEl.value, {
    opacity: 0,
    y: 50,
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: footerEl.value,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  })

  // 逐列淡入动画
  gsap.from(footerEl.value.children[0].children, {
    opacity: 0,
    y: 30,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: footerEl.value,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  })
})
</script>

<style scoped>
/* 页脚基础样式 */
footer {
  position: relative;
  font-family: 'Inter', 'Arial', sans-serif;
}

/* 社交图标悬浮效果 */
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
}

/* 响应式调整 */
@media (max-width: 768px) {
  footer .grid {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-icon {
    padding: 1.5rem;
  }

  footer .max-w-md {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
