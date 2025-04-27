<template>
  <nav
    class="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-95 backdrop-blur-lg shadow-lg transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <!-- Logo -->
      <div
        class="text-3xl font-extrabold text-gray-900 tracking-tight hover:text-indigo-600 transition-colors duration-300"
      >
        <router-link to="/">
          HopeChain
        </router-link>
      </div>

      <!-- 桌面导航 -->
      <ul class="hidden md:flex items-center space-x-12">
        <li>
          <router-link
            class="relative text-gray-700 text-lg font-medium hover:text-indigo-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            to="/"
          >
            首页
          </router-link>
        </li>
        <li>
          <router-link
            class="relative text-gray-700 text-lg font-medium hover:text-indigo-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            to="/project-list"
          >
            项目
          </router-link>
        </li>
        <li v-if="userStore.role === 'ORG'">
          <router-link
            class="relative text-gray-700 text-lg font-medium hover:text-indigo-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            to="/org/dashboard"
          >
            项目管理
          </router-link>
        </li>
        <li>
          <router-link
            class="relative text-gray-700 text-lg font-medium hover:text-indigo-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            to="/hash-verification"
          >
            交易校验
          </router-link>
        </li>
        <li>
          <router-link
            class="relative text-gray-700 text-lg font-medium hover:text-indigo-600 transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
            to="/about"
          >
            关于
          </router-link>
        </li>
        <li v-if="!userStore.userId">
          <router-link
            class="relative px-4 py-2 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
            to="/login"
          >
            登录
          </router-link>
        </li>
        <li v-if="userStore.userId">
          <router-link
            :to="userStore.role === 'INDIVIDUAL' ? '/user-center/individual' : '/user-center/org'"
            class="block px-4 py-2 text-white bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
          >
            个人中心
          </router-link>
        </li>
        <li
          v-if="userStore.userId"
          class="ml-auto"
        >
          <button
            class="flex items-center justify-center w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg"
            title="登出"
            @click="handleLogout"
          >
            <img
              alt="登出"
              class="w-6 h-6 text-gray-600"
              src="@/assets/images/kaiguan.svg"
            />
          </button>
        </li>
      </ul>

      <!-- 移动端汉堡菜单按钮 -->
      <button
        class="md:hidden text-gray-700 hover:text-indigo-600 focus:outline-none"
        @click="toggleMenu"
      >
        <svg
          class="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6h16M4 12h16m-7 6h7"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>

    <!-- 移动端菜单 -->
    <transition name="slide">
      <ul
        v-if="isMenuOpen"
        class="md:hidden bg-white shadow-lg px-6 py-4 space-y-4 w-full absolute top-full left-0 z-40"
      >
        <li>
          <router-link
            class="block text-gray-700 hover:text-indigo-600 transition-colors duration-300"
            to="/"
            @click="toggleMenu"
          >
            首页
          </router-link>
        </li>
        <li>
          <router-link
            class="block text-gray-700 hover:text-indigo-600 transition-colors duration-300"
            to="/project-list"
            @click="toggleMenu"
          >
            项目
          </router-link>
        </li>
        <li v-if="userStore.role === 'ORG'">
          <router-link
            class="block text-gray-700 hover:text-indigo-600 transition-colors duration-300"
            to="/org/dashboard"
            @click="toggleMenu"
          >
            项目管理
          </router-link>
        </li>
        <li>
          <router-link
            class="block text-gray-700 hover:text-indigo-600 transition-colors duration-300"
            to="/hash-verification"
            @click="toggleMenu"
          >
            交易校验
          </router-link>
        </li>
        <li>
          <a
            class="block text-gray-700 hover:text-indigo-600 transition-colors duration-300"
            href="#about"
            @click="toggleMenu"
          >
            关于
          </a>
        </li>
        <li v-if="!userStore.userId">
          <router-link
            class="block px-4 py-2 text-white bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
            to="/login"
            @click="toggleMenu"
          >
            登录
          </router-link>
        </li>
        <li v-if="userStore.userId">
          <router-link
            :to="userStore.role === 'INDIVIDUAL' ? '/user-center/individual' : '/user-center/org'"
            class="block px-4 py-2 text-white bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
            @click="toggleMenu"
          >
            个人中心
          </router-link>
        </li>
        <li v-if="userStore.userId">
          <button
            class="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 transition-all duration-300 shadow-md hover:shadow-lg"
            title="登出"
            @click="handleLogout"
          >
            <img
              alt="登出"
              class="w-6 h-6 text-green-600"
              src="@/assets/images/kaiguan.svg"
            />
          </button>
        </li>
      </ul>
    </transition>
  </nav>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'
import userApi from '@/api/user'

const userStore = useUserStore()
const router = useRouter()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  try {
    await userApi.logout()
  } catch (error) {
    console.error('登出失败:', error)
  }
  userStore.resetStats?.()
  userStore.clearUserData?.()
  localStorage.removeItem('satoken')
  isMenuOpen.value = false
  router.push('/')
}
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 50;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
