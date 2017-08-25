import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './Styles/ScreenLaddaStyles'

export default class ScreenLadda extends Component {
  static defaultProps = { text: 'Loading' }
  static propTypes = {
    text: PropTypes.string
  }

  render () {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small' />
        <Text style={styles.loadingText}>
          {this.props.text}
        </Text>
      </View>
    )
  }
}
