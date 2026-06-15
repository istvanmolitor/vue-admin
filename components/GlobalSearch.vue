<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Icon from './ui/Icon.vue'
import { search, type SearchResult } from '../services/searchService'

const router = useRouter()

const query = ref('')
const results = ref<SearchResult[]>([])
const loading = ref(false)
const open = ref(false)
const focusedIndex = ref(-1)
const inputRef = ref<HTMLInputElement | null>(null)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(query, (val) => {
  focusedIndex.value = -1
  if (debounceTimer) clearTimeout(debounceTimer)
  if (val.trim().length < 2) {
    results.value = []
    open.value = false
    return
  }
  debounceTimer = setTimeout(async () => {
    loading.value = true
    try {
      const res = await search(val.trim())
      results.value = res.data
      open.value = true
    } finally {
      loading.value = false
    }
  }, 300)
})

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    focusedIndex.value = Math.min(focusedIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    focusedIndex.value = Math.max(focusedIndex.value - 1, -1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (focusedIndex.value >= 0 && results.value[focusedIndex.value]) {
      navigate(results.value[focusedIndex.value])
    } else if (query.value.trim().length >= 2) {
      goToSearchPage()
    }
  } else if (e.key === 'Escape') {
    close()
  }
}

function navigate(result: SearchResult) {
  router.push(result.url)
  close()
}

function goToSearchPage() {
  router.push({ name: 'admin.search', query: { q: query.value.trim() } })
  close()
}

function close() {
  open.value = false
  focusedIndex.value = -1
  query.value = ''
  results.value = []
}

function onGlobalKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    inputRef.value?.focus()
    open.value = results.value.length > 0
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKeydown))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKeydown))

const groupedResults = () => {
  const groups: Record<string, SearchResult[]> = {}
  for (const r of results.value) {
    if (!groups[r.type]) groups[r.type] = []
    groups[r.type].push(r)
  }
  return groups
}

let flatIndex = 0
function getResultIndex(type: string, localIdx: number): number {
  const groups = groupedResults()
  let idx = 0
  for (const [t, items] of Object.entries(groups)) {
    if (t === type) return idx + localIdx
    idx += items.length
  }
  return idx + localIdx
}
</script>

<template>
  <div class="relative hidden sm:block">
    <Icon
      name="Search"
      class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
    />
    <input
      ref="inputRef"
      v-model="query"
      type="text"
      placeholder="Keresés... (Ctrl+K)"
      class="h-9 w-64 rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      @keydown="onKeydown"
      @focus="open = results.length > 0"
    />
    <Icon
      v-if="loading"
      name="Loader"
      class="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin"
    />

    <!-- Dropdown -->
    <div
      v-if="open && results.length > 0"
      class="absolute left-0 top-full mt-1 w-80 rounded-lg border border-border bg-card shadow-lg z-50 overflow-hidden"
    >
      <template v-for="(items, type) in groupedResults()" :key="type">
        <div class="px-3 py-1.5 text-xs font-semibold text-muted-foreground bg-muted/50 uppercase tracking-wide">
          {{ items[0].type_label }}
        </div>
        <button
          v-for="(result, idx) in items"
          :key="result.id"
          class="flex w-full items-center gap-3 px-3 py-2 text-sm text-left hover:bg-muted transition-colors"
          :class="{ 'bg-muted': getResultIndex(type as string, idx) === focusedIndex }"
          @click="navigate(result)"
          @mouseenter="focusedIndex = getResultIndex(type as string, idx)"
        >
          <Icon
            :name="type === 'user' ? 'User' : 'FileText'"
            class="h-4 w-4 shrink-0 text-muted-foreground"
          />
          <div class="min-w-0">
            <div class="truncate font-medium text-foreground">{{ result.title }}</div>
            <div v-if="result.subtitle" class="truncate text-xs text-muted-foreground">{{ result.subtitle }}</div>
          </div>
        </button>
      </template>

      <button
        class="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors border-t border-border"
        @click="goToSearchPage"
      >
        <Icon name="Search" class="h-4 w-4" />
        Összes találat megtekintése
      </button>
    </div>

    <!-- Backdrop -->
    <div v-if="open" class="fixed inset-0 z-40" @click="close" />
  </div>
</template>
