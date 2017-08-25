import _ from 'lodash'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, FlatList, View } from 'react-native'
import API from '../../Services/Api'
import moment from 'moment'
import { ListItem } from 'react-native-elements'
import styles from './InboxScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'
import UnreadMarker from '../../Components/UnreadMarker'

export default class InboxScreen extends React.Component {
  static navigationOptions = {
    title: `My Messages (${this.unread})`,
    tabBarLabel: 'Inbox',
    tabBarIcon: ({tintColor}) => (
      <Icon name='ios-chatboxes' size={30} style={{color: tintColor}} />
    )
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      count: 10,
      page: 1,
      loading: true
    }
    this.api = API.create()
    this.now = null
    this.unread = 0
  }

  componentDidMount () {
    this.api.getUserUnreadCount()
      .then((response) => {
        this.unread = response.data.unread_count
        console.log(this.unread)
      })
    this._getConversations(this.state.count, this.state.page)
  }

  _getConversations (count) {
    this.now = moment().milliseconds()
    this.api.getUserConversations(this.state.count, this.state.page)
      .then((response) => {
        this.setState({ messages: this.state.messages.concat(response.data), loading: false, page: this.state.page + 1 })
      })
  }

  _removeLineBreaks = (message) => {
    return message.replace(/[\n\r]+/g, ' ')
  }

  _showSubject = (item) => {
    return (
      item.subject !== ''
        ? item.subject
        : '(No subject)'
    )
  }

  _showMessage = (item) => {
    return (
      <View>
        <Text style={styles.messageSubtitleSender}>
          { // TODO: come back to this, see all cases (i.e. multiple people conversation threads)
            item.participants[0].id === item.audience[0]
              ? item.participants[0].name
              : item.participants[1].name
          }
        </Text>
        <Text style={styles.messageText}>{this._removeLineBreaks(item.last_message)}</Text>
      </View>
    )
  }

  _getConversationDetails = (id, subject) => {
    const markedAsRead = _.cloneDeep(this.state.messages)
    _.filter(markedAsRead, ['id', id])[0].workflow_state = 'read'
    this.setState({ messages: markedAsRead })
    // send ID down as a prop?
    const { navigate } = this.props.navigation
    navigate('SingleConversationView', { id, subject })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Populating Inbox'} />
      )
    }
    return (
      <View>
        <FlatList
          refreshing={this.state.loading}
          data={this.state.messages}
          keyExtractor={(item, index) => item.id} // cant use index b/c they are duplicates
          onEndReached={({ distanceFromEnd }) => {
            this._getConversations(this.state.count, this.state.page)
          }}
          onEndReachedThreshold={0.5}
          onRefresh={() => this._getConversations(this.state.count, this.state.page)}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              hideChevron
              titleStyle={styles.messageSubject}
              subtitleContainerStyle={styles.messageSubtitle}
              containerStyle={styles.messageContainer}
              title={this._showSubject(item)}
              subtitle={this._showMessage(item)}
              onPress={() => this._getConversationDetails(item.id, item.subject)}
              subtitleNumberOfLines={2}
              avatar={{ uri: item.participants[0].avatar_url }}
              label={<UnreadMarker requirements={item.workflow_state === 'read'} />}
            />
          )}
        />
      </View>
    )
  }
}
