import _ from 'lodash'
import moment from 'moment'
// import { stringify } from 'qs'
import React, { Component } from 'react'
import { Alert, Linking, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { IconsMap } from '../../Common/Icons'
import { Colors } from '../../Common/index'
import AttachmentIcon from '../../Components/AttachmentIcon'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'

export default class InboxScreenSingle extends Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: true,
    statusBarHideWithNavBar: true,
    tabBarHidden: true
  }

  api = {}

  _formatDate = (date) => {
    return moment.utc(date).fromNow()
  }

  _getConversationParticipants = (members) => {
    this.props.navigator.push({
      screen: 'SingleConversationViewListParticipants',
      title: 'People in conversation',
      passProps: {
        members
      }
    })
  }

  _showCourseName = (name) => {
    return _.truncate(name,
      {
        length: 30,
        seperator: '...'
      })
  }

  convertFromByte = (byte, decimals) => {
    if (byte > 0) {
      const k = 1024
      const dm = decimals || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(byte) / Math.log(k))
      return parseFloat((byte / Math.pow(k,
        i)).toFixed(dm)) + ' ' + sizes[i]
    }
    return byte === 0
      ? '0 Bytes'
      : null
  }

  _openAttachment = (url) => {
    Linking.openURL(url)
  }

  goToUser = (userId) => {
    // TODO: Fix group messages
    console.log(this.props.course)
    console.log(this.state.messages)
  }

  constructor (props) {
    super(props)
    this.state = {
      messages: {},
      loading: true
    }
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._renderNavComponents()
  }

  _renderNavComponents () {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: 'Reply',
          id: 'reply',
          disabled: false,
          disableIconTint: false,
          showAsAction: 'ifRoom',
          icon: IconsMap['reply']
        }, {
          title: 'View all people',
          id: 'people',
          disabled: false,
          disableIconTint: false,
          showAsAction: 'ifRoom',
          icon: IconsMap['people']
        }, {
          title: 'Delete conversation',
          id: 'delete',
          disabled: false,
          disableIconTint: false,
          showAsAction: 'ifRoom',
          icon: IconsMap['delete']
        }
      ]
    })
  }

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'reply') {
        this.props.navigator.showModal({
          screen: 'SingleConversationReply',
          title: 'Reply',
          passProps: {id: this.props.id}
        })
      } else if (event.id === 'people') {
        this._getConversationParticipants(this.state.messages.participants)
      }
      if (event.id === 'delete') {
        Alert.alert(
          'Are you sure you want to delete this message?',
          null,
          [
            {
              text: 'Cancel',
              style: 'cancel'
            }, {
              text: 'Continue',
              style: 'destructive',
              onPress: () => {
                this.api.deleteConversation(this.props.id)
                .then((response) => {
                  this.props.navigator.resetTo({
                    screen: 'InboxScreen',
                    animated: false
                  })
                })
              }
            }
          ])
      }
    }
  }

  componentDidMount () {
    // const queryParams = stringify({conversation: {'workflow_state': 'read'}}, {arrayFormat: 'brackets'})
    this.api.getUserConversationSingle(this.props.id)
    .then((response) => {
      this.setState({
        messages: response.data,
        loading: false
      })
    })
    .catch((e) => {
      console.log(e)
    })
    // if (this.state.messages.workflow_state === 'unread') {
    //   this.api.editUserConversationSingle(this.props.id, queryParams)
    // }
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting conversation'} />
      )
    }
    return (
      <ScrollView>
        <View>
          {this.state.messages.messages.map((messages, index) => (
            <View key={index} style={{marginBottom: 5}}>
              <ListItem
                roundAvatar
                hideChevron
                avatar={{
                  uri: _.find(this.state.messages.participants,
                    ['id', messages.author_id]).avatar_url
                }}
                key={messages.id}
                title={_.find(this.state.messages.participants,
                  ['id', messages.author_id]).name}
                label={<Text style={styles.date}>{this._formatDate(messages.created_at)}</Text>}
                containerStyle={styles.authorContainer}
                onPress={() => this.goToUser(messages.author_id)}
              />
              {
                index === 0 && <View style={styles.metaContainer}>
                  {this.state.messages.subject !== '' && this.state.messages.subject !== null
                    ? <Text style={styles.fullMessageTitle}>{this.state.messages.subject}</Text>
                    : <Text style={styles.fullMessageTitle}>No Subject</Text>}
                  {this.state.messages.participants
                    ? (
                      <Text style={{marginTop: 5}}>
                        <Text style={{color: Colors.darkGrey}}>To:</Text>
                        {this.state.messages.participants.map((user, index) => (
                          ' ' + user.name + ((index + 1) === this.state.messages.participants.length
                            ? ''
                            : ',')
                        ))}
                      </Text>
                    )
                    : null}
                </View>
              }
              <View style={[styles.fullMessageTextContainer]}>
                <Text key={messages.id} style={styles.fullMessageText}>
                  {messages.body}
                </Text>
                <View style={messages.attachments.length
                  ? {marginTop: 15}
                  : {marginTop: 0}}>
                  {messages.attachments.length > 0 && messages.attachments.map((attachments, index) => (
                    <View style={{marginTop: 5}} key={attachments.id}>
                      {index === 0 && <View key={messages.attachments.length}>
                        <Text style={{
                          marginBottom: 5,
                          fontWeight: '600'
                        }}>Attachments
                          ({messages.attachments.length})</Text>
                      </View>}
                      <TouchableHighlight
                        onPress={() => this._openAttachment(attachments.url)}
                        key={attachments.id} underlayColor={Colors.transparent}>
                        <View style={styles.attachmentContainer} key={attachments.id}>
                          <AttachmentIcon style={styles.attachmentIcon} type={attachments.mime_class} />
                          <View style={styles.attachmentNameSizeContainer}>
                            <Text style={styles.attachmentName}>{attachments.display_name}</Text>
                            <Text style={styles.attachmentSize}>
                              ({attachments.size !== null
                              ? this.convertFromByte(attachments.size)
                              : 'Unknown Size'})
                            </Text>
                          </View>
                        </View>
                      </TouchableHighlight>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }
}
