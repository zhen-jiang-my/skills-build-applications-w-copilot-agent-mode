import { useEffect, useState } from 'react'
import { collectionFromResponse, getApiUrl } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetch(getApiUrl('workouts'), { signal: controller.signal }).then((response) => response.json()).then((payload) => setWorkouts(collectionFromResponse(payload))).catch((loadError) => {
      if (loadError.name !== 'AbortError') setError(loadError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section className="view-section"><div className="section-heading"><span className="eyebrow">Your next win</span><h1>Workouts</h1><p>Find a challenge that fits the energy you have today.</p></div>{error && <p className="error-message">{error}</p>}<div className="data-grid">{workouts.length ? workouts.map((workout, index) => <article className="data-card" key={workout.id || workout._id || index}><strong>{workout.name || workout.title || 'Suggested workout'}</strong><span>{workout.duration ? `${workout.duration} minutes` : workout.level || 'Ready when you are'}</span></article>) : <p className="empty-state">Workout suggestions will appear here.</p>}</div></section>
  )
}

export default Workouts
