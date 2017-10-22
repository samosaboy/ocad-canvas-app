import _ from 'lodash'
import React from 'react'
import { Linking, View, Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import moment from 'moment'
import Pages from '../../Common/DeepPages'
import ScreenLadda from '../../Components/ScreenLadda'
import HTMLView from 'react-native-htmlview'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleAnnouncementSingle extends React.Component {
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
      item: {},
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseItemSingle()
  }

  _getCourseItemSingle = () => {
    this.api.getCourseThreadsSingle(this.props.courseId, this.props.itemId)
      .then((response) => {
        this.setState({ item: response.data, loading: false })
      })
  }

  _formatDate = (date) => {
    return moment.utc(date).fromNow()
  }

  render () {
    const { item } = this.state
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting announcement'} />
      )
    }
    return (
      <ScrollView>
        <View>
          {
            !_.isEmpty(item.author)
            ? <ListItem
              roundAvatar
              hideChevron
              avatar={{uri: item.author.avatar_image_url}}
              key={item.author.id}
              title={item.author.display_name}
              titleNumberOfLines={3}
              rightTitle={this._formatDate(item.posted_at)}
              containerStyle={Pages.authorContainer}
              />
            : null
          }
          <View style={Pages.viewContainer}>
            <Text style={Pages.bodyTitle}>{item.title}</Text>
            <HTMLView
              style={Pages.body}
              value={item.message.replace(/<p>(.*)<\/p>/g, '$1\r\n').replace(/<br>/g, '')}
              onLinkPress={(url) => Linking.openURL(url)}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
