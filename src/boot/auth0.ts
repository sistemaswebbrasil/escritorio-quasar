import { boot } from 'quasar/wrappers'
import type { Auth0Plugin } from '@auth0/auth0-vue'
import { createAuth0 } from '@auth0/auth0-vue'
import type { Router } from 'vue-router'
import type { App } from 'vue'
import { watch } from 'vue'
import { useAuthStore } from '../stores'

// Declare module augmentation for Vue
declare module 'vue' {
  interface App {
    use(plugin: Auth0Plugin): App
  }
}

export default boot(async ({ app }: { app: App; router: Router }) => {
  const authStore = useAuthStore()

  const auth0 = createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
      audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      scope: 'openid profile email',
    },
  })

  // Install the authentication plugin
  app.use(auth0)

  // Wait for Auth0 to initialize
  await auth0.checkSession()
  // Store token in Pinia and local storage
  watch(
    () => auth0.isAuthenticated.value,
    async (isAuthenticated) => {
      if (isAuthenticated) {
        const token = await auth0.getAccessTokenSilently()
        console.log(token)
        const idToken = auth0.idTokenClaims.value?.__raw
        console.log(JSON.stringify(idToken))
        authStore.setToken(idToken ?? token)
      }
    },
  )
})
