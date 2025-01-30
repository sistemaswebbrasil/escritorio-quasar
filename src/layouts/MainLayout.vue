<template>
  <q-layout view="hHh LpR lff">
    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-btn v-if="!isHorizontalMenu" dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="row items-center">
          <q-avatar square class="q-mt-md q-mr-sm" size="60px">
            <img :src="darkMode ? darkLogo : lightLogo" alt="Office Logo" />
          </q-avatar>
          <div class="text-center">
            {{ $t('project.title') }}
          </div>
        </q-toolbar-title>

        <q-space />

        <q-btn
          dense
          flat
          round
          :icon="darkMode ? 'light_mode' : 'dark_mode'"
          @click="toggleDarkMode"
        />
        <q-btn dense flat round icon="settings" @click="customize" />

        <q-btn
          dense
          flat
          :icon="
            layoutStore.language === 'pt-BR'
              ? 'img:https://flagcdn.com/24x18/br.png'
              : 'img:https://flagcdn.com/24x18/us.png'
          "
          @click="toggleLanguage"
        >
          <q-tooltip>
            {{
              $t(
                'components.layoutCustomizer.settings.language.' +
                  (layoutStore.language === 'pt-BR' ? 'english' : 'portuguese'),
              )
            }}
          </q-tooltip>
        </q-btn>

        <!-- User Profile Button -->
        <q-btn v-if="user" flat round>
          <q-avatar size="32px">
            <img :src="user?.picture || ''" :alt="user?.name || ''" />
          </q-avatar>

          <q-menu>
            <q-list style="min-width: 200px">
              <q-item clickable v-close-popup to="/profile">
                <q-item-section avatar>
                  <q-icon name="person" />
                </q-item-section>
                <q-item-section>{{ $t('components.mainLayout.profile.profile') }}</q-item-section>
              </q-item>

              <q-separator />

              <q-item clickable v-close-popup @click="logout">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>{{ $t('components.mainLayout.profile.logout') }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>

      <!-- Menu Horizontal -->
      <q-tabs
        v-if="isHorizontalMenu"
        align="left"
        class="bg-primary text-white"
        dense
        inline-label
        shrink
      >
        <q-route-tab
          v-for="link in internalLinkList"
          :key="link.title"
          :to="link.link"
          :label="link.title"
          :icon="link.icon"
          :exact="link.exact"
          no-caps
        />
      </q-tabs>
    </q-header>

    <!-- Menu Vertical -->
    <q-drawer v-if="!isHorizontalMenu" show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header> {{ $t('components.mainLayout.menu.internalLinks') }} </q-item-label>

        <InternalLink v-for="link in internalLinkList" :key="link.title" v-bind="link" />
      </q-list>
      <q-list>
        <q-item-label header> {{ $t('components.mainLayout.menu.essentialLinks') }} </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal bordered class="bg-grey-8 text-white">
      <div class="text-center q-pa-sm">{{ $t('components.mainLayout.footer.copyright') }}</div>
    </q-footer>

    <LayoutCustomizer v-model="showCustomizer" />
  </q-layout>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLayoutStore } from 'src/stores/layoutStore'
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue'
import type { InternalLinkProps } from 'src/components/InternalLink.vue'
import InternalLink from 'src/components/InternalLink.vue'
import { useQuasar } from 'quasar'
import { watch, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import LayoutCustomizer from 'src/components/LayoutCustomizer.vue'
import lightLogo from '../assets/app-logo-light.svg'
import darkLogo from '../assets/app-logo-dark.svg'
import { useAuth0 } from '@auth0/auth0-vue'

const { t } = useI18n()
const $q = useQuasar()
const layoutStore = useLayoutStore()
const { leftDrawerOpen, darkMode, isHorizontalMenu } = storeToRefs(layoutStore)
const { locale } = useI18n()
const toggleLeftDrawer = () => layoutStore.toggleLeftDrawer()
const toggleDarkMode = () => layoutStore.toggleDarkMode()
const showCustomizer = ref(false)
const customize = () => {
  showCustomizer.value = true
}

const toggleLanguage = () => {
  layoutStore.toggleLanguage()
  locale.value = layoutStore.language
  $q.notify({
    message: t(
      'components.layoutCustomizer.settings.language.' +
        (layoutStore.language === 'pt-BR' ? 'portuguese' : 'english'),
    ),
    position: 'bottom',
    timeout: 1000,
  })
}

// Sincronizar dark mode com Quasar
watch(darkMode, (newValue) => {
  $q.dark.set(newValue)
})

// Inicializar dark mode
onMounted(() => {
  $q.dark.set(darkMode.value)
  if (isHorizontalMenu.value) {
    layoutStore.leftDrawerOpen = false
  }
  locale.value = layoutStore.language
})

// Fechar drawer quando mudar para menu horizontal
watch(isHorizontalMenu, (newValue) => {
  if (newValue) {
    layoutStore.leftDrawerOpen = false
  }
})

const internalLinkList: InternalLinkProps[] = [
  {
    title: t('pages.index.title'),
    caption: 'Go to home page',
    link: '/',
    icon: 'home',
    exact: true,
  },
  {
    title: t('pages.about.title'),
    caption: 'Learn more about us',
    link: '/about',
    icon: 'info',
  },
  {
    title: t('pages.contact.title'),
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

const auth0 = useAuth0()
const { user } = useAuth0()
const logout = () => auth0.logout()
</script>

<style scoped>
.q-tabs {
  min-height: 40px;
}

.q-tab {
  min-height: 40px;
  padding: 0 16px;
}

.q-tab__icon {
  font-size: 1.2rem;
  margin-right: 4px;
}

.q-tab__label {
  font-size: 0.875rem;
}
</style>
