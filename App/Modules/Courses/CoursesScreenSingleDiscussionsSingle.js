import React from 'react'
import { Linking, View, Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import moment from 'moment'
import Pages from '../../Common/DeepPages'
import ScreenLadda from '../../Components/ScreenLadda'
import HTMLView from 'react-native-htmlview'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleDiscussionsSingle extends React.Component {
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
      entries: [],
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
    this.api.getCourseThreadsSingleEntries(this.props.courseId, this.props.itemId, 'entries')
      .then((response) => {
        const entries = response.data.sort((a, b) => {
          if (a.created_at - b.created_at) {
            return 1
          }
          return -1
        })
        this.setState({ entries, loading: false })
      })
  }

  _formatDate = (date) => {
    return moment(date, moment.ISO_8601).format('D MMM hh:mm A')
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting discussion'} />
      )
    }
    return (
      <ScrollView>
        <View>
          <ListItem
            roundAvatar
            hideChevron
            avatar={{uri: this.state.item.author.avatar_image_url}}
            title={this.state.item.author.display_name}
            titleContainerStyle={Pages.author}
            rightTitle={this._formatDate(this.state.item.posted_at)}
            containerStyle={Pages.authorContainer}
            titleStyle={{ marginLeft: 0 }}
          />
          <View style={[Pages.viewContainer, { marginBottom: 20 }]}>
            <Text style={Pages.bodyTitle}>{this.state.item.title}</Text>
            <HTMLView
              style={Pages.body}
              value={this.state.item.message}
              // value={this.state.item.message.replace(/<p>(.*)<\/p>/g, '$1\r\n').replace(/<br>/g, '')}
              onLinkPress={(url) => Linking.openURL(url)}
            />
          </View>
          <View>
            {
              this.state.entries.map((item, index) =>
                <View key={item.id} style={{ marginLeft: 15 }}>
                  <ListItem
                    roundAvatar
                    hideChevron
                    avatar={{uri: item.user.avatar_image_url}}
                    title={item.user.display_name}
                    titleContainerStyle={Pages.author}
                    rightTitle={this._formatDate(item.created_at)}
                    containerStyle={Pages.authorContainer}
                    titleStyle={{ marginLeft: 0 }}
                  />
                  {
                    item.message
                      ? <HTMLView
                        style={Pages.viewContainer}
                        value={item.message.replace(/<p>(.*)<\/p>/g, '$1\r\n').replace(/<br>/g, '')}
                        onLinkPress={(url) => Linking.openURL(url)}
                      />
                      : null
                  }
                </View>
              )
            }
          </View>
        </View>
      </ScrollView>
    )
  }
}
