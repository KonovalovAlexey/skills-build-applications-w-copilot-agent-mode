import { useEffect, useState } from 'react'

// Example Codespace endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
const buildEndpoint = (subPath) => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const baseHost = codespaceName ? `${codespaceName}-8000.app.github.dev` : 'localhost:8000'
  const scheme = codespaceName ? 'https' : 'http'
  return `${scheme}://${baseHost}/api/${subPath}/`
}

const fetchJson = async (url) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`)
  }
  return response.json()
}

const normalizeResults = (data) => {
  if (Array.isArray(data)) return data
  if (data?.data && Array.isArray(data.data)) return data.data
  if (data?.results && Array.isArray(data.results)) return data.results
  return []
}

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('activities')

    fetchJson(url)
      .then((result) => {
        setActivities(normalizeResults(result))
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
