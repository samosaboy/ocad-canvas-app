import React from 'react'
import { ScrollView, Text } from 'react-native'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'

export default class Profile extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      item: {}
    }
    this.api = API.create()
  }

  render () {
    return (
      <ScrollView>
        <Text>Temp</Text>
      </ScrollView>
    )
  }
}
