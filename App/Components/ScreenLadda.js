import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, ActivityIndicator } from 'react-native'
import styles from './Styles/ScreenLaddaStyles'

export default class ScreenLadda extends Component {
  static defaultProps = { text: '' }
  static propTypes = {
    text: PropTypes.string
  }

  render () {
    const { text } = this.props
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small' />
        <Text style={styles.loadingText}>
          {this.props.text ? text : 'Loading'}
        </Text>
      </View>
    )
  }
}
