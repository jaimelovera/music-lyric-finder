import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import styles from './Lyrics.module.css'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {}
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
    .then(res => {
      this.setState({lyrics: res.data.message.body.lyrics})
      return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
    })
    .then(res => {
      this.setState({track: res.data.message.body.track})
    })
    .catch(err => console.log(err))
  }

  render() {
    const { track, lyrics } = this.state
    if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
      return (
        <div className={styles.loader}>
          <Loader
            type="ThreeDots"
            color={window.getComputedStyle(document.body).getPropertyValue('--color-main-font-color')}
            height={100}
            width={100}
          />
        </div>
      )
    }
    else {
      return (
        <div className={styles.container}>
            <Link to="/" style={{textDecoration: 'none'}}>
              <button className={styles.backButton}><i className="fas fa-long-arrow-alt-left"></i> Go Back</button>
            </Link>
          <div className={styles.lyricsContainer}>
            <div className={styles.songInfo}>
              <strong>{track.track_name}</strong> by {track.artist_name}
            </div>
            <div className={styles.lyrics}>
              {lyrics.lyrics_body}
            </div>
          </div>
        </div>
      )
    }
  }
}

export default Lyrics