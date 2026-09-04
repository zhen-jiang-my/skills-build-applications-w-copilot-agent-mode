import { Link, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link className="brand" to="/"><span className="brand-mark">O</span><span>OctoFit <em>Tracker</em></span></Link>
        <nav aria-label="Primary navigation">
          <Link to="/activities">Activities</Link>
          <Link to="/workouts">Workouts</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/users">Users</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Activities />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </main>
      <footer>Move together. Feel stronger.</footer>
    </div>
  )
}

export default App
