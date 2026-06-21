import { useEffect, useState } from 'react'

// Example Codespace endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams
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

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('teams')

    fetchJson(url)
      .then((result) => {
        setTeams(normalizeResults(result))
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
