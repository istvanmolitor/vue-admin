<script setup lang="ts">
import { computed } from 'vue'
import * as LucideIcons from 'lucide-vue-next'

const props = defineProps<{
  name: string | any
  class?: string
  color?: string
  size?: number | string
  strokeWidth?: number | string
}>()

const iconAliases: Record<string, string> = {
  create: 'Plus',
  edit: 'Pencil',
  delete: 'Trash2',
  trash: 'Trash2',
  save: 'Save',
  cancel: 'X',
  close: 'X',
  back: 'ArrowLeft',
  refresh: 'RefreshCcw',
  search: 'Search',
  user: 'User',
  settings: 'Settings',
  help: 'HelpCircle',
  loading: 'Loader2',
  info: 'Info',
  home: 'Home',
  folder: 'Folder',
  upload: 'Upload',
  download: 'Download',
  plus: 'Plus',
  menu: 'Menu',
  bell: 'Bell',
  'chevron-down': 'ChevronDown',
  'chevron-right': 'ChevronRight',
  'chevron-up': 'ChevronUp',
  'chevron-left': 'ChevronLeft',
  eye: 'Eye',
  'arrow-up': 'ArrowUp',
  'arrow-down': 'ArrowDown',
  'arrow-up-down': 'ArrowUpDown',
}

const icon = computed(() => {
  if (typeof props.name !== 'string') return props.name
  let iconName = props.name
  iconName = iconAliases[iconName] ?? iconName
  const iconComponent = (LucideIcons as Record<string, any>)[iconName]
  if (!iconComponent) {
    console.warn(`Icon "${iconName}" not found in lucide-vue-next`)
    return LucideIcons.HelpCircle
  }
  return iconComponent
})
</script>

<template>
  <component
    :is="icon"
    :class="props.class"
    :color="props.color"
    :size="props.size"
    :stroke-width="props.strokeWidth"
  />
</template>

