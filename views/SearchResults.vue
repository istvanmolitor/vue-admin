<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '../components/layout/AdminLayout.vue'
import Icon from '../components/ui/Icon.vue'
import { search, type SearchResult } from '../services/searchService'

const route = useRoute()
const router = useRouter()

const query = ref((route.query.q as string) ?? '')
const inputQuery = ref(query.value)
const results = ref<SearchResult[]>([])
const loading = ref(false)
const searched = ref(false)

const groupedResults = computed(() => {
  const groups: Record<string, { label: string; items: SearchResult[] }> = {}
  for (const r of results.value) {
    if (!groups[r.type]) groups[r.type] = { label: r.type_label, items: [] }
    groups[r.type].items.push(r)
  }
  return groups
})

async function doSearch(q: string) {
  if (q.trim().length < 2) return
  loading.value = true
  searched.value = false
  try {
    const res = await search(q.trim())
    results.value = res.data
  } finally {
    loading.value = false
    searched.value = true
  }
}

watch(
  () => route.query.q as string,
  (q) => {
    query.value = q ?? ''
    inputQuery.value = q ?? ''
    doSearch(q ?? '')
  },
  { immediate: true }
)

function onSubmit() {
  router.push({ name: 'admin.search', query: { q: inputQuery.value.trim() } })
}

const typeIcon: Record<string, string> = {
  user: 'User',
  post: 'FileText',
}
</script>

<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 class="text-2xl font-bold tracking-tight">Keresési találatok</h1>

        <form class="flex items-center gap-2" @submit.prevent="onSubmit">
          <div class="relative">
            <Icon
              name="Search"
              class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
            />
            <input
              v-model="inputQuery"
              type="text"
              placeholder="Keresés..."
              class="h-9 w-72 rounded-lg border border-border bg-background pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            class="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Keresés
          </button>
        </form>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center gap-2 text-muted-foreground text-sm">
        <Icon name="Loader" class="h-4 w-4 animate-spin" />
        Keresés folyamatban...
      </div>

      <!-- Results -->
      <template v-else-if="searched">
        <p v-if="results.length === 0" class="text-muted-foreground text-sm">
          Nem találtunk eredményt a(z) <strong>„{{ query }}"</strong> keresésre.
        </p>

        <template v-else>
          <p class="text-sm text-muted-foreground">
            {{ results.length }} találat a(z) <strong>„{{ query }}"</strong> keresésre:
          </p>

          <div
            v-for="(group, type) in groupedResults"
            :key="type"
            class="rounded-lg border border-border overflow-hidden"
          >
            <div class="px-4 py-2 bg-muted/50 flex items-center gap-2">
              <Icon :name="typeIcon[type] ?? 'File'" class="h-4 w-4 text-muted-foreground" />
              <span class="text-sm font-semibold text-foreground">{{ group.label }}</span>
              <span class="ml-auto text-xs text-muted-foreground">{{ group.items.length }} találat</span>
            </div>
            <div class="divide-y divide-border">
              <a
                v-for="result in group.items"
                :key="result.id"
                :href="result.url"
                class="flex items-center gap-3 px-4 py-3 hover:bg-muted transition-colors"
                @click.prevent="$router.push(result.url)"
              >
                <Icon :name="typeIcon[type] ?? 'File'" class="h-5 w-5 shrink-0 text-muted-foreground" />
                <div class="min-w-0">
                  <div class="font-medium text-foreground truncate">{{ result.title }}</div>
                  <div v-if="result.subtitle" class="text-sm text-muted-foreground truncate">{{ result.subtitle }}</div>
                </div>
                <Icon name="ChevronRight" class="ml-auto h-4 w-4 text-muted-foreground shrink-0" />
              </a>
            </div>
          </div>
        </template>
      </template>
    </div>
  </AdminLayout>
</template>
