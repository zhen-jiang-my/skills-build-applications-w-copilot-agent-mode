import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('users', controller.signal).then(setUsers).catch((loadError) => {
      if (loadError.name !== 'AbortError') setError(loadError.message)
    })
    return () => controller.abort()
  }, [])

  return (
    <section className="view-section">
      <div className="section-heading"><span className="eyebrow">Community</span><h1>Users</h1><p>See who is moving with the OctoFit community.</p></div>
      {error && <p className="error-message">{error}</p>}
      <div className="data-grid">{users.length ? users.map((user, index) => <article className="data-card" key={user.id || user._id || index}><strong>{user.username || user.name || 'OctoFit member'}</strong><span>{user.email || user.team || 'Profile available'}</span></article>) : <p className="empty-state">No users have joined yet.</p>}</div>
    </section>
  )
}

export default Users
