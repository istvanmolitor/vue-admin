<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  maxWidth?: 'sm' | 'md' | 'lg'
  gradient?: 'blue-purple' | 'indigo-purple' | 'blue-teal' | 'pink-orange'
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'md',
  gradient: 'blue-purple'
})

const maxWidthClasses = computed(() => {
  switch (props.maxWidth) {
    case 'sm':
      return 'max-w-sm'
    case 'md':
      return 'max-w-md'
    case 'lg':
      return 'max-w-lg'
    default:
      return 'max-w-md'
  }
})

const gradientClasses = computed(() => {
  switch (props.gradient) {
    case 'blue-purple':
      return 'from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800'
    case 'indigo-purple':
      return 'from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950'
    case 'blue-teal':
      return 'from-blue-50 to-teal-50 dark:from-gray-900 dark:to-teal-950'
    case 'pink-orange':
      return 'from-pink-50 to-orange-50 dark:from-gray-900 dark:to-pink-950'
    default:
      return 'from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800'
  }
})
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br p-4"
    :class="gradientClasses"
  >
    <div class="w-full shadow-2xl" :class="maxWidthClasses">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Animation for smooth entrance */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

div {
  animation: fadeInUp 0.5s ease-out;
}
</style>

