# Admin Package - Frontend

Vue 3 + TypeScript komponensek az admin felülethez.

## Komponensek

### DataTable
Általános, újrafelhasználható táblázat komponens szűréssel, rendezéssel és lapozással.

**Használat:**
```vue
<script setup lang="ts">
import DataTable, { type Column, type PaginationMeta } from '@admin/components/DataTable.vue'

const columns: Column<YourType>[] = [
  { key: 'id', label: 'ID', sortable: true, width: '80px' },
  { key: 'name', label: 'Név', sortable: true },
]

const data = ref<YourType[]>([])
const pagination = ref<PaginationMeta>({
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0
})

const fetchData = async (params) => {
  // API hívás
}
</script>

<template>
  <DataTable
    :columns="columns"
    :data="data"
    :pagination="pagination"
    :searchable="true"
    @fetch="fetchData"
  >
    <template #actions>
      <Button>Új elem</Button>
    </template>
    
    <template #row-actions="{ row }">
      <Button @click="edit(row.id)">Szerkesztés</Button>
    </template>
  </DataTable>
</template>
```

### SearchInput
Keresés beviteli mező debounce-zal.

**Használat:**
```vue
<SearchInput
  v-model="searchQuery"
  placeholder="Keresés..."
  :debounce="300"
  @search="handleSearch"
/>
```

### TablePagination
Lapozó komponens intelligens oldal számozással.

**Használat:**
```vue
<TablePagination
  :current-page="currentPage"
  :total-pages="totalPages"
  :total="total"
  :per-page="perPage"
  @page-change="handlePageChange"
/>
```

## UI Komponensek

- `Button.vue` - Gomb komponens
- `Card.vue` - Kártya konténer
- `Input.vue` - Input mező
- `Textarea.vue` - Többsoros szövegmező
- `Checkbox.vue` - Jelölőnégyzet

## Elrendezés

- `DashboardLayout.vue` - Fő admin elrendezés
- `AuthLayout.vue` - Elrendezés kis űrlapokhoz (login, register, stb.)

### AuthLayout
Központosított elrendezés autentikációs oldalakhoz és kis űrlapokhoz.

**Használat:**
```vue
<script setup lang="ts">
import { AuthLayout } from '@admin'
import Card from '@admin/components/ui/Card.vue'
</script>

<template>
  <AuthLayout max-width="md" gradient="blue-purple">
    <Card>
      <!-- Űrlap tartalma -->
    </Card>
  </AuthLayout>
</template>
```

**Props:**
- `maxWidth` - A tartalom maximális szélessége: `'sm'` | `'md'` | `'lg'` (alapértelmezett: `'md'`)
- `gradient` - A háttér színátmenet: `'blue-purple'` | `'indigo-purple'` | `'blue-teal'` | `'pink-orange'` (alapértelmezett: `'blue-purple'`)

Részletesebb dokumentáció: `/DATA_TABLE_IMPLEMENTATION.md`
