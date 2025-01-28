<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card style="min-width: 350px">
      <q-card-section class="row items-center">
        <div class="text-h6">{{ $t('components.layoutCustomizer.title') }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-list>
          <q-item tag="label">
            <q-item-section>
              <q-item-label>{{
                $t('components.layoutCustomizer.settings.theme.label')
              }}</q-item-label>
              <q-item-label caption>{{
                $t('components.layoutCustomizer.settings.theme.caption')
              }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle :model-value="darkMode" @update:model-value="layoutStore.toggleDarkMode" />
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item tag="label">
            <q-item-section>
              <q-item-label>{{
                $t('components.layoutCustomizer.settings.menu.label')
              }}</q-item-label>
              <q-item-label caption>{{
                $t('components.layoutCustomizer.settings.menu.caption')
              }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                :model-value="isHorizontalMenu"
                @update:model-value="layoutStore.toggleMenuMode"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('components.layoutCustomizer.close')"
          color="primary"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayoutStore } from 'src/stores/layoutStore'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const layoutStore = useLayoutStore()
const { darkMode, isHorizontalMenu } = storeToRefs(layoutStore)
</script>
