<script setup lang="ts">

import Icon from './Icon.vue'

interface IconButtonProps {
  icon: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  class?: string
  disabled?: boolean
  iconClass?: string
  iconSize?: number
}

const props = withDefaults(defineProps<IconButtonProps>(), {
  variant: 'ghost',
  size: 'icon',
  disabled: false
})


</script>

<template>
  <button
    :disabled="disabled"
  >
    <Icon :name="icon" :size="iconSize" :class="iconClass" />
  </button>
</template>

