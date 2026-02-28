<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'

interface Props {
  label?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Mégse',
  disabled: false,
  type: 'button'
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <Button
    :type="type"
    variant="outline"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <Icon name="cancel" :size="16" class="mr-2" />
    {{ label }}
  </Button>
</template>
