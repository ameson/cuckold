// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: [
    'animate.css/animate.min.css',
    '~/assets/css/main.css'
  ],
  elementPlus: {
    importStyle: 'css',
    themes: ['dark']
  },
  app: {
    head: {
      title: '时光侦探',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  // 添加调试配置
  nitro: {
    debug: true
  },
  // 开发服务器配置
  devServer: {
    port: 3000,
    host: 'localhost'
  }
})
