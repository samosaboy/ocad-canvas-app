import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Badge, ListItem } from 'react-native-elements'
import { IconsLoaded, IconsMap } from '../../Common/Icons'
import ScreenLadda from '../../Components/ScreenLadda'
import UnreadMarker from '../../Components/UnreadMarker'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'

export default class InboxScreen extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    prefersLargeTitles: true
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
  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      count: 10,
      page: 1,
      loading: true,
      refreshing: false,
      refreshTime: moment().toISOString(),
      unreadCounter: null,
      timer: 600000
    }
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.tick = this.tick.bind(this)
    this._renderNavComponents()
  }

  _renderNavComponents () {
    IconsLoaded.then(() => {
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
    switch (event.id) {
      case 'willDisappear':
        clearInterval(this.interval)
        break
    }
  }

  componentDidMount () {
    moment.updateLocale('en', {
      relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%ds',
        m: '1m',
        mm: '%dm',
        h: '1h',
        hh: '%dh',
        d: '1d',
        dd: '%dd',
        M: 'a month',
        MM: '%d month',
        y: 'a year',
        yy: '%d year'
      }
    })
    this._getUnreadCount()
    this.interval = setInterval(this.tick, 1000)
    this._getConversations(this.state.count, this.state.page)
    setInterval(() => this.refreshConversationList(), this.state.timer)
    this.tick()
  }

  api = {}
  _getConversations = () => {
    this.api.getUserConversations(this.state.count, this.state.page)
      .then((response) => {
        this.setState({
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

  _getMoreConversations = () => {
    this.setState({page: this.state.page + 1},
      () => {
        this._getConversations()
      })
  }

  tick = () => {
    const timeStamp = this.state.refreshTime
    this.props.navigator.setSubTitle({
      subtitle: 'updated ' + moment(timeStamp).fromNow()
    })
    this.props.navigator.setStyle({
      navBarSubtitleFontSize: 13,
      navBarSubtitleColor: '#b0b0b0'
    })
  }

  refreshConversationList = () => {
    this.setState({
      page: 1,
      refreshing: true
    }, () => {
      this._getUnreadCount()
      this.api.getUserConversations(this.state.count, this.state.page)
        .then((response) => {
          this.setState({
            messages: [...this.state.messages, ...response.data],
            refreshing: false,
            refreshTime: moment().toISOString()
          })
        })
    })
  }

  _onRefresh = () => {
    this.refreshConversationList()
  }

  _removeLineBreaks = (message) => {
    return message.replace(/[\n\r]+/g,
      ' ')
  }

  _formatDate = (date) => {
    return moment.utc(date).fromNow() // TODO: Update time stamp with tick()?
  }

  _showSubject = (item) => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row'
      }}>
        <UnreadMarker requirements={item.workflow_state === 'read'} />
        <Text style={styles.messageSubject}>
          {item.participants[0].id === item.audience[0]
            ? item.participants[0].name
            : (
              _.indexOf(item.properties,
                'last_author') !== -1
                ? item.participants[0].name
                : item.participants[1].name
            )}
        </Text>
        <Text style={[styles.messageDate]}>
          {item.last_authored_message_at && (_.indexOf(item.properties,
            'last_author') !== -1)
            ? (this._formatDate(item.last_authored_message_at))
            : (this._formatDate(item.last_message_at))}
        </Text>
      </View>
    )
  }

  _showMessage = (item) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 0.98}}>
          <Text style={styles.messageSubtitleSubject}>
            { // TODO: come back to this, see all cases (i.e. multiple people conversation threads)
              item.subject !== '' && item.subject !== null
                ? item.subject
                : 'No subject'}
          </Text>
          <Text style={styles.messageText}>{this._removeLineBreaks(item.last_message)}</Text>
        </View>
        {item.message_count > 1
          ? (<View style={{flex: 0.1, marginRight: 10, paddingLeft: 5}}>
            <Badge
              value={item.message_count}
              containerStyle={{padding: 0, backgroundColor: '#E8E8E8'}}
              textStyle={{color: '#737373'}} /></View>)
          : null}
      </View>
    )
  }

  _getConversationDetails = (id, subject, course) => {
    const markedAsRead = _.cloneDeep(this.state.messages)
    _.filter(markedAsRead,
      ['id', id])[0].workflow_state = 'read'
    this.setState({messages: markedAsRead})
    this.props.navigator.push({
      screen: 'SingleConversationView', // backButtonTitle: '',
      passProps: {
        id,
        subject,
        course
      }
    })
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
          refreshing={this.state.refreshing}
          data={this.state.messages}
          keyExtractor={(item, index) => index} // cant use index b/c they are duplicates
          onEndReached={this._getMoreConversations}
          onEndReachedThreshold={0.01}
          onRefresh={this._onRefresh.bind(this)}
          renderItem={({item}) => (
            <ListItem
              roundAvatar
              hideChevron
              subtitleContainerStyle={styles.messageSubtitle}
              containerStyle={styles.messageContainer}
              title={this._showSubject(item)}
              subtitle={this._showMessage(item)}
              onPress={() => this._getConversationDetails(item.id,
                item.subject,
                item.context_name)}
              subtitleNumberOfLines={2}
              avatar={{uri: item.avatar_url}}
            />
          )}
        />
      </View>
    )
  }
}
