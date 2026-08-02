<script setup lang="ts">
import { computed, defineAsyncComponent, type Component } from 'vue'

// Per-icon dynamic imports keep only the icons actually rendered in the
// bundle, instead of pulling in the whole lucide-vue-next icon set. The
// name-to-file map is loaded lazily too, so it ships as its own chunk
// rather than bloating the shared app bundle.
const iconModules = import.meta.glob(
  '../../../../../../node_modules/lucide-vue-next/dist/esm/icons/*.js',
  { import: 'default' }
) as Record<string, () => Promise<Component>>

const iconLoaderByFile = new Map<string, () => Promise<Component>>()
for (const [path, loader] of Object.entries(iconModules)) {
  iconLoaderByFile.set(path.split('/').pop()!, loader)
}

const iconMapPromise: Promise<Record<string, string>> = import('../../lib/lucide-icon-map.json').then(
  (m) => (m as { default: Record<string, string> }).default
)

const asyncIconCache = new Map<string, Component>()

const loadIcon = (name: string): Component => {
  const cached = asyncIconCache.get(name)
  if (cached) {
    return cached
  }

  const component = defineAsyncComponent(async () => {
    const map = await iconMapPromise
    const file = map[name]
    if (!file) {
      console.warn(`Icon "${name}" not found in lucide-vue-next`)
    }
    const loader = (file && iconLoaderByFile.get(file)) || iconLoaderByFile.get(map.HelpCircle)!
    return loader()
  })

  asyncIconCache.set(name, component)
  return component
}

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
  show: 'Eye',
  'grip-vertical': 'GripVertical',
  'move-up': 'ChevronUp',
  'move-down': 'ChevronDown',
  heading: 'Heading',
  quote: 'Quote',
  list: 'List',
  type: 'Type',
  box: 'Box',
  image: 'Image',
  video: 'Video',
  code: 'Code',
  columns: 'Columns',
  'arrow-up': 'ArrowUp',
  'arrow-down': 'ArrowDown',
  'arrow-up-down': 'ArrowUpDown',
  lock: 'Lock',
  pilcrow: 'Pilcrow',
  'gallery-thumbnails': 'GalleryThumbnails',
  layout: 'Layout',
  'layout-template': 'LayoutTemplate',
  newspaper: 'Newspaper',
  check: 'Check',
}

const icon = computed(() => {
  if (typeof props.name !== 'string') return props.name
  const iconName = iconAliases[props.name] ?? props.name
  return loadIcon(iconName)
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

