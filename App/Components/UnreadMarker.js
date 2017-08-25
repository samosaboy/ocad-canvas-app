import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import styles from './Styles/UnreadMarkerStyles'

export default class ScreenLadda extends Component {
  static defaultProps = { requirements: false }
  static propTypes = {
    requirements: PropTypes.bool
  }

  render () {
    if (this.props.requirements) {
      return null
    }
    return <View style={styles.marker} />
  }
}
