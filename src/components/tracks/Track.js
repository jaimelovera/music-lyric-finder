import React from 'react'
import styles from './Track.module.css'
import { Link } from 'react-router-dom'

const Track = (prop) => {
  const { track } = prop

  return (
    <div className={styles.trackInfo}>
      <div className={styles.trackItemElem}>
        <i className="fas fa-user"></i> <strong>Artist:</strong>
        <br/>
        {track.artist_name}
      </div>
      <div className={styles.trackItemElem}>
        <i className="fas fa-music"></i> <strong>Track:</strong>
        <br/>
        {track.track_name}
      </div>
      <div className={styles.trackItemElem}>
        <i className="fas fa-compact-disc"></i> <strong>Album:</strong>
        <br/>
        {track.album_name}
      </div>
      <div className={styles.trackButton}>
        <Link to={`lyrics/track/${track.track_id}`} style={{textDecoration: 'none'}}>
          <button><i className="fas fa-chevron-right"></i> View Lyrics</button>
        </Link>
      </div>

    </div>
  )
}

export default Track