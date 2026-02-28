<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'

interface Props {
  isSaving?: boolean
  label?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  isSaving: false,
  label: 'Mentés',
  disabled: false,
  type: 'submit'
})

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <Button
    :type="type"
    variant="primary"
    :disabled="isSaving || disabled"
    @click="$emit('click')"
  >
    <Icon
      :name="isSaving ? 'loading' : 'save'"
      :size="16"
      :class="['mr-2', isSaving ? 'animate-spin' : '']"
    />
    {{ isSaving ? `${label}...` : label }}
  </Button>
</template>
