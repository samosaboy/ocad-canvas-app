import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import Pages from '../../Common/DeepPages'
import moment from 'moment'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleDiscussions extends React.Component {
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
      item: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseAnnouncements()
  }

  _getCourseAnnouncements = () => {
    this.api.getCourseThreads(this.props.id)
      .then((response) => {
        this.setState({ item: response.data, loading: false })
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
      screen: 'CoursesScreenSingleDiscussionsSingle',
      passProps: {
        courseId,
        itemId
      }
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting discussions'} />
      )
    }
    if (this.state.item) {
      return (
        <ScrollView
          automaticallyAdjustContentInsets={false}>
          {this.state.item.map((item) => (
            <ListItem
              containerStyle={Pages.listContainer}
              key={item.id}
              title={this._showTitle(item)}
              titleStyle={Pages.headerTitle}
              subtitle={item.message.replace(/<\/?[^>]+>/gi, '').replace(/\r?\n|\r/g, ' ').replace('           ', '')}
              subtitleNumberOfLines={5}
              subtitleStyle={Pages.subTitleText}
              onPress={() => this.getSingleItem(item.id)}
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
