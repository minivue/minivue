// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    keepalive: true,
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000, // 端口号可自行修改
  },
  vite: {
    define: {
      __DEV__: true,
      __MINIVUE__: false,
    },
  },
})
