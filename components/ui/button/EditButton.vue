<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'
import { useRouter } from 'vue-router'

const props = withDefaults(defineProps<{
  to?: string
  label?: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}>(), {
  variant: 'outline',
  size: 'icon-sm'
})

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
  <Button
    :variant="variant"
    :size="size"
    @click="handleClick"
    :title="label || 'Szerkesztés'"
  >
    <Icon name="edit" :class="label ? 'mr-2 h-4 w-4' : 'h-4 w-4'" />
    <slot>{{ label }}</slot>
  </Button>
</template>
