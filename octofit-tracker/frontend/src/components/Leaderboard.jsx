import { useEffect, useState } from 'react'

// Example Codespace endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard
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

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('leaderboard')

    fetchJson(url)
      .then((result) => {
        setEntries(normalizeResults(result))
      })
      .catch((fetchError) => {
        setError(String(fetchError))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p>
        Backend API endpoint: <code>{buildEndpoint('leaderboard')}</code>
      </p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error">Error loading leaderboard: {error}</p>}
      {!loading && !error && entries.length === 0 && <p>No leaderboard data found.</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id ?? `${entry.type}-${entry.entityId}-${entry.rank}`}>
            {entry.type ?? 'Entity'} {entry.entityId ?? 'unknown'} — rank {entry.rank ?? '-'} — score {entry.score ?? '-'}
          </li>
        ))}
      </ol>
    </section>
  )
}

export default Leaderboard
