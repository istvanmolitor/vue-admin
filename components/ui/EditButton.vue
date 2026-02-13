<script setup lang="ts">
import Button from './Button.vue'
import Icon from './Icon.vue'

interface EditButtonProps {
  variant?: 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  iconName?: string
  iconSize?: number
  showIcon?: boolean
  label?: string
}

const props = withDefaults(defineProps<EditButtonProps>(), {
  variant: 'ghost',
  size: 'sm',
  iconName: 'pen-line',
  iconSize: 16,
  showIcon: true,
  label: 'Szerkesztés'
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    @click="$emit('click')"
  >
    <Icon
      v-if="showIcon"
      :name="iconName"
      :size="iconSize"
      :class="label ? 'mr-2' : ''"
    />
    {{ label }}
  </Button>
</template>

