<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'

withDefaults(defineProps<{
  label?: string
  disabled?: boolean
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'
}>(), {
  variant: 'outline',
  size: 'icon-sm'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :title="label || 'Letöltés'"
    @click="emit('click')"
  >
    <Icon name="Download" :class="label ? 'mr-2 h-4 w-4' : 'h-4 w-4'" />
    <slot>{{ label }}</slot>
  </Button>
</template>
