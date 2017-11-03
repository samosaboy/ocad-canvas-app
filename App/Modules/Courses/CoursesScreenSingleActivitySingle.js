import moment from 'moment'
import React from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import HTMLView from 'react-native-htmlview'
import Pages from '../../Common/DeepPages'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'

export default class CoursesScreenSingleAssignments extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  _formatDate = (date) => {
    return moment.utc(date)
    .fromNow()
  }

  constructor (props) {
    super(props)
    this.state = {
      item: {}
    }
    this.api = API.create()
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
    if (this.props.item.type === 'DiscussionTopic') {
      return (
        <ScrollView>
          <View>
            <View style={[Pages.viewContainer, Pages.metaContainer]}>
              <Text style={Pages.bodyTitle}>{this.props.item.title}</Text>
              <Text style={Pages.date}>{this._formatDate(this.props.item.created_at)}</Text>
              <HTMLView
                style={[Pages.body, {paddingTop: 0}]}
                value={this.props.item.message.replace(/<p>(.*)<\/p>/g,
                  '$1\r\n')
                .replace(/<br>/g,
                  '')}
                onLinkPress={(url) => Linking.openURL(url)}
              />
            </View>
            <View hasRootEntries={false}>
              {this.props.item.root_discussion_entries.map((item, index) => <View key={item.user.user_id + index}>
                <ListItem
                  // roundAvatar
                  hideChevron
                  // avatar={{uri: item.author.avatar_image_url}}
                  title={item.user.user_name}
                  // rightTitle={this._formatDate(item.posted_at)}
                  containerStyle={Pages.authorContainer}
                  titleStyle={{marginLeft: 0}}
                />
                {item.message
                  ? <HTMLView
                    renderNode={this._renderNode}
                    style={Pages.viewContainer}
                    value={item.message.replace(/<p>(.*)<\/p>/g,
                      '$1\r\n')
                    .replace(/<br>/g,
                      '')}
                    onLinkPress={(url) => Linking.openURL(url)}
                  />
                  : null}
              </View>)}
            </View>
          </View>
        </ScrollView>
      )
    }
  }
}
