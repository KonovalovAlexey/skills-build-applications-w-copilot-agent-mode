import { useEffect, useState } from 'react'

export interface Team {
  _id?: string
  name?: string
  description?: string
  members?: string[]
  score?: number
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

function Teams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('teams')

    fetchJson<any>(url)
      .then((result) => {
        setTeams(normalizeResults<Team>(result))
      })
      .catch((fetchError) => {
        setError(String(fetchError))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <p>
        Backend API endpoint: <code>{buildEndpoint('teams')}</code>
      </p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error">Error loading teams: {error}</p>}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id ?? team.name ?? 'team'}>
            <strong>{team.name ?? 'Team'}</strong> — {team.description ?? 'No description'} — {team.members?.length ?? 0} members — score {team.score ?? 0}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Teams
