import React from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingle extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  constructor (props) {
    super(props)
    this.state = {
      messages: {},
      loading: false
    }
    this.api = API.create()
  }

  _showParticipantType = (name, common) => {
    // _.forEach(common, type => {
    //   console.log(type)
    // })
    return name
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting recipient list'} />
      )
    }
    return (
      <ScrollView
        style={styles.messageContainer}
        automaticallyAdjustContentInsets={false}>
        {this.props.members.map((participants) => (
          <ListItem
            roundAvatar
            hideChevron
            containerStyle={{ borderBottomWidth: 0.5 }}
            avatar={{uri: participants.avatar_url}}
            key={participants.id}
            title={this._showParticipantType(participants.name, participants.common_courses)}
          />
        ))}
      </ScrollView>
    )
  }
}
