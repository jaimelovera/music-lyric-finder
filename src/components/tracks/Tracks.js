import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

import { Consumer } from '../../context'
import Track from './Track'
import styles from './Tracks.module.css'

class Tracks extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { track_list, heading } = value

          if(track_list === undefined || track_list.length === 0) {
            return (
              <div className={styles.loader}>
                <Loader
                type="ThreeDots"
                color="#FFF"
                height={100}
                width={100}
                />
              </div>
            )
          }
          else {
            return (
              <React.Fragment>
                <h3 className={styles.heading}>{heading}</h3>
                <div className={styles.tracksContainer}>
                  {track_list.map(item => {
                    return <Track key={item.track.track_id} track={item.track}/>
                  })}
                </div>
              </React.Fragment>
            )
          }
        }}
      </Consumer>
    )
  }
}

export default Tracks