import { useEffect, useState } from 'react'

export interface Activity {
  _id?: string
  type?: string
  userId?: string | { name?: string }
  teamId?: string | { name?: string }
  durationMinutes?: number
  caloriesBurned?: number
  createdAt?: string
}

const buildEndpoint = (subPath: string) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const baseHost = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000'
  return `https://${baseHost}/api/${subPath}/`
}

const fetchJson = async <T,>(url: string): Promise<T> => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
  return response.json()
}

const normalizeResults = <T,>(data: any): T[] => {
  if (Array.isArray(data)) return data
  if (data?.data && Array.isArray(data.data)) return data.data
  if (data?.results && Array.isArray(data.results)) return data.results
  return []
}

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('activities')

    fetchJson<any>(url)
      .then((result) => {
        setActivities(normalizeResults<Activity>(result))
      })
      .catch((fetchError) => {
        setError(String(fetchError))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <p>
        Backend API endpoint: <code>{buildEndpoint('activities')}</code>
      </p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error">Error loading activities: {error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities found.</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id ?? `${activity.type}-${activity.createdAt ?? ''}`}>
            <strong>{activity.type ?? 'Activity'}</strong>
            {activity.userId && typeof activity.userId !== 'string' ? ` by ${activity.userId.name}` : ''}
            {activity.teamId && typeof activity.teamId !== 'string' ? ` on ${activity.teamId.name}` : ''}
            {activity.durationMinutes ? ` — ${activity.durationMinutes} min` : ''}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Activities
