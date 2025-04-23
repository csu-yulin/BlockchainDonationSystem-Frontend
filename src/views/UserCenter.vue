<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
    <div class="bg-white bg-opacity-95 p-8 rounded-2xl shadow-lg w-full max-w-md backdrop-blur-lg text-center">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">
        个人中心
      </h2>
      <p>欢迎，{{ userStore.phoneNumber }}</p>
      <p class="mt-4 text-gray-600">
        请完善您的个人信息
      </p>
      <button
        class="mt-6 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full hover:from-indigo-600 hover:to-blue-700 transition-all duration-300"
        @click="router.push('/')"
      >
        返回首页
      </button>
      <button
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-300"
        @click="handleLogout"
      >
        退出登录
      </button>
    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {useUserStore} from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const handleLogout = () => {
  userStore.clearUserData()
  router.push('/')
}
</script>
