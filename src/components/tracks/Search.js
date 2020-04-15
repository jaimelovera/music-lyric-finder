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

  findTrack = (dispatch, e) => {
    e.preventDefault()

    dispatch({
      type: 'SEARCH_TRACKS',
      payload: []
    })

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
    .then(res => {
      if(res.data.message.header.available !== 0) {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list
        })
        this.setState({trackTitle: ''})
      }
      else {
        alert("No results! Try again with a different song name.")
      }
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className={styles.searchContainer}>
              <h1>Search For A Song</h1>
              <p><i>Get the lyrics for any song</i></p>
              <form 
                onSubmit={this.findTrack.bind(this, dispatch)}
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