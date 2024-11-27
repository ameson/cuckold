<template>
  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink to="/" class="flex items-center text-xl font-bold text-green-600">
              绿帽指数
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1">
      <NuxtPage />
    </main>

    <footer class="bg-white">
      <div class="max-w-7xl mx-auto py-4 px-4">
        <p class="text-center text-sm text-gray-500">
          关系风险评估系统 &copy; {{ new Date().getFullYear() }}
        </p>
      </div>
    </footer>
  </div>
</template>

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
</style>
