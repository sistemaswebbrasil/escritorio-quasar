<template>
  <div>
    <p>{{ $t('components.example.title') }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>{{ $t('components.example.count', { count: todoCount, total: meta.totalCount }) }}</p>
    <p>
      {{ $t('components.example.active') }}:
      {{ active ? $t('components.example.active.yes') : $t('components.example.active.no') }}
    </p>
    <p>{{ $t('components.example.clicks') }} {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Todo, Meta } from './models'

interface Props {
  title: string
  todos?: Todo[]
  meta: Meta
  active: boolean
}

const props = withDefaults(defineProps<Props>(), {
  todos: () => [],
})

const clickCount = ref(0)
function increment() {
  clickCount.value += 1
  return clickCount.value
}

const todoCount = computed(() => props.todos.length)
</script>
