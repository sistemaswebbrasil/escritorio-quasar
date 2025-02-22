<template>
  <q-page padding>
    <q-toolbar class="bg-transparent">
      <q-toolbar-title>Consulta CEP</q-toolbar-title>
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" :label="$t('pages.index.title')" to="/" />
        <q-breadcrumbs-el label="Consulta CEP" />
      </q-breadcrumbs>
    </q-toolbar>

    <div class="row justify-center q-mt-lg">
      <div class="col-12">
        <q-card>
          <q-card-section>
            <q-input
              v-model="cep"
              label="Digite o CEP"
              mask="#####-###"
              :rules="[
                (val) => !!val || 'CEP é obrigatório',
                (val) => val.length === 9 || 'CEP inválido',
              ]"
            >
              <template v-slot:append>
                <q-btn
                  icon="search"
                  color="primary"
                  :loading="loading"
                  @click="buscarCep"
                  :disable="cep.length !== 9"
                >
                  <template v-slot:loading>
                    <q-spinner-hourglass />
                  </template>
                </q-btn>
              </template>
            </q-input>
          </q-card-section>

          <q-card-section v-if="endereco">
            <div class="text-h6">Resultado:</div>
            <q-list bordered separator>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Logradouro</q-item-label>
                  <q-item-label>{{ endereco.logradouro || '-' }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Bairro</q-item-label>
                  <q-item-label>{{ endereco.bairro || '-' }}</q-item-label>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label caption>Cidade/UF</q-item-label>
                  <q-item-label>{{ endereco.localidade }}/{{ endereco.uf }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import CepService, { type CepResponse } from 'src/services/CepService'

const $q = useQuasar()
const cep = ref('')
const loading = ref(false)
const endereco = ref<CepResponse | null>(null)

async function buscarCep() {
  if (cep.value.length !== 9) return

  try {
    loading.value = true
    const cepLimpo = cep.value.replace('-', '')
    endereco.value = await CepService.consultaCep(cepLimpo)
  } catch (error) {
    endereco.value = null
    $q.notify({
      type: 'negative',
      message: error instanceof Error ? error.message : 'Erro ao consultar CEP',
    })
  } finally {
    loading.value = false
  }
}
</script>
