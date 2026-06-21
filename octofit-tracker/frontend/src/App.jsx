import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const apiHost = import.meta.env.VITE_CODESPACE_NAME
  ? `${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev`
  : 'localhost:8000'

const buildEndpoint = (subPath) => {
  const scheme = import.meta.env.VITE_CODESPACE_NAME ? 'https' : 'http'
  return `${scheme}://${apiHost}/api/${subPath}/`
}

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <h1>Octofit Tracker</h1>
        <p className="text-muted">
          Use <code>import.meta.env.VITE_CODESPACE_NAME</code> for backend URLs. If unset, the app falls back safely to <code>http://localhost:8000</code>.
        </p>
        <nav className="nav nav-pills gap-2 flex-wrap">
          <NavLink to="/activities" className="nav-link" end>
            Activities
          </NavLink>
          <NavLink to="/leaderboard" className="nav-link">
            Leaderboard
          </NavLink>
          <NavLink to="/teams" className="nav-link">
            Teams
          </NavLink>
          <NavLink to="/users" className="nav-link">
            Users
          </NavLink>
          <NavLink to="/workouts" className="nav-link">
            Workouts
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>

      <footer className="mt-5 text-muted small">
        <p>
          API base: <code>{buildEndpoint('{component}')}</code>
        </p>
      </footer>
    </div>
  )
}

export default App
