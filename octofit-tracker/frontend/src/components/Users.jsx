import { useEffect, useState } from 'react'

// Example Codespace endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users
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

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('users')

    fetchJson(url)
      .then((result) => {
        setUsers(normalizeResults(result))
      })
      .catch((fetchError) => {
        setError(String(fetchError))
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p>
        Backend API endpoint: <code>{buildEndpoint('users')}</code>
      </p>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error loading users: {error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id ?? user.email ?? user.name ?? 'user'}>
            <strong>{user.name ?? 'User'}</strong> — {user.email ?? 'No email'} — role {user.role ?? 'unknown'}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default Users
