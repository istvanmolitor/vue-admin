<script setup lang="ts">
import { computed } from 'vue'
import Button from './button/Button.vue'
import Icon from './Icon.vue'

defineOptions({
  name: 'TreeViewNode',
})

type TreeViewItem = Record<string, unknown>

defineSlots<{
  item(props: {
    item: TreeViewItem
    depth: number
    hasChildren: boolean
    expanded: boolean
  }): unknown
  actions(props: {
    item: TreeViewItem
    depth: number
    hasChildren: boolean
    expanded: boolean
  }): unknown
}>()

const props = withDefaults(defineProps<{
  item: TreeViewItem
  depth: number
  itemKey: string
  childrenKey: string
  labelKey: string
  indentSize: number
  expandedKeys: Set<string | number>
}>(), {
  depth: 0,
  indentSize: 20,
})

const emit = defineEmits<{
  (e: 'toggle', key: string | number): void
}>()

const itemKeyValue = computed<string | number>(() => {
  const value = props.item[props.itemKey]

  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }

  return `${props.depth}-${String(props.item[props.labelKey] ?? 'item')}`
})

const children = computed<TreeViewItem[]>(() => {
  const value = props.item[props.childrenKey]

  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((child): child is TreeViewItem => child !== null && typeof child === 'object')
})

const hasChildren = computed<boolean>(() => children.value.length > 0)

const isExpanded = computed<boolean>(() => {
  return hasChildren.value && props.expandedKeys.has(itemKeyValue.value)
})

const toggleNode = (): void => {
  if (!hasChildren.value) {
    return
  }

  emit('toggle', itemKeyValue.value)
}

const getChildKey = (child: TreeViewItem, index: number): string | number => {
  const value = child[props.itemKey]

  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }

  return `${itemKeyValue.value}-${index}`
}
</script>

<template>
  <div class="space-y-1" role="none">
    <div
      class="group flex items-center justify-between gap-3 rounded-lg px-3 py-2 hover:bg-muted/40"
      role="treeitem"
      :aria-expanded="hasChildren ? isExpanded : undefined"
    >
      <div
        class="flex min-w-0 flex-1 items-center gap-2"
        :style="{ paddingLeft: `${props.depth * props.indentSize}px` }"
      >
        <Button
          v-if="hasChildren"
          type="button"
          variant="ghost"
          size="icon-sm"
          class="-ml-1 text-muted-foreground"
          :aria-expanded="isExpanded"
          @click="toggleNode"
        >
          <Icon :name="isExpanded ? 'chevron-down' : 'chevron-right'" class="h-4 w-4" />
        </Button>

        <span v-else class="inline-block size-8 shrink-0" />

        <Icon
          :name="hasChildren ? 'folder' : 'box'"
          class="h-4 w-4 shrink-0 text-muted-foreground"
        />

        <div class="min-w-0 flex-1">
          <slot
            name="item"
            :item="props.item"
            :depth="props.depth"
            :has-children="hasChildren"
            :expanded="isExpanded"
          >
            <span class="truncate text-sm font-medium">
              {{ props.item[props.labelKey] ?? '—' }}
            </span>
          </slot>
        </div>
      </div>

      <div v-if="$slots.actions" class="flex shrink-0 items-center gap-2">
        <slot
          name="actions"
          :item="props.item"
          :depth="props.depth"
          :has-children="hasChildren"
          :expanded="isExpanded"
        />
      </div>
    </div>

    <div v-if="hasChildren && isExpanded" class="space-y-1" role="group">
      <TreeViewNode
        v-for="(child, index) in children"
        :key="getChildKey(child, index)"
        :item="child"
        :depth="props.depth + 1"
        :item-key="props.itemKey"
        :children-key="props.childrenKey"
        :label-key="props.labelKey"
        :indent-size="props.indentSize"
        :expanded-keys="props.expandedKeys"
        @toggle="emit('toggle', $event)"
      >
        <template #item="slotProps">
          <slot name="item" v-bind="slotProps">
            <span class="truncate text-sm font-medium">
              {{ slotProps.item[props.labelKey] ?? '—' }}
            </span>
          </slot>
        </template>

        <template #actions="slotProps">
          <slot name="actions" v-bind="slotProps" />
        </template>
      </TreeViewNode>
    </div>
  </div>
</template>

