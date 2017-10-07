import React from 'react'
import { ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleAnnouncements extends React.Component {
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
      announcements: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseAnnouncements()
  }

  _getCourseAnnouncements = () => {
    this.api.getCourseDiscussions(this.props.id, false)
      .then((response) => {
        this.setState({ announcements: response.data, loading: false })
      })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting announcements'} />
      )
    }
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}>
        {this.state.announcements.map((announcements) => (
          <ListItem
            roundAvatar
            hideChevron
            containerStyle={styles.listContainer}
            key={announcements.id}
            title={announcements.title}
            subtitle={announcements.message.replace(/<\/?[^>]+>/gi, '').replace(/\r?\n|\r/g, ' ').replace('           ', '')}
            subtitleNumberOfLines={5}
            subtitleStyle={styles.subTitleText}
          />
        ))}
      </ScrollView>
    )
  }
}
