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
        <Loader
          type="ThreeDots"
          color={window.getComputedStyle(document.body).getPropertyValue('--color-main-font-color')}
          height={100}
          width={100}
        />
      )
    }
    else {
      return (
        <div className={styles.lyricsContainer}>
          <Link to="/">Go Back</Link>
          {track.track_name}
          {track.artist_name}
          {lyrics.lyrics_body}
          {track.primary_genres.music_genre_list[0].music_genre.music_genre_name}
        </div>
      )
    }
 
  }
}

export default Lyrics