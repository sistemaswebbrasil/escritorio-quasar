<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">Contact Us</div>
      </q-card-section>

      <q-card-section>
        <p>
          If you have any questions, feel free to reach out to us. We are here to help you and
          provide the best service possible.
        </p>
        <p>
          You can contact us via email at
          <a href="mailto:support@example.com">support@example.com</a> or call us at (123) 456-7890.
        </p>
        <p>
          Our office hours are Monday to Friday, 9 AM to 5 PM. We look forward to hearing from you!
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Send Message" color="primary" @click="sendMessage" />
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
