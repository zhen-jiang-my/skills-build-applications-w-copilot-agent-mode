import { useEffect, useState } from 'react'
import { collectionFromResponse, getApiUrl } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(getApiUrl('teams'), { signal: controller.signal }).then((response) => response.json()).then((payload) => setTeams(collectionFromResponse(payload))).catch((loadError) => {
      if (loadError.name !== 'AbortError') setError(loadError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Find your people</span><h1>Teams</h1><p>Build momentum together, one shared goal at a time.</p></div>{error && <p className="error-message">{error}</p>}<div className="data-grid">{teams.length ? teams.map((team, index) => <article className="data-card" key={team.id || team._id || index}><strong>{team.name || 'OctoFit team'}</strong><span>{team.members?.length ?? team.memberCount ?? 0} members</span></article>) : <p className="empty-state">No teams have been created yet.</p>}</div></section>
  )
}

export default Teams
