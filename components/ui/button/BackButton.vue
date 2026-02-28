<script setup lang="ts">
import Button from './Button.vue'
import Icon from '../Icon.vue'
import { useRouter } from 'vue-router'

interface Props {
  label?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  to?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Vissza',
  disabled: false,
  type: 'button',
  variant: 'outline'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()

const router = useRouter()

const handleClick = () => {
  if (props.to) {
    router.push(props.to)
  } else {
    emit('click')
  }
}
</script>

<template>
  <Button
    :type="type"
    :variant="variant"
    :disabled="disabled"
    @click="handleClick"
  >
    <Icon name="back" :size="16" class="mr-2" />
    {{ label }}
  </Button>
</template>
