import { useEffect, useState } from 'react'
import { collectionFromResponse } from '../api'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME?.trim()
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(activitiesApiUrl, { signal: controller.signal }).then((response) => response.json()).then((payload) => setActivities(collectionFromResponse(payload))).catch((loadError) => {
      if (loadError.name !== 'AbortError') setError(loadError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Daily movement</span><h1>Activities</h1><p>Track the effort that keeps your team in motion.</p></div>{error && <p className="error-message">{error}</p>}<div className="data-grid">{activities.length ? activities.map((activity, index) => <article className="data-card" key={activity.id || activity._id || index}><strong>{activity.type || activity.name || 'Workout activity'}</strong><span>{activity.duration ? `${activity.duration} minutes` : activity.user || 'Activity logged'}</span></article>) : <p className="empty-state">No activities have been logged yet.</p>}</div></section>
  )
}

export default Activities
