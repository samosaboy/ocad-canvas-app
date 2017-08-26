import _ from 'lodash'
import React from 'react'
import { Text, FlatList, View } from 'react-native'
import API from '../../Services/Api'
import { ListItem } from 'react-native-elements'
import styles from './InboxScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'
import UnreadMarker from '../../Components/UnreadMarker'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { IconsMap, IconsLoaded } from '../../Common/Icons'

export default class InboxScreen extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle
  }
  static navigatorButtons = {
    rightButtons: [
      {
        title: 'New',
        id: 'new',
        disabled: false,
        disableIconTint: false,
        showAsAction: 'ifRoom'
      }
    ]
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      count: 10,
      page: 1,
      loading: true,
      refreshing: false,
      unreadCounter: null
    }
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._renderNavComponents()
  }

  _renderNavComponents () {
    IconsLoaded.then(() => {
      this.props.navigator.setTabButton({
        icon: IconsMap['message']
      })
      this.props.navigator.setButtons({
        rightButtons: [
          {
            title: 'New',
            id: 'new',
            disabled: false,
            disableIconTint: false,
            showAsAction: 'ifRoom',
            icon: IconsMap['compose']
          }
        ]
      })
    })
  }

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'new') {
        this.props.navigator.showModal({
          screen: 'CreateMessage',
          title: 'Compose'
        })
      }
    }
  }

  componentDidMount () {
    this._getUnreadCount()
    this._getConversations(this.state.count, this.state.page)
  }

  _getConversations = () => {
    this.api.getUserConversations(this.state.count, this.state.page)
      .then((response) => {
        this.setState(
          {
            messages: [...this.state.messages, ...response.data],
            loading: false,
            refreshing: false
          })
      })
  }

  _getUnreadCount = () => {
    this.api.getUserUnreadCount()
      .then((response) => {
        this.props.navigator.setTabBadge({
          badge: response.data.unread_count > 0 ? response.data.unread_count : null
        })
      })
  }

  _getUnreadCountAfter = () => {
    this.api.getUserUnreadCount()
      .then((response) => {
        this.props.navigator.setTabBadge({
          badge: (response.data.unread_count - 1 !== 0 && response.data.unread_count - 1 !== -1) ? response.data.unread_count - 1 : null
        })
      })
  }

  _getMoreConversations = () => {
    this.setState(
      { page: this.state.page + 1 },
      () => {
        this._getConversations()
        // this._getUnreadCount() don't need right for infinite scroll
      }
    )
  }

  _onRefresh = () => {
    this.setState(
      { page: 1, refreshing: true },
      () => {
        this.api.getUserConversations(this.state.count, 1, 'unread')
          .then((response) => {
            _.forEach(response.data, newMessages => {
              if (!_.some(this.state.messages, ['id', newMessages.id])) {
                this.setState({ messages: [...response.data, ...this.state.messages], refreshing: false })
              }
            })
            this.setState({ refreshing: false })
            this._getUnreadCount()
          }).catch(() => {
            this.setState({ refreshing: false })
          })
      }
    )
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
    this.props.navigator.push({
      screen: 'SingleConversationView',
      backButtonTitle: '',
      passProps: {
        id,
        subject
      }
    })
    this._getUnreadCountAfter()
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Populating Inbox'} />
      )
    }
    return (
      // TODO: Fix group messages (currently shows the first avatar and name in a group message)
      <View>
        <FlatList
          refreshing={this.state.refreshing}
          data={this.state.messages}
          keyExtractor={(item, index) => item.id * index} // cant use index b/c they are duplicates
          onEndReached={this._getMoreConversations}
          onEndReachedThreshold={0}
          onRefresh={this._onRefresh.bind(this)}
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
