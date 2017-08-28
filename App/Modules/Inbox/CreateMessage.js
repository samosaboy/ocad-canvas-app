import React, { Component } from 'react'
import { Text, Alert, ScrollView, TextInput, View } from 'react-native'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { stringify } from 'qs'
import { ListItem } from 'react-native-elements'
import { IconsMap, IconsLoaded } from '../../Common/Icons'
import API from '../../Services/Api'
import styles from './CreateMessageStyles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageScreen extends Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      errorMessage: null,
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
        if (this.state.text || this.props.courseId || this.props.selectedUserId) {
          Alert.alert(
            'Are you sure?',
            'You will lose the contents of this message if you continue.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Continue',
                onPress: () => {
                  this.props.actions.createMessageSent()
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down'
                  })
                }
              }
            ])
        } else if (!this.state.text) {
          this.props.actions.createMessageSent()
          this.props.navigator.dismissModal({
            animationType: 'slide-down'
          })
        }
      }
      if (event.id === 'send') {
        if (this.state.message && this.props.courseId && this.props.selectedUserId) {
          const queryParams = stringify({
            recipients: [this.props.selectedUserId],
            body: this.state.message
          }, {arrayFormat: 'brackets'})
          this.api.postUserConversation(queryParams)
          this.props.actions.createMessageSent()
          Alert.alert('Success', 'Message sent!')
          this.props.navigator.dismissModal({
            animationType: 'slide-down'
          })
        } else if (!this.state.text || !this.props.courseId || !this.props.selectedUserId) {
          Alert.alert(
            'Error',
            'You must pick a user and have a message.',
            {cancelable: false})
        }
      }
    }
  }

  _popupCourseList () {
    this.props.navigator.showLightBox({
      screen: 'CreateMessageSelectCourse',
      adjustSoftInput: 'resize',
      style: {
        backgroundBlur: 'light',
        backgroundColor: '#00000030'
      }
    })
  }

  _popupUserList (e) {
    if (this.props.courseId) {
      this.setState({ errorMessage: null })
      this.props.navigator.showLightBox({
        screen: 'CreateMessageSelectUser',
        adjustSoftInput: 'resize',
        style: {
          backgroundBlur: 'light',
          backgroundColor: '#00000030'
        }
      })
    }
    if (e && !this.props.courseId) {
      this.setState({ errorMessage: 'You must first select a course' })
    }
  }

  render () {
    // Fetch list of user's courses
    // On click -> fetch participants of that course
    // On click -> use that user_id for creation of message
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#FFF' }}>
          <ListItem
            title={this.props.courseName ? this.props.courseName : 'Select A Course'}
            onPress={() => this._popupCourseList()}
          />
          <ListItem
            title={this.props.selectedUserName ? this.props.selectedUserName : 'Select A User'}
            subtitle={this.state.errorMessage && !this.props.courseName ? <Text style={styles.textError}>{this.state.errorMessage}</Text> : null}
            onPress={(e) => this._popupUserList(e)}
          />
          <ListItem
            hideChevron
            // title='Test'
            titleStyle={styles.textLabel}
            subtitle={
              <TextInput
                multiline
                placeholder='Enter your message'
                style={styles.textInput}
                onChangeText={(message) => this.setState({ message })}
                value={this.state.message}
              />
            }
            subtitleContainerStyle={[styles.noBorderContainer]}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseId: state.messageReducer.courseId,
    courseName: state.messageReducer.courseName,
    selectedUserId: state.messageReducer.selectedUserId,
    selectedUserName: state.messageReducer.selectedUserName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageScreen)
