import React from 'react'
import { ScrollView, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'

export default class CoursesScreenSinglePeople extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  _getCourseParticipants = () => {
    this.api.getCourseMemberList(this.props.id)
    .then((response) => {
      this.setState({
        members: response.data,
        loading: false
      })
    })
  }
  goToUser = (courseId, userId) => {
    this.props.navigator.showLightBox({
      screen: 'CoursesScreenSinglePeopleSingle',
      style: {
        backgroundColor: '#00000060'
      },
      passProps: {
        courseId,
        userId
      }
    })
  }

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
            label={participants.enrollments[0].type === 'TeacherEnrollment'
              ? <Text style={styles.label}>(Instructor)</Text>
              : null}
            rightTitleContainerStyle={{
              flex: 1,
              alignItems: 'flex-start'
            }}
            onPress={() => this.goToUser(this.props.id,
              participants.id)}
          />
        ))}
      </ScrollView>
    )
  }
}
