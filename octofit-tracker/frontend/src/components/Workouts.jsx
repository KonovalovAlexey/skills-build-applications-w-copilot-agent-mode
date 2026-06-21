import { useEffect, useState } from 'react'

// Example Codespace endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts
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

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('workouts')

    fetchJson(url)
      .then((result) => {
        setWorkouts(normalizeResults(result))
      })
      .catch((fetchError) => {
        setError(String(fetchError))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <p>
        Backend API endpoint: <code>{buildEndpoint('workouts')}</code>
      </p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error">Error loading workouts: {error}</p>}
      {!loading && !error && workouts.length === 0 && <p>No workouts found.</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id ?? workout.name ?? 'workout'}>
            <strong>{workout.name ?? 'Workout'}</strong> — {workout.focus ?? 'No focus'} — {workout.durationMinutes ?? '-'} min — {workout.difficulty ?? 'unknown'}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Workouts
