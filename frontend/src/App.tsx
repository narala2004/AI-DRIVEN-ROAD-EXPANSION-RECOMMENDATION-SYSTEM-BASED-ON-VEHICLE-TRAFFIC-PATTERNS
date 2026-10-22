import {
  startTransition,
  useEffect,
  useEffectEvent,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Database,
  FileUp,
  Flame,
  Gauge,
  PlayCircle,
  Radar,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrafficCone,
} from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import './App.css'
import { API_ORIGIN, fetchHealth, fetchRun, fetchRuns, toAbsoluteAssetUrl, uploadRun } from './lib/api'
import type { HealthResponse, RunListItem, RunRead } from './types'

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: 'easeOut' as const },
} as const

const chartPalette = ['#6ee7f9', '#f7a86c', '#8de5b6', '#f57474', '#b5a4ff']

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null)
  const [runs, setRuns] = useState<RunListItem[]>([])
  const [activeRun, setActiveRun] = useState<RunRead | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [bootError, setBootError] = useState<string | null>(null)

  const refreshRuns = useEffectEvent(async (runId?: string) => {
    const [healthData, runsData] = await Promise.all([fetchHealth(), fetchRuns()])
    startTransition(() => {
      setHealth(healthData)
      setRuns(runsData)
    })

    const nextRunId = runId ?? activeRun?.id ?? runsData[0]?.id
    if (nextRunId) {
      const latestRun = await fetchRun(nextRunId)
      startTransition(() => setActiveRun(latestRun))
    }
  })

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        await refreshRuns()
      } catch (error) {
        if (!alive) return
        setBootError(error instanceof Error ? error.message : 'Unable to load the local API.')
      }
    })()
    return () => {
      alive = false
    }
  }, [refreshRuns])

  const pollActiveRun = useEffectEvent(async () => {
    if (!activeRun?.id) return
    const latest = await fetchRun(activeRun.id)
    startTransition(() => setActiveRun(latest))
    if (latest.status === 'completed' || latest.status === 'failed') {
      const latestRuns = await fetchRuns()
      startTransition(() => setRuns(latestRuns))
    }
  })

  useEffect(() => {
    if (!activeRun?.id) return
    if (activeRun.status !== 'queued' && activeRun.status !== 'running') return
    const timer = window.setInterval(() => {
      void pollActiveRun()
    }, 2200)
    return () => window.clearInterval(timer)
  }, [activeRun?.id, activeRun?.status, pollActiveRun])

  async function handleUpload() {
    if (!selectedFile) return
    setIsUploading(true)
    setBootError(null)
    try {
      const createdRun = await uploadRun(selectedFile)
      startTransition(() => {
        setActiveRun(createdRun)
        setSelectedFile(null)
      })
      await refreshRuns(createdRun.id)
    } catch (error) {
      setBootError(error instanceof Error ? error.message : 'Upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  const vehicleChartData = activeRun?.metrics
    ? Object.entries(activeRun.metrics.vehicles.counts_by_type).map(([name, value]) => ({
        name: titleize(name),
        value,
      }))
    : []

  const emissionChartData = activeRun?.metrics
    ? Object.entries(activeRun.metrics.emissions.kg_co2_by_type).map(([name, value]) => ({
        name: titleize(name),
        value,
      }))
    : []

  const damageChartData = activeRun?.metrics
    ? Object.entries(activeRun.metrics.road_damage.counts_by_type).map(([name, value]) => ({
        name: titleize(name),
        value,
      }))
    : []

  const isBusy = activeRun?.status === 'queued' || activeRun?.status === 'running'

  return (
    <div className="shell">
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />

      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <Radar size={20} />
          </div>
          <div>
            <p className="eyebrow">AI Traffic Intelligence</p>
            <h1>Road Intelligence Hub</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="status-pill">
            <ShieldCheck size={16} />
            {health?.status === 'ok' ? 'Local API Ready' : 'Connecting'}
          </span>
          <button className="ghost-button" onClick={() => void refreshRuns(activeRun?.id)}>
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </header>

      <main className="app-grid">
        <motion.section className="hero-panel glass-card" {...reveal}>
          <div className="hero-copy">
            <span className="hero-badge">
              <Sparkles size={16} />
              Local-first analysis with pretrained AI models
            </span>
            <h2>
              Upload traffic footage and turn it into expansion, maintenance,
              and emission insights.
            </h2>
            <p>
              The backend runs YOLOv8 detection, ResNet-50 vehicle
              classification, Deep SORT tracking, Roboflow road-damage
              inference, and SQLite-backed run history through one local app.
            </p>
            <div className="hero-actions">
              <button
                className="primary-button"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
              >
                <PlayCircle size={18} />
                {isUploading ? 'Starting analysis...' : 'Analyze selected video'}
              </button>
              <span className="helper-copy">
                Backend: <strong>{API_ORIGIN}</strong>
              </span>
            </div>
          </div>

          <div className="hero-stats">
            <StatCard icon={<Gauge size={20} />} label="Runs tracked" value={String(runs.length)} />
            <StatCard
              icon={<Database size={20} />}
              label="Storage"
              value="SQLite"
            />
            <StatCard
              icon={<TrafficCone size={20} />}
              label="Core stack"
              value="YOLOv8 + Deep SORT"
            />
            <StatCard
              icon={<Flame size={20} />}
              label="Emission layer"
              value="Per-vehicle CO2"
            />
          </div>
        </motion.section>

        <motion.section className="upload-panel glass-card" {...reveal}>
          <div className="panel-head">
            <div>
              <p className="eyebrow">Run Analysis</p>
              <h3>Local video upload</h3>
            </div>
            <FileUp size={20} />
          </div>

          <label className="upload-dropzone">
            <input
              type="file"
              accept="video/*"
              onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
            />
            <div className="dropzone-icon">
              <ArrowRight size={22} />
            </div>
            <div>
              <strong>{selectedFile ? selectedFile.name : 'Choose a traffic video'}</strong>
              <p>
                Upload a local `mp4`, `mov`, or similar video file. The app will
                generate an annotated output and a recommendation report.
              </p>
            </div>
          </label>

          <div className="feature-list">
            <FeaturePill icon={<BarChart3 size={16} />} text="Congestion scoring" />
            <FeaturePill icon={<AlertTriangle size={16} />} text="Crack & pothole checks" />
            <FeaturePill icon={<Flame size={16} />} text="CO2 estimation" />
          </div>

          {bootError ? <p className="error-banner">{bootError}</p> : null}
        </motion.section>

        <motion.section className="runs-panel glass-card" {...reveal}>
          <div className="panel-head">
            <div>
              <p className="eyebrow">History</p>
              <h3>Recent runs</h3>
            </div>
            <button className="ghost-button" onClick={() => void refreshRuns(activeRun?.id)}>
              <RefreshCw size={16} />
              Sync
            </button>
          </div>

          <div className="run-list">
            {runs.length === 0 ? (
              <div className="empty-state">
                <p>No analyses have been started yet.</p>
              </div>
            ) : (
              runs.map((run) => (
                <button
                  key={run.id}
                  className={`run-row ${activeRun?.id === run.id ? 'active' : ''}`}
                  onClick={async () => {
                    const fresh = await fetchRun(run.id)
                    startTransition(() => setActiveRun(fresh))
                  }}
                >
                  <div>
                    <strong>{run.original_filename}</strong>
                    <p>{formatTimestamp(run.created_at)}</p>
                  </div>
                  <span className={`run-badge run-${run.status}`}>{run.status}</span>
                </button>
              ))
            )}
          </div>
        </motion.section>

        <motion.section className="results-panel glass-card" {...reveal}>
          <div className="panel-head">
            <div>
              <p className="eyebrow">Analysis Output</p>
              <h3>{activeRun ? activeRun.original_filename : 'Awaiting a run'}</h3>
            </div>
            {activeRun ? (
              <span className={`run-badge run-${activeRun.status}`}>{activeRun.status}</span>
            ) : null}
          </div>

          {!activeRun ? (
            <div className="empty-state large">
              <p>Select or upload a video to start the end-to-end pipeline.</p>
            </div>
          ) : (
            <>
              <div className="progress-shell">
                <div className="progress-topline">
                  <span>{activeRun.progress_message}</span>
                  <strong>{Math.round(activeRun.progress * 100)}%</strong>
                </div>
                <div className="progress-track">
                  <motion.div
                    className="progress-fill"
                    animate={{ width: `${Math.max(4, activeRun.progress * 100)}%` }}
                    transition={{ duration: 0.55, ease: 'easeOut' }}
                  />
                </div>
                {activeRun.error_message ? (
                  <p className="error-banner">{activeRun.error_message}</p>
                ) : null}
              </div>

              <div className="summary-grid">
                {(activeRun.summary ?? []).map((item, index) => (
                  <motion.article
                    className="summary-card"
                    key={`${item.label}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </motion.article>
                ))}
              </div>

              {activeRun.recommendations ? (
                <div className="recommendation-grid">
                  <RecommendationCard
                    title="Road Expansion"
                    icon={<TrafficCone size={18} />}
                    block={activeRun.recommendations.road_expansion}
                  />
                  <RecommendationCard
                    title="Maintenance"
                    icon={<AlertTriangle size={18} />}
                    block={activeRun.recommendations.maintenance}
                  />
                  <RecommendationCard
                    title="Environment"
                    icon={<Flame size={18} />}
                    block={activeRun.recommendations.environment}
                  />
                </div>
              ) : null}

              {activeRun.metrics ? (
                <div className="chart-grid">
                  <ChartCard title="Vehicle mix">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={vehicleChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="name" stroke="#93a6c0" tickLine={false} axisLine={false} />
                        <YAxis stroke="#93a6c0" tickLine={false} axisLine={false} />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                          {vehicleChartData.map((entry, index) => (
                            <Cell key={entry.name} fill={chartPalette[index % chartPalette.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <ChartCard title="Damage distribution">
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={damageChartData.length ? damageChartData : [{ name: 'No damage', value: 1 }]}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={55}
                          outerRadius={90}
                          paddingAngle={4}
                        >
                          {(damageChartData.length ? damageChartData : [{ name: 'No damage', value: 1 }]).map(
                            (entry, index) => (
                              <Cell key={entry.name} fill={chartPalette[index % chartPalette.length]} />
                            ),
                          )}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartCard>

                  <ChartCard title="Emission profile">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={emissionChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="name" stroke="#93a6c0" tickLine={false} axisLine={false} />
                        <YAxis stroke="#93a6c0" tickLine={false} axisLine={false} />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                          {emissionChartData.map((entry, index) => (
                            <Cell key={entry.name} fill={chartPalette[index % chartPalette.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartCard>
                </div>
              ) : null}

              {activeRun.output_video_url ? (
                <div className="media-card">
                  <div className="media-head">
                    <div>
                      <p className="eyebrow">Annotated Playback</p>
                      <h3>Rendered result</h3>
                    </div>
                    {activeRun.report_url ? (
                      <a
                        className="ghost-button"
                        href={toAbsoluteAssetUrl(activeRun.report_url) ?? undefined}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View JSON report
                      </a>
                    ) : null}
                  </div>
                  <video
                    className="result-video"
                    controls
                    src={toAbsoluteAssetUrl(activeRun.output_video_url) ?? undefined}
                  />
                </div>
              ) : !isBusy ? (
                <div className="empty-state">
                  <p>The run has not produced an output video yet.</p>
                </div>
              ) : null}
            </>
          )}
        </motion.section>
      </main>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <motion.article
      className="stat-card"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="stat-icon">{icon}</div>
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.article>
  )
}

function FeaturePill({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="feature-pill">
      {icon}
      {text}
    </span>
  )
}

function RecommendationCard({
  title,
  icon,
  block,
}: {
  title: string
  icon: ReactNode
  block: {
    priority: 'Low' | 'Medium' | 'High'
    score: number
    reasons: string[]
  }
}) {
  return (
    <motion.article className="recommendation-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
      <div className="recommendation-head">
        <div className="recommendation-icon">{icon}</div>
        <div>
          <span className="eyebrow compact">{title}</span>
          <h4>{block.priority} priority</h4>
        </div>
        <strong className="score-badge">{block.score}</strong>
      </div>
      <ul>
        {block.reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </motion.article>
  )
}

function ChartCard({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <article className="chart-card">
      <div className="panel-head tight">
        <h3>{title}</h3>
      </div>
      {children}
    </article>
  )
}

function titleize(value: string) {
  return value
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')
}

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString()
}

export default App
