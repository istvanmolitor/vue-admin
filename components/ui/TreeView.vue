<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '@admin/lib/utils'
import TreeViewNode from './TreeViewNode.vue'

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
  empty(): unknown
}>()

const props = withDefaults(defineProps<{
  items: TreeViewItem[]
  itemKey?: string
  childrenKey?: string
  labelKey?: string
  defaultExpanded?: boolean
  indentSize?: number
  emptyText?: string
  class?: HTMLAttributes['class']
}>(), {
  itemKey: 'id',
  childrenKey: 'children',
  labelKey: 'name',
  defaultExpanded: true,
  indentSize: 20,
  emptyText: 'Nincs megjeleníthető adat.',
})

const expandedKeys = ref<Set<string | number>>(new Set())

const getChildren = (item: TreeViewItem): TreeViewItem[] => {
  const value = item[props.childrenKey]

  if (!Array.isArray(value)) {
    return []
  }

  return value.filter((child): child is TreeViewItem => child !== null && typeof child === 'object')
}

const getItemKey = (item: TreeViewItem, fallbackKey: string): string | number => {
  const value = item[props.itemKey]

  if (typeof value === 'string' || typeof value === 'number') {
    return value
  }

  return fallbackKey
}

const collectExpandableKeys = (
  items: TreeViewItem[],
  parentKey = 'root'
): Array<string | number> => {
  return items.flatMap((item, index) => {
    const itemKey = getItemKey(item, `${parentKey}-${index}`)
    const children = getChildren(item)

    if (children.length === 0) {
      return []
    }

    return [itemKey, ...collectExpandableKeys(children, String(itemKey))]
  })
}

const expandableKeys = computed(() => collectExpandableKeys(props.items))

watch(expandableKeys, (keys) => {
  expandedKeys.value = props.defaultExpanded ? new Set(keys) : new Set()
}, { immediate: true })

const toggleItem = (key: string | number): void => {
  const nextExpandedKeys = new Set(expandedKeys.value)

  if (nextExpandedKeys.has(key)) {
    nextExpandedKeys.delete(key)
  } else {
    nextExpandedKeys.add(key)
  }

  expandedKeys.value = nextExpandedKeys
}
</script>

<template>
  <div
    :class="cn('rounded-xl border bg-card p-2 text-card-foreground shadow', props.class)"
    role="tree"
  >
    <div v-if="items.length > 0" class="space-y-1">
      <TreeViewNode
        v-for="(item, index) in items"
        :key="getItemKey(item, `root-${index}`)"
        :item="item"
        :depth="0"
        :item-key="props.itemKey"
        :children-key="props.childrenKey"
        :label-key="props.labelKey"
        :indent-size="props.indentSize"
        :expanded-keys="expandedKeys"
        @toggle="toggleItem"
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

    <div
      v-else
      class="rounded-lg border border-dashed px-4 py-8 text-center text-sm text-muted-foreground"
    >
      <slot name="empty">
        {{ props.emptyText }}
      </slot>
    </div>
  </div>
</template>

