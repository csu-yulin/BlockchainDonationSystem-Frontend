<template>
  <!-- 导航栏 -->
  <NavBar />

  <!-- 添加容器，预留导航栏高度 -->
  <!--  <div class="pt-16">-->
  <div class="pt-[68px]">
    <Transition
      mode="out-in"
      name="page"
      @enter="enter"
      @leave="leave"
      @before-enter="beforeEnter"
    >
      <router-view />
    </Transition>
  </div>
</template>

<script setup>
import {onMounted} from 'vue'
import gsap from 'gsap'
import router from './router'
import NavBar from '@/components/NavBar.vue'

onMounted(() => {
  router.push('/') // 默认跳转首页
})

// GSAP 动画函数
const beforeEnter = (el) => {
  gsap.set(el, {opacity: 0, y: 50}) // 设置初始状态
}

const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
    overwrite: 'auto',
    onComplete: done,
  })
}

const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -50,
    duration: 0.6,
    ease: 'power2.in',
    overwrite: 'auto',
    onComplete: done,
  })
}
</script>

<style scoped>
/* 移除 CSS 过渡，避免干扰 */
.page-enter-active,
.page-leave-active {
  /* transition: all 0.5s ease; */
}

.page-enter-from,
.page-leave-to {
  /* opacity: 0; */
  /* transform: translateY(50px); */
}
</style>
