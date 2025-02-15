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
        :grid="$q.screen.lt.md"
      >
        <template v-slot:loading>
          <q-inner-loading showing>
            <q-circular-progress indeterminate size="50px" />
          </q-inner-loading>
        </template>
        <template v-slot:top-right>
          <q-btn-group flat>
            <q-btn :label="$t('pages.tasks.action.create')" @click="createTask" icon="add" />
            <q-btn icon="refresh" flat round :loading="loading" @click="fetchTasks">
              <template v-slot:loading>
                <q-spinner-hourglass />
              </template>
            </q-btn>
          </q-btn-group>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-chip :color="getStatusColor(props.row.status)" text-color="white">
              {{ $t(`enums.taskStatus.${props.row.status}`) }}
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
                @click="handleDelete(props.row.id)"
              />
            </q-btn-group>
          </q-td>
        </template>

        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ props.row.title }}</div>
                <div class="text-subtitle2">{{ props.row.description }}</div>
              </q-card-section>

              <q-card-section>
                <q-chip :color="getStatusColor(props.row.status)" text-color="white">
                  {{ $t(`enums.taskStatus.${props.row.status}`) }}
                </q-chip>
              </q-card-section>

              <q-card-section>
                <div class="text-caption">
                  {{ $t('fields.createdAt') }}:
                  {{ DateFormatter.toLocaleString(props.row.createdAt, locale) }}
                </div>
                <div class="text-caption">
                  {{ $t('fields.updatedAt') }}:
                  {{ DateFormatter.timeAgo(props.row.updatedAt, locale) }}
                </div>
              </q-card-section>
              <!-- prettier-ignore -->
              <q-card-actions align="right">
                <q-btn flat round icon="edit" @click="editTask(props.row)" />
                <q-btn
                  flat
                  round
                  icon="delete"
                  @click="handleDelete(props.row.id)"
                />
              </q-card-actions>
            </q-card>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>

  <q-dialog v-model="dialog" persistent>
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">
          {{
            formTask.id ? t('pages.tasks.editTask', { id: formTask.id }) : t('pages.tasks.newTask')
          }}
        </div>
      </q-card-section>

      <q-separator />

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-card-section style="max-height: 50vh" class="scroll">
          <q-input
            v-model="formTask.title"
            :label="t('fields.title')"
            lazy-rules
            :rules="[(val) => !!val || t('error.required')]"
            outlined
          />
          <q-input
            v-model="formTask.description"
            :label="t('fields.description')"
            lazy-rules
            type="textarea"
            :rules="[(val) => !!val || t('error.required')]"
            outlined
          />
          <q-select
            v-model="formTask.status"
            :options="statusOptions"
            :label="t('fields.status')"
            :option-label="(opt) => t(`enums.taskStatus.${opt}`)"
            lazy-rules
            :rules="[(val) => !!val || t('error.required')]"
            outlined
          />
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn :label="t('pages.tasks.action.cancel')" color="grey" v-close-popup flat />
          <q-btn
            :label="formTask.id ? t('pages.tasks.action.update') : t('pages.tasks.action.create')"
            icon="save"
            type="submit"
            color="primary"
          />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-card-actions>
      </q-form>
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
import TaskService, { TaskStatus, type Task } from 'src/services/TaskService'
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
  {
    name: 'id',
    label: t('fields.id'),
    field: 'id',
    sortable: true,
    align: 'right' as const, // números à direita
  },
  {
    name: 'title',
    label: t('fields.title'),
    field: 'title',
    sortable: true,
    align: 'left' as const, // texto à esquerda
  },
  {
    name: 'description',
    label: t('fields.description'),
    field: 'description',
    align: 'left' as const, // texto à esquerda
  },
  {
    name: 'status',
    label: t('fields.status'),
    field: 'status',
    sortable: true,
    align: 'left' as const, // enums/status à esquerda
  },
  {
    name: 'createdAt',
    label: t('fields.createdAt'),
    field: 'createdAt',
    sortable: true,
    align: 'right' as const, // datas à direita
    format: (val: string) => DateFormatter.toLocaleString(val, locale.value),
  },
  {
    name: 'updatedAt',
    label: t('fields.updatedAt'),
    field: 'updatedAt',
    sortable: true,
    align: 'right' as const, // datas à direita
    format: (val: string) => DateFormatter.timeAgo(val, locale.value),
  },
  {
    name: 'actions',
    label: t('fields.actions'),
    field: 'actions',
    align: 'center' as const,
    style: 'position: sticky; right: 0; z-index: 1;',
    classes: $q.dark.isActive ? 'bg-dark' : 'bg-white',
  },
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
      type: 'positive',
      message: t('success.deleteId', { id: id }),
    })
    await fetchTasks()
  } catch (error: unknown) {
    $q.notify({
      type: 'negative',
      message: t('error.deleteId', { id: id }),
      caption: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

const dialog = ref(false)
const confirm = ref({ open: false, actionConfirm: () => {} })
const formTask = ref<Task>({ title: '', description: '', status: TaskStatus.TODO })
const statusOptions = Object.values(TaskStatus)

function createTask() {
  formTask.value = { title: '', description: '', status: TaskStatus.TODO }
  dialog.value = true
}

function editTask(task: Task) {
  formTask.value = { ...task }
  dialog.value = true
}

const handleDelete = (id: number) => {
  confirm.value = {
    open: true,
    actionConfirm: () => {
      void deleteTask(id)
    },
  }
}

async function onSubmit() {
  try {
    if (formTask.value.id) {
      await TaskService.updateTask(formTask.value.id, formTask.value)
      $q.notify({
        type: 'positive',
        message: t('success.updateId', { id: formTask.value.id }),
      })
    } else {
      const data = await TaskService.createTask(formTask.value)
      $q.notify({
        actions: [
          {
            icon: 'close',

            round: true,
          },
        ],
        progress: true,

        type: 'positive',
        message: t('success.createId', { id: data.id }),
      })
    }
    await fetchTasks()
    dialog.value = false
  } catch (error: unknown) {
    $q.notify({
      type: 'negative',
      message: formTask.value.id
        ? t('error.updateId', { id: formTask.value.id })
        : t('error.create'),
      caption: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}

const onReset = () => {
  formTask.value = { title: '', description: '', status: TaskStatus.TODO }
}

onMounted(fetchTasks)
</script>
