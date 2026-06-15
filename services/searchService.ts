import { createApiClient } from '@user/services/apiClient'

const api = createApiClient()

export interface SearchResult {
  type: string
  type_label: string
  id: number
  title: string
  subtitle: string | null
  url: string
}

export interface SearchResponse {
  data: SearchResult[]
  query: string
}

export async function search(q: string): Promise<SearchResponse> {
  const response = await api.get<SearchResponse>('/api/admin/search', { params: { q } })
  return response.data
}
