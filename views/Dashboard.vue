<script setup lang="ts">
import { computed } from 'vue'
import AdminLayout from '../components/layout/AdminLayout.vue'
import { dashboardRegistry, dashboardUpdateTrigger } from '../lib/DashboardRegistry'

const widgets = computed(() => {
  dashboardUpdateTrigger.value
  return dashboardRegistry.getWidgets()
})
</script>

<template>
  <AdminLayout page-title="Admin Vezérlőpult">
    <div class="space-y-6">
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <component
          :is="widget.component"
          v-for="widget in widgets"
          :key="widget.id"
        />
      </div>

      <p v-if="widgets.length === 0" class="text-sm text-muted-foreground">
        Nincs regisztralt dashboard elem.
      </p>
    </div>
  </AdminLayout>
</template>
