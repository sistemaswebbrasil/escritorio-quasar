<template>
  <q-layout view="hHh LpR lff">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn
          dense
          flat
          round
          :icon="darkMode ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header> Internal Links </q-item-label>

        <InternalLink v-for="link in internalLinkList" :key="link.title" v-bind="link" />
      </q-list>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <div class="text-center q-pa-sm">&copy; 2023 Your Company. All rights reserved.</div>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLayoutStore } from 'src/stores/layoutStore'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'
import type { InternalLinkProps } from 'src/components/InternalLink.vue'
import InternalLink from 'src/components/InternalLink.vue'
import { useQuasar } from 'quasar'
import { watch, onMounted } from 'vue'

const $q = useQuasar()
const layoutStore = useLayoutStore()
const { leftDrawerOpen, darkMode } = storeToRefs(layoutStore)
const toggleLeftDrawer = () => layoutStore.toggleLeftDrawer()
const toggleDarkMode = () => layoutStore.toggleDarkMode()

// Sincronizar dark mode com Quasar
watch(darkMode, (newValue) => {
  $q.dark.set(newValue)
})

// Inicializar dark mode
onMounted(() => {
  $q.dark.set(darkMode.value)
})

const internalLinkList: InternalLinkProps[] = [
  {
    title: 'Home',
    caption: 'Go to home page',
    link: '/',
    icon: 'home',
    exact: true,
  },
  {
    title: 'About',
    caption: 'Learn more about us',
    link: '/about',
    icon: 'info',
  },
  {
    title: 'Contact',
    caption: 'Get in touch with us',
    link: '/contact',
    icon: 'mail',
  },
]

const linksList: EssentialLinkProps[] = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
]
</script>
