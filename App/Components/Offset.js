import React, { Component } from 'react'
import { Platform, View } from 'react-native'

export default class Offset extends Component {
  render () {
    if (Platform.OS === 'ios') {
      return <View style={{height: 65}} />
    }
    return null
  }
}
