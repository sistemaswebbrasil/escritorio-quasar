<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('pages.about.title') }}</div>
      </q-card-section>

      <q-card-section>
        <p>{{ $t('pages.about.description') }}</p>
        <p>{{ $t('pages.about.mission') }}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('pages.about.contactButton')" color="primary" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
export default {
  name: 'AboutPage',
}
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}
</style>
