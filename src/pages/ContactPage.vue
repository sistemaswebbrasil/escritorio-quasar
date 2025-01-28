<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">{{ $t('pages.contact.title') }}</div>
      </q-card-section>

      <q-card-section>
        <p>{{ $t('pages.contact.description') }}</p>
        <p>
          {{ $t('pages.contact.emailInfo') }}
          <a href="mailto:support@example.com">support@example.com</a>
          {{ $t('pages.contact.phoneInfo') }} (123) 456-7890.
        </p>
        <p>{{ $t('pages.contact.officeHours') }}</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('pages.contact.sendButton')" color="primary" @click="sendMessage" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
function sendMessage() {
  // Implement your send message logic here
  console.log('Message sent')
}
</script>
