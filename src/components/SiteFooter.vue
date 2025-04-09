<template>
  <footer
    ref="footerEl"
    class="bg-gray-900 text-white py-16"
  >
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
      <!-- 平台简介 -->
      <div>
        <h3
          :style="{ fontFamily: 'SF Pro Display, sans-serif' }"
          class="text-2xl font-bold mb-4"
        >
          HopeChain
        </h3>
        <p class="text-gray-400">
          HopeChain 是一个基于区块链的公益平台，致力于通过透明化技术连接捐助者和公益项目，点亮世界的每一份希望。
        </p>
      </div>

      <!-- 快速链接 -->
      <div>
        <h4
          :style="{ fontFamily: 'SF Pro Display, sans-serif' }"
          class="text-lg font-semibold mb-4"
        >
          快速链接
        </h4>
        <ul class="space-y-2">
          <li>
            <router-link
              class="text-gray-400 hover:text-white transition duration-300"
              to="/"
            >
              首页
            </router-link>
          </li>
          <li>
            <router-link
              class="text-gray-400 hover:text-white transition duration-300"
              to="/project-list"
            >
              项目列表
            </router-link>
          </li>
          <li>
            <a
              class="text-gray-400 hover:text-white transition duration-300"
              href="#"
            >关于我们</a>
          </li>
          <li>
            <router-link
              class="text-gray-400 hover:text-white transition duration-300"
              to="/login"
            >
              登录
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 联系信息 -->
      <div>
        <h4
          :style="{ fontFamily: 'SF Pro Display, sans-serif' }"
          class="text-lg font-semibold mb-4"
        >
          联系我们
        </h4>
        <p class="text-gray-400">
          邮箱: csu_yulin@163.com
        </p>
        <p class="text-gray-400">
          电话: +86 123-456-7890
        </p>
        <p class="text-gray-400">
          地址: 中国湖南省长沙市岳麓区
        </p>
        <div class="mt-4 flex space-x-4">
          <a
            class="text-gray-400 hover:text-white transition duration-300"
            href="#"
          >Twitter</a>
          <a
            class="text-gray-400 hover:text-white transition duration-300"
            href="https://github.com/csu-yulin"
          >GitHub</a>
        </div>
      </div>
    </div>
    <div class="mt-12 text-center text-gray-500 text-sm">
      &copy; 2025 HopeChain. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {gsap} from 'gsap'
import {ScrollTrigger} from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const footerEl = ref(null)

onMounted(() => {
  gsap.from(footerEl.value, {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: footerEl.value,
      start: 'top 90%',
    },
  })
})
</script>
