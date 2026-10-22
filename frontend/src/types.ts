export type RunStatus = 'queued' | 'running' | 'completed' | 'failed'

export interface RunSummaryItem {
  label: string
  value: string
}

export interface MetricsPayload {
  video: {
    duration_seconds: number
    fps: number
    processed_frames: number
    resolution: string
  }
  vehicles: {
    unique_vehicle_count: number
    counts_by_type: Record<string, number>
    average_speed_kph_by_type: Record<string, number>
  }
  congestion: {
    average_visible_vehicles: number
    peak_visible_vehicles: number
    vehicle_flow_per_minute: number
    slow_moving_ratio: number
  }
  road_damage: {
    total_detections: number
    counts_by_type: Record<string, number>
    severity_breakdown: Record<string, number>
    persistence_ratio: number
    severity_score: number
    dominant_damage_type: string
  }
  emissions: {
    total_kg_co2: number
    kg_co2_by_type: Record<string, number>
    dominant_vehicle_class: string
    hotspot: boolean
  }
}

export interface RecommendationBlock {
  priority: 'Low' | 'Medium' | 'High'
  score: number
  reasons: string[]
}

export interface RecommendationsPayload {
  road_expansion: RecommendationBlock
  maintenance: RecommendationBlock
  environment: RecommendationBlock
}

export interface RunRead {
  id: string
  original_filename: string
  status: RunStatus
  progress: number
  progress_message: string
  error_message: string | null
  output_video_url: string | null
  report_url: string | null
  metrics: MetricsPayload | null
  recommendations: RecommendationsPayload | null
  summary: RunSummaryItem[] | null
  created_at: string
  updated_at: string
  started_at: string | null
  completed_at: string | null
}

export interface RunListItem {
  id: string
  original_filename: string
  status: RunStatus
  progress: number
  progress_message: string
  created_at: string
  updated_at: string
}

export interface HealthResponse {
  status: string
  app_name: string
}
