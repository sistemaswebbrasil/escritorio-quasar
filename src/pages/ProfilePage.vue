<template>
  <div>
    <h1>Profile</h1>
    <div v-if="user">
      <p>Name: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { user } = useAuth0()
</script>
