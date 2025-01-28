<template>
  <router-link :to="link" custom v-slot="{ navigate, href, isExactActive }" :exact="exact">
    <q-item
      clickable
      tag="a"
      :href="href"
      @click="(evt: Event) => navigate(evt as MouseEvent)"
      :class="{ 'active-link': isExactActive }"
    >
      <q-item-section v-if="icon" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </router-link>
</template>

<script setup lang="ts">
export interface InternalLinkProps {
  title: string
  caption?: string
  link: string
  icon?: string
  exact?: boolean
}

withDefaults(defineProps<InternalLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
  exact: false,
})
</script>

<style scoped>
.active-link {
  background-color: #e0f7fa; /* Example active background color */
  color: #00796b; /* Example active text color */
}
</style>
