import moment from 'moment'
import React from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import HTMLView from 'react-native-htmlview'
import Pages from '../../Common/DeepPages'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'

export default class CoursesScreenSingleDiscussionsSingle extends React.Component {
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
      this.setState({item: response.data})
      this.api.getCourseThreadsSingleEntries(this.props.courseId,
        this.props.itemId,
        'entries')
      .then((response) => {
        const entries = response.data.sort((a, b) => {
          if (a.created_at - b.created_at) {
            return -1
          }
          return 1
        })
        this.setState({
          entries,
          loading: false
        })
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
      entries: [],
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
            subtitle={this._formatDate(this.state.item.posted_at)}
            containerStyle={Pages.authorContainer}
            titleStyle={{marginLeft: 0}}
          />
          <View style={[Pages.viewContainer, {marginBottom: 20}]}>
            <Text style={Pages.bodyTitle}>{this.state.item.title}</Text>
            <HTMLView
              style={Pages.body}
              value={this.state.item.message}
              addLineBreaks={false}
              renderNode={this._renderNode}
              onLinkPress={(url) => Linking.openURL(url)}
            />
          </View>
          <View>
            {this.state.entries.map((item, index) => <View key={item.id} style={{marginLeft: 15}}>
              <ListItem
                roundAvatar
                hideChevron
                avatar={{uri: item.user.avatar_image_url}}
                title={item.user.display_name}
                titleContainerStyle={Pages.author}
                subtitle={this._formatDate(item.created_at)}
                containerStyle={Pages.authorContainer}
                titleStyle={{marginLeft: 0}}
              />
              {item.message
                ? <HTMLView
                  style={Pages.viewContainer}
                  addLineBreaks={false}
                  renderNode={this._renderNode}
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
