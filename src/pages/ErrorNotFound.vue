<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        {{ $t('pages.error.title') }}
      </div>

      <div class="text-h2" style="opacity: 0.4">
        {{ $t('pages.error.description') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        :label="$t('pages.error.backButton')"
        no-caps
      />
    </div>
  </div>
</template>

<script setup lang="ts">
//
</script>
