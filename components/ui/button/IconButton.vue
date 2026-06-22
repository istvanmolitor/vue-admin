<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'

defineProps<{
  icon: string
  disabled?: boolean
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <Button
    type="button"
    :variant="variant ?? 'outline'"
    :size="size ?? 'icon-sm'"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <Icon :name="icon" class="w-4 h-4" />
  </Button>
</template>

