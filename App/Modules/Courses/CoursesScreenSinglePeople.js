import React from 'react'
import { ActionSheetIOS, Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSinglePeople extends React.Component {
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
      members: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseParticipants()
  }

  _getCourseParticipants = () => {
    this.api.getCourseMemberList(this.props.id)
      .then((response) => {
        this.setState({ members: response.data, loading: false })
      })
  }

  showActionSheet = (psUserId, psCourseId, psUserName) => {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Message', 'Cancel'],
      cancelButtonIndex: 1
    },
    () => this.messageUser(psUserId, psCourseId, psUserName))
  }

  // ps = pre selected
  messageUser = (psUserId, psCourseId, psUserName) => {
    this.props.navigator.showModal({
      screen: 'CreateMessage',
      title: 'Compose',
      passProps: { psUserId, psCourseId, psUserName }
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Listing recipients'} />
      )
    }
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.messageContainer}>
        {this.state.members.map((participants) => (
          <ListItem
            roundAvatar
            hideChevron
            containerStyle={styles.listContainer}
            avatar={{uri: participants.avatar_url}}
            key={participants.id}
            title={participants.name}
            label={participants.enrollments[0].type === 'TeacherEnrollment' ? <Text style={styles.label}>(Instructor)</Text> : null}
            rightTitleContainerStyle={{ flex: 1, alignItems: 'flex-start' }}
            onPress={() => this.showActionSheet(participants.id, participants.enrollments[0].course_id, participants.name)}
            // onPress={() => this.messageUser(participants.id, participants.enrollments[0].course_id, participants.name)}
          />
        ))}
      </ScrollView>
    )
  }
}
