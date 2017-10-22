import React, { Component } from 'react'
import { Alert, ScrollView, TextInput, View } from 'react-native'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { stringify } from 'qs'
import styles from './InboxScreenStyles'
import { ListItem } from 'react-native-elements'
import { IconsMap, IconsLoaded } from '../../Common/Icons'
import API from '../../Services/Api'

export default class SingleConversationReply extends Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      message: ''
    }
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._renderNavComponents()
  }

  _renderNavComponents () {
    IconsLoaded.then(() => {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            title: 'cancel',
            id: 'cancel',
            disabled: false,
            disableIconTint: false,
            showAsAction: 'ifRoom',
            icon: IconsMap['close']
          }
        ],
        rightButtons: [
          {
            title: 'Send',
            id: 'send',
            disabled: false,
            disableIconTint: false,
            showAsAction: 'ifRoom',
            icon: IconsMap['send']
          }
        ]
      })
    })
  }

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        if (this.state.message) {
          Alert.alert(
            'Are you sure?',
            'You will lose the contents of this message if you continue.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Continue',
                onPress: () => {
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down'
                  })
                }
              }
            ])
        } else if (!this.state.message) {
          this.props.navigator.dismissModal({
            animationType: 'slide-down'
          })
        }
      }
      if (event.id === 'send') {
        const queryParams = stringify({ body: this.state.message })
        if (this.state.message) {
          this.api.replyUserConversation(this.props.id, queryParams)
          Alert.alert(
            'Success',
            'Message sent!',
            [
              {
                text: 'Ok',
                onPress: () => {
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down'
                  })
                }
              }
            ]
          )
        } else if (!this.state.message) {
          Alert.alert(
            'Error',
            'You must have a message.',
            {cancelable: false})
        }
      }
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#FFF' }}>
          <ListItem
            hideChevron
            titleStyle={styles.textLabel}
            subtitle={
              <View>
                <TextInput
                  multiline
                  placeholder='Enter a message'
                  style={styles.textInput}
                  onChangeText={(message) => this.setState({ message })}
                  value={this.state.message}
                />
              </View>
            }
            subtitleContainerStyle={[styles.noBorderContainer]}
          />
        </View>
      </ScrollView>
    )
  }
}
