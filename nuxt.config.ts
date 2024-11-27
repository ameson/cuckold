// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
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
  vite: {
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg']
  },
  app: {
    head: {
      title: '绿帽指数--情感关系分析系统',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: '专业的情感关系分析系统，帮助您科学评估感情健康程度，提供专业的分析和建议。' 
        }
      ],
      script: [
        {
          src: 'https://hm.baidu.com/hm.js?ba0dc90db21ffc60048c083038c076d9',
          async: true,
          defer: true
        },
        {
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7136566294963382',
          async: true,
          crossorigin: 'anonymous'
        }
      ]
    }
  },
  // 添加调试配置
  nitro: {
    preset: 'netlify',
    debug: true
  },
  // 开发服务器配置
  devServer: {
    port: 3000,
    host: 'localhost'
  }
})
