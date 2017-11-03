import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import HTMLView from 'react-native-htmlview'
import Pages from '../../Common/DeepPages'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'

export default class CoursesScreenSingleAnnouncementSingle extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  _getCourseItemSingle = () => {
    this.api.getCourseThreadsSingle(this.props.courseId,
      this.props.itemId)
    .then((response) => {
      this.setState({
        item: response.data,
        loading: false
      })
    })
  }
  _formatDate = (date) => {
    return moment.utc(date)
    .fromNow()
  }

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

  _renderNode (node, index, siblings, parent, defaultRenderer) {
    if (node.name === 'img') {
      // TODO: Fix image (proper width and clicking to zoom etc)
      return (
        <Text key={index} style={{textDecorationLine: 'underline'}}
          onPress={() => Linking.openURL(node.attribs.src)}>{node.attribs.src}</Text>
      )
    }
  }

  render () {
    const {item} = this.state
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting announcement'} />
      )
    }
    return (
      <ScrollView>
        <View>
          {!_.isEmpty(item.author)
            ? <ListItem
              roundAvatar
              hideChevron
              avatar={{uri: item.author.avatar_image_url}}
              key={item.author.id}
              title={item.author.display_name}
              titleNumberOfLines={3}
              subtitle={this._formatDate(item.posted_at)}
              containerStyle={Pages.authorContainer}
            />
            : null}
          <View style={Pages.viewContainer}>
            <Text style={Pages.bodyTitle}>{item.title}</Text>
            <HTMLView
              renderNode={this._renderNode}
              style={Pages.body}
              value={item.message.replace(/<p>(.*)<\/p>/g,
                '$1\r\n')
              .replace(/<br>/g,
                '')}
              onLinkPress={(url) => Linking.openURL(url)}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
}
