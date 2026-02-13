<script setup lang="ts">
import Button from './Button.vue'
import Icon from './Icon.vue'

interface DeleteButtonProps {
  variant?: 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary'
  size?: 'sm' | 'default' | 'lg' | 'icon'
  iconName?: string
  iconSize?: number
  showIcon?: boolean
  label?: string
}

withDefaults(defineProps<DeleteButtonProps>(), {
  variant: 'destructive',
  size: 'sm',
  iconName: 'trash',
  iconSize: 16,
  showIcon: true,
  label: 'Törlés'
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

