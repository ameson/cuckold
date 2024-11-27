<template>
  <div>
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-bold">绿帽指数--情感关系分析系统</h1>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>

    <footer class="bg-gray-800 text-white py-4 mt-auto">
      <div class="container mx-auto px-4 text-center">
        <p class="mb-2">绿帽指数--情感关系分析系统 &copy; {{ new Date().getFullYear() }}</p>
        <div class="flex items-center justify-center space-x-4 text-sm text-gray-400">
          <PrivacyPolicy />
          <span class="text-gray-500">|</span>
          <div class="hover:text-gray-300 transition-colors">
            联系我们：blinddate#temp.now
            <span class="text-xs text-gray-500">（使用时请将#替换为@）</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useHead } from '#imports'
import PrivacyPolicy from '~/components/PrivacyPolicy.vue'

useHead({
  script: [
    {
      children: `
        var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?ba0dc90db21ffc60048c083038c076d9";
          var s = document.getElementsByTagName("script")[0]; 
          s.parentNode.insertBefore(hm, s);
        })();
      `,
      type: 'text/javascript'
    }
  ]
})
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#__nuxt {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
