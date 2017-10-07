import _ from 'lodash'
import React, { Component } from 'react'
import { Alert, ScrollView, TextInput, View } from 'react-native'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { stringify } from 'qs'
import { ListItem } from 'react-native-elements'
import { IconsMap, IconsLoaded } from '../../Common/Icons'
import API from '../../Services/Api'
import styles from '../../Components/Styles/LightBoxStyles'
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
      message: '',
      title: ''
    }
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._renderNavComponents()
  }

  componentDidMount () {
    this.props.actions.retrieveCourses('active')
    if (this.props.psCourseId && this.props.psUserId) {
      const courseName = _.find(this.props.courseList, [ 'id', this.props.psCourseId ]).name
      this.props.actions.createMessagePreSelected(this.props.psCourseId, this.props.psUserId, courseName, this.props.psUserName)
    }
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
        const queryParams = stringify({
          recipients: [this.props.selectedUserId],
          subject: this.state.title,
          body: this.state.message
        }, {arrayFormat: 'brackets'})
        if (this.state.message && this.props.courseId && this.props.selectedUserId) {
          this.api.postUserConversation(queryParams)
          this.props.actions.createMessageSent()
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
        backgroundColor: '#00000030',
        tapBackgroundToDismiss: true
      }
    })
    this.setState({ errorMessage: null })
  }

  _popupUserList (e) {
    if (this.props.courseId && this.props.possibleUsersLoaded) {
      this.setState({ errorMessage: null })
      this.props.navigator.showLightBox({
        screen: 'CreateMessageSelectUser',
        adjustSoftInput: 'resize',
        title: 'Create Message',
        style: {
          backgroundBlur: 'light',
          tapBackgroundToDismiss: true,
          backgroundColor: '#00000030'
        }
      })
    }
    if (e && !this.props.courseId) {
      this.setState({ errorMessage: 'You must first select a course' })
    }
  }

  render () {
    return (
      <ScrollView>
        <View style={{ backgroundColor: '#FFF' }}>
          <ListItem
            title={this.props.courseName ? this.props.courseName : 'Select A Course'}
            containerStyle={{ borderBottomWidth: 0.5 }}
            onPress={() => this._popupCourseList()}
          />
          <ListItem
            // title={this.props.selectedUserName && this.props.possibleUsersLoaded ? this.props.selectedUserName : 'Select A User'}
            title={this.state.errorMessage
              ? this.state.errorMessage
              : (this.props.selectedUserName && this.props.possibleUsersLoaded) || this.props.selectedUserName ? this.props.selectedUserName : 'Select A User'}
            onPress={(e) => this._popupUserList(e)}
            containerStyle={{ borderBottomWidth: 0.5 }}
          />
          <ListItem
            hideChevron
            // title='Test'
            titleStyle={styles.textLabel}
            subtitle={
              <View>
                <TextInput
                  placeholder='Enter a title'
                  style={[styles.textInput, { height: 50 }]}
                  onChangeText={(title) => this.setState({ title })}
                  value={this.state.title}
                />
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

const mapStateToProps = (state) => {
  return {
    courseId: state.messageReducer.courseId,
    courseName: state.messageReducer.courseName,
    possibleUsersLoaded: state.messageReducer.possibleUsersLoaded,
    selectedUserId: state.messageReducer.selectedUserId,
    selectedUserName: state.messageReducer.selectedUserName,
    courseList: state.courseReducer.courseList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageScreen)
