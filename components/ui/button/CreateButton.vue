<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  to?: string
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const router = useRouter()

const handleClick = (event: MouseEvent) => {
  if (props.to) {
    router.push(props.to)
  } else {
    emit('click')
  }
}
</script>

<template>
  <Button @click="handleClick">
    <Icon name="Plus" class="mr-2 h-4 w-4" />
    <slot />
  </Button>
</template>
