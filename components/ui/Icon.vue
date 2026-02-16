<script setup lang="ts">
import { computed } from 'vue'
import {
  Plus,
  Save,
  X,
  Upload,
  Loader2,
  Key,
  Mail,
  RefreshCw,
  Lock,
  PenLine,
  LogOut,
  Users,
  Trash2,
  Type,
  Heading1,
  Image,
  Video,
  Code,
  Quote,
  List,
  Settings,
  GripVertical,
  MoveUp,
  MoveDown,
  Eye,
  type LucideIcon
} from 'lucide-vue-next'

interface IconProps {
  name: string
  size?: number
  class?: string | string[]
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 16,
  class: ''
})

const iconMap: Record<string, LucideIcon> = {
  plus: Plus,
  save: Save,
  x: X,
  upload: Upload,
  loader: Loader2,
  key: Key,
  mail: Mail,
  refresh: RefreshCw,
  lock: Lock,
  'pen-line': PenLine,
  logout: LogOut,
  users: Users,
  trash: Trash2,
  type: Type,
  heading: Heading1,
  image: Image,
  video: Video,
  code: Code,
  quote: Quote,
  list: List,
  settings: Settings,
  'grip-vertical': GripVertical,
  'move-up': MoveUp,
  'move-down': MoveDown,
  eye: Eye,
}

const iconComponent = computed(() => {
  return iconMap[props.name] || Plus
})

// Check if class contains Tailwind width/height utilities
const hasClassSize = computed(() => {
  const classString = Array.isArray(props.class) ? props.class.join(' ') : props.class
  return /\b(w-\d+|h-\d+)\b/.test(classString)
})
</script>

<template>
  <component
    :is="iconComponent"
    v-bind="hasClassSize ? { class: props.class } : { size: props.size, class: props.class }"
  />
</template>



