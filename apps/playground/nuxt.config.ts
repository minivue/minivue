// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  vite: {
    define: {
      __DEV__: true,
      __MINIVUE__: false,
    },
  },
})
