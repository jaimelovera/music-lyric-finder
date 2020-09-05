import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'
import styles from './Search.module.css'

 class Search extends Component {
  state={
    trackTitle: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  findTrack = (dispatch, track_list, heading, e) => {
    e.preventDefault()

    dispatch({
      type: 'CHANGE_TRACKS',
      payload: [],
      heading: ''
    })

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&f_has_lyrics=1&f_lyrics_language=en&apikey=${process.env.REACT_APP_MM_KEY}`)
    .then(res => {
      console.log(res.data)
      if(res.data.message.header.available !== 0) {
        dispatch({
          type: 'CHANGE_TRACKS',
          payload: res.data.message.body.track_list,
          heading: `Search Results for : "${this.state.trackTitle}"`
        })
        this.setState({trackTitle: ''})
      }
      else {
        dispatch({
          type: 'CHANGE_TRACKS',
          payload: track_list,
          heading: heading
        })
        alert("No results! Try again with a different song name.")
        this.setState({trackTitle: ''})
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch, track_list, heading } = value
          return (
            <div className={styles.searchContainer}>
              <h1><i className="fas fa-music"></i> Search For A Song</h1>
              <p><i className="fas fa-search"></i> <i> Get the lyrics for any song</i></p>
              <form 
                onSubmit={this.findTrack.bind(this, dispatch, track_list, heading)}
                className={styles.searchForm}
                autoComplete="off"
              >
                <input 
                  className={styles.searchInput}
                  type="text"
                  placeholder="Song title..."
                  name="trackTitle"
                  value={this.state.trackTitle}
                  onChange={this.onChange}
                  autoFocus
                />
                <button className={styles.searchButton} type="submit">
                  Search Track Lyrics
                </button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search