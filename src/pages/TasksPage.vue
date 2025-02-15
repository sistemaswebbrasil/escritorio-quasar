<template>
  <q-page padding>
    <q-toolbar class="bg-transparent">
      <q-toolbar-title>{{ $t('pages.tasks.title') }}</q-toolbar-title>
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="home" :label="$t('pages.index.title')" to="/" />
        <q-breadcrumbs-el :label="$t('pages.tasks.title')" />
      </q-breadcrumbs>
    </q-toolbar>
    <div class="q-pa-md">
      <q-table
        :rows="tasks"
        :columns="columns"
        row-key="id"
        :loading="loading"
        v-model:pagination="pagination"
      >
        <template v-slot:loading>
          <q-inner-loading showing>
            <q-circular-progress indeterminate size="50px" />
          </q-inner-loading>
        </template>
        <template v-slot:top-right>
          <q-btn-group flat>
            <q-btn
              color="primary"
              :label="$t('pages.tasks.action.create')"
              @click="createTask"
              icon="add"
            />
            <q-btn
              color="secondary"
              icon="refresh"
              flat
              round
              :loading="loading"
              @click="fetchTasks"
            >
              <template v-slot:loading>
                <q-spinner-hourglass />
              </template>
            </q-btn>
          </q-btn-group>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip :color="getStatusColor(props.row.status)" text-color="white">
              {{ props.row.status }}
            </q-chip>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn-group flat>
              <q-btn flat round icon="edit" @click="editTask(props.row)" />
              <!-- prettier-ignore -->
              <q-btn
                flat
                round
                icon="delete"
                @click="
                  confirm.open = true;
                  confirm.actionConfirm = () => deleteTask(props.row.id)
                "
              />
            </q-btn-group>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>

  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="saveTask" class="q-gutter-md">
          <q-input v-model="formTask.title" label="Title" />
          <q-input v-model="formTask.description" label="Description" />
          <q-select v-model="formTask.status" :options="statusOptions" label="Status" />
          <div class="row justify-end">
            <q-btn type="submit" label="Save" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirm.open" persistent :title="$t('confirm.generic.title')">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="help" color="primary" text-color="white" />
        <span class="q-ml-sm">{{ $t('confirm.generic.message') }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('confirm.generic.cancel')" color="primary" v-close-popup />
        <q-btn
          flat
          :label="$t('confirm.generic.confirm')"
          color="primary"
          v-close-popup
          @click="confirm.actionConfirm"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
import { useQuasar } from 'quasar'
import TaskService, { type Task } from 'src/services/TaskService'
import { useI18n } from 'vue-i18n'
import { DateFormatter } from 'src/utils/DateFormatter'

const { locale } = useI18n()
const $q = useQuasar()
const { t } = useI18n()
const tasks = ref<Task[]>([])
const loading = ref(false)
const pagination = ref({
  sortBy: 'createdAt',
  descending: true,
  page: 1,
  rowsPerPage: 10,
})

const columns = computed(() => [
  { name: 'id', label: t('fields.id'), field: 'id', sortable: true },
  { name: 'title', label: t('fields.title'), field: 'title', sortable: true },
  { name: 'description', label: t('fields.description'), field: 'description' },
  { name: 'status', label: t('fields.status'), field: 'status', sortable: true },
  {
    name: 'createdAt',
    label: t('fields.createdAt'),
    field: 'createdAt',
    sortable: true,
    format: (val: string) => DateFormatter.toLocaleString(val, locale.value),
  },
  {
    name: 'updatedAt',
    label: t('fields.updatedAt'),
    field: 'updatedAt',
    sortable: true,
    format: (val: string) => DateFormatter.timeAgo(val, locale.value),
  },
  { name: 'actions', label: t('fields.actions'), field: 'actions' },
])

const getStatusColor = (status: string) => {
  switch (status) {
    case 'TODO':
      return 'grey'
    case 'IN_PROGRESS':
      return 'orange'
    case 'DONE':
      return 'green'
    default:
      return 'grey'
  }
}

const fetchTasks = async () => {
  try {
    loading.value = true
    tasks.value = await TaskService.getAllTasks()
  } catch (error: unknown) {
    $q.notify({
      position: 'center',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
        },
      ],
      progress: true,
      color: 'negative',
      type: 'negative',
      message: 'Failed to load tasks',
      caption: error instanceof Error ? error.message : 'Unknown error',
    })
  } finally {
    loading.value = false
  }
}

const deleteTask = async (id: number) => {
  try {
    await TaskService.deleteTask(id)
    $q.notify({
      position: 'center',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
        },
      ],
      progress: true,
      color: 'positive',
      type: 'positive',
      message: t('success.deleteId', { id: id }),
    })
    await fetchTasks()
  } catch (error: unknown) {
    $q.notify({
      position: 'center',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
        },
      ],
      progress: true,
      color: 'negative',
      type: 'negative',
      message: t('error.deleteId', { id: id }),
      caption: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

const dialog = ref(false)
const confirm = ref({ open: false, actionConfirm: () => {} })
const formTask = ref<Task>({ title: '', description: '', status: 'TODO' })
const statusOptions = ['TODO', 'IN_PROGRESS', 'DONE']

function createTask() {
  formTask.value = { title: '', description: '', status: 'TODO' }
  dialog.value = true
}

function editTask(task: Task) {
  formTask.value = { ...task }
  dialog.value = true
}

async function saveTask() {
  try {
    if (formTask.value.id) {
      await TaskService.updateTask(formTask.value.id, formTask.value)
      $q.notify({
        position: 'center',
        actions: [
          {
            icon: 'close',
            color: 'white',
            round: true,
          },
        ],
        progress: true,
        color: 'positive',
        type: 'positive',
        message: t('success.updateId', { id: formTask.value.id }),
      })
    } else {
      const data = await TaskService.createTask(formTask.value)
      $q.notify({
        position: 'center',
        actions: [
          {
            icon: 'close',
            color: 'white',
            round: true,
          },
        ],
        progress: true,
        color: 'positive',
        type: 'positive',
        message: t('success.createId', { id: data.id }),
      })
    }
    await fetchTasks()
    dialog.value = false
  } catch (error: unknown) {
    $q.notify({
      position: 'center',
      actions: [
        {
          icon: 'close',
          color: 'white',
          round: true,
        },
      ],
      progress: true,
      color: 'negative',
      type: 'negative',
      message: formTask.value.id
        ? t('error.updateId', { id: formTask.value.id })
        : t('error.create'),
      caption: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

onMounted(fetchTasks)
</script>
