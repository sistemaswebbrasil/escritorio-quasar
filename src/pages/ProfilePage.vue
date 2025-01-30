<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12">
        <q-card v-if="user" class="q-pa-md">
          <q-card-section class="text-center">
            <q-avatar size="100px">
              <q-img :src="user.picture" />
            </q-avatar>
            <h4 class="q-mt-md q-mb-xs">{{ user.name }}</h4>
            <p class="text-grey-7 q-ma-none">{{ user.email }}</p>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Email Verified</q-item-label>
                  <q-item-label>
                    <q-chip
                      :color="user.email_verified ? 'positive' : 'negative'"
                      text-color="white"
                    >
                      {{ user.email_verified ? 'Yes' : 'No' }}
                    </q-chip>
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label caption>Last Update</q-item-label>
                  <q-item-label>{{
                    user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'
                  }}</q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-if="idTokenClaims">
                <q-item-section>
                  <q-item-label caption>Auth0 ID</q-item-label>
                  <q-item-label class="text-wrap">{{ user.sub }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <div v-else class="text-center">
          <q-spinner-dots size="40px" />
          <p>Loading profile...</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuth0 } from '@auth0/auth0-vue'

const { user, idTokenClaims } = useAuth0()
</script>
