import { useEffect, useState } from 'react'
import { collectionFromResponse } from '../api'

const leaderboardApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [leaders, setLeaders] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(leaderboardApiUrl, { signal: controller.signal }).then((response) => response.json()).then((payload) => setLeaders(collectionFromResponse(payload))).catch((loadError) => {
      if (loadError.name !== 'AbortError') setError(loadError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Friendly competition</span><h1>Leaderboard</h1><p>Celebrate consistency, effort, and team spirit.</p></div>{error && <p className="error-message">{error}</p>}<div className="ranking-list">{leaders.length ? leaders.map((leader, index) => <article className="ranking-row" key={leader.id || leader._id || index}><span className="rank-number">{index + 1}</span><strong>{leader.username || leader.name || 'Athlete'}</strong><span>{leader.points ?? leader.score ?? 0} pts</span></article>) : <p className="empty-state">The leaderboard is ready for its first champion.</p>}</div></section>
  )
}

export default Leaderboard
