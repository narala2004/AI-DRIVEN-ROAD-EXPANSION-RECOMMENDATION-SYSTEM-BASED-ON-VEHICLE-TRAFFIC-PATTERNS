import axios from 'axios'

import type { HealthResponse, RunListItem, RunRead } from '../types'

export const API_ORIGIN =
  import.meta.env.VITE_API_ORIGIN?.toString() ?? 'http://localhost:8000'

const api = axios.create({
  baseURL: API_ORIGIN,
  timeout: 60_000,
})

export function toAbsoluteAssetUrl(url: string | null) {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `${API_ORIGIN}${url}`
}

export async function fetchHealth() {
  const { data } = await api.get<HealthResponse>('/api/health')
  return data
}

export async function fetchRuns() {
  const { data } = await api.get<RunListItem[]>('/api/runs')
  return data
}

export async function fetchRun(runId: string) {
  const { data } = await api.get<RunRead>(`/api/runs/${runId}`)
  return data
}

export async function uploadRun(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await api.post<RunRead>('/api/runs', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}
