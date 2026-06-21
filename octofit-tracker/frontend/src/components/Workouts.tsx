import { useEffect, useState } from 'react'

export interface Workout {
  _id?: string
  name?: string
  description?: string
  focus?: string
  durationMinutes?: number
  difficulty?: string
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

function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('workouts')

    fetchJson<any>(url)
      .then((result) => {
        setWorkouts(normalizeResults<Workout>(result))
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
