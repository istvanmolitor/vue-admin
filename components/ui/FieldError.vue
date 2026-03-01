<script setup lang="ts">
defineProps<{
  errors?: string | string[] | null
}>()
</script>

<template>
  <div v-if="errors && (Array.isArray(errors) ? errors.length > 0 : true)" class="text-sm font-medium text-destructive mt-1">
    <template v-if="Array.isArray(errors)">
      <p v-for="(error, index) in errors" :key="index">{{ error }}</p>
    </template>
    <p v-else>{{ errors }}</p>
  </div>
</template>

