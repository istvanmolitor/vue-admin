<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'

defineProps<{
  icon: string
  disabled?: boolean
  size?: 'sm' | 'default' | 'lg'
  variant?: 'ghost' | 'outline' | 'destructive' | 'default'
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <Button
    type="button"
    :variant="variant ?? 'ghost'"
    :size="size ?? 'sm'"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <Icon :name="icon" class="w-4 h-4" />
  </Button>
</template>

