<template>
  <div id="app">
    <q-btn @click="login" label="Login" v-if="!isAuthenticated" />
    <q-btn @click="handleLogout" label="Logout" v-if="isAuthenticated" />
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

const auth0 = useAuth0()
const isAuthenticated = auth0 && auth0.isAuthenticated

const login = async () => {
  await auth0.loginWithRedirect()
}

const handleLogout = async () => {
  await auth0.logout({ logoutParams: { returnTo: window.location.origin } })
}
</script>
