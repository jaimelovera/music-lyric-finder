import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Page404 from '../layout/Page404'

import styles from './Lyrics.module.css'

class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    status404: false
  }

  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
    .then(res => {
      if(res.data.message.header.status_code === 404){
        this.setState({status404: true})
        return res
      }

      this.setState({lyrics: res.data.message.body.lyrics})
      return axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`)
    })
    .then(res => {
      if(res.data.message.header.status_code === 404){
        this.setState({status404: true})
        return res
      }
      this.setState({track: res.data.message.body.track})
    })
    .catch(err => console.log(err))
  }

  render() {
    const { track, lyrics, status404 } = this.state
    
    if(status404 === true) {
      return <Page404 />
    }
    else if(track === undefined || lyrics === undefined || Object.keys(track).length === 0 || Object.keys(lyrics).length === 0) {
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
              <button className={styles.backButton}><i className="fas fa-arrow-left"></i> Go Back</button>
            </Link>
          <div className={styles.lyricsContainer}>
            <div className={styles.songInfo}>
              <strong><i className="fas fa-music"></i> {track.track_name}</strong> <i className="fas fa-minus"></i> by {track.artist_name}
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