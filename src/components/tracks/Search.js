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

  render() {
    return (
      <Consumer>
        {value => {
          return (
            <div className={styles.searchContainer}>
              <h1>Search For A Song</h1>
              <p><i>Get the lyrics for any song</i></p>
              <form className={styles.searchForm}>
                <input 
                  className={styles.searchInput}
                  type="text"
                  placeholder="Song title..."
                  name="trackTitle"
                  value={this.state.trackTitle}
                  onChange={this.onChange}
                  autofocus
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