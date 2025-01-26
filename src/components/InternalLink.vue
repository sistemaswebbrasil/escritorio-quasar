<template>
  <router-link :to="link" custom v-slot="{ navigate, href }">
    <q-item clickable tag="a" :href="href" @click="(evt: Event) => navigate(evt as MouseEvent)">
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
}

withDefaults(defineProps<InternalLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})
</script>
