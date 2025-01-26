<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <div class="text-h6">About Us</div>
      </q-card-section>

      <q-card-section>
        <p>
          Welcome to our application! We are dedicated to providing the best service possible. Our
          team is composed of experienced professionals who are passionate about what they do.
        </p>
        <p>
          Our mission is to deliver high-quality products that meet the needs of our customers. We
          value feedback and are always looking for ways to improve.
        </p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Contact Us" color="primary" />
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
