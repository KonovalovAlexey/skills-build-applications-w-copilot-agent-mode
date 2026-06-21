import { useEffect, useState } from 'react'

export interface User {
  _id?: string
  name?: string
  email?: string
  role?: string
  teamId?: string
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

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const url = buildEndpoint('users')

    fetchJson<any>(url)
      .then((result) => {
        setUsers(normalizeResults<User>(result))
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
