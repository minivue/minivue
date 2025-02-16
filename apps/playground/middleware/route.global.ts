export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server) return
  console.log('Route middleware:', to, from)
})
