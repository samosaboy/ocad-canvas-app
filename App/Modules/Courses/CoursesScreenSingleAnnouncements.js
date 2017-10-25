import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import Pages from '../../Common/DeepPages'
import moment from 'moment'
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
    this.api.getCourseThreads(this.props.id, false)
      .then((response) => {
        const entries = response.data.sort((a, b) => {
          const dateA = new Date(a.posted_at)
          const dateB = new Date(b.posted_at)
          return dateB - dateA
        })
        this.setState({ announcements: entries, loading: false })
      })
  }

  _formatDate = (date) => {
    return moment.utc(date).fromNow() // TODO: Update time stamp with tick()?
  }

  _showTitle = (item) => {
    return (
      <View style={Pages.itemHeader}>
        <Text style={Pages.headerTitle}>{item.title}</Text>
        <Text style={Pages.date}>{
          item.posted_at
          ? this._formatDate(item.posted_at)
          : <Text>No Date</Text>
        }</Text>
      </View>

    )
  }

  getSingleItem = (itemId) => {
    const courseId = this.props.id
    this.props.navigator.push({
      screen: 'CoursesScreenSingleAnnouncementsSingle',
      // backButtonTitle: '',
      passProps: {
        courseId,
        itemId
      }
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting announcements'} />
      )
    }
    if (this.state.announcements) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}>
          {this.state.announcements.map((announcements) => (
            <ListItem
              containerStyle={Pages.listContainer}
              key={announcements.id}
              title={this._showTitle(announcements)}
              titleStyle={Pages.headerTitle}
              subtitle={announcements.message.replace(/<\/?[^>]+>/gi, '').replace(/\r?\n|\r/g, ' ').replace('           ', '')}
              subtitleNumberOfLines={5}
              subtitleStyle={Pages.subTitleText}
              onPress={() => this.getSingleItem(announcements.id)}
            />
          ))}
        </ScrollView>
      )
    }
    return (
      <Text>No information</Text>
    )
  }
}
