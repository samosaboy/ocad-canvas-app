import _ from 'lodash'
import { stringify } from 'qs'
import React, { Component } from 'react'
import { Keyboard, Alert, Dimensions, ScrollView, TextInput, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Colors from '../../Common/Colors'
import { IconsLoaded, IconsMap } from '../../Common/Icons'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import * as homeActions from '../../Redux/Actions/homeActions'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'

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
      const courseName = _.find(this.props.courseList,
        ['id', this.props.psCourseId]).name
      this.props.actions.createMessagePreSelected(this.props.psCourseId,
        this.props.psUserId,
        courseName,
        this.props.psUserName)
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
              {
                text: 'Cancel',
                style: 'cancel'
              }, {
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
          Alert.alert('Success',
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
            ])
        } else if (!this.state.text || !this.props.courseId || !this.props.selectedUserId) {
          Alert.alert('Error',
            'You must pick a user and have a message.',
            {cancelable: false})
        }
      }
    }
  }

  _popupCourseList () {
    Keyboard.dismiss()
    this.props.navigator.showLightBox({
      screen: 'CreateMessageSelectCourse',
      adjustSoftInput: 'resize',
      style: {
        tapBackgroundToDismiss: true,
        backgroundColor: '#00000060'
      }
    })
    this.setState({errorMessage: null})
  }

  _popupUserList (e) {
    Keyboard.dismiss()
    if (this.props.courseId && this.props.possibleUsersLoaded) {
      this.setState({errorMessage: null})
      this.props.navigator.showLightBox({
        screen: 'CreateMessageSelectUser',
        adjustSoftInput: 'resize',
        title: 'Create Message',
        style: {
          tapBackgroundToDismiss: true,
          backgroundColor: '#00000060'
        }
      })
    }
    if (e && !this.props.courseId) {
      this.setState({errorMessage: 'You must first select a course'})
    }
  }

  render () {
    const { height } = Dimensions.get('window')
    return (
      <View style={{display: 'flex', paddingTop: 10, height}}>
        <View style={{ flex: 0.18 }}>
          <ListItem
            title={this.props.courseName
              ? this.props.courseName
              : 'Select a Course'}
            containerStyle={[styles.noBorderContainer, styles.dropDownContainer]}
            onPress={() => this._popupCourseList()}
          />
          <ListItem
            // title={this.props.selectedUserName && this.props.possibleUsersLoaded ? this.props.selectedUserName : 'Select A User'}
            title={this.state.errorMessage
              ? this.state.errorMessage
              : (this.props.selectedUserName && this.props.possibleUsersLoaded) || this.props.selectedUserName
                ? this.props.selectedUserName
                : 'Select a User'}
            onPress={(e) => this._popupUserList(e)}
            containerStyle={[styles.noBorderContainer, styles.dropDownContainer, {marginTop: 10}]}
          />
        </View>
        <View style={{marginLeft: 20, marginRight: 20, flex: 0.66}}>
          <TextInput
            placeholder='Enter a title'
            style={[styles.textInput, { borderBottomColor: Colors.borderLight, borderBottomWidth: 1 }]}
            onChangeText={(title) => this.setState({title})}
            value={this.state.title}
          />
          <ScrollView>
            <TextInput
              multiline
              placeholder='Enter a message'
              style={styles.textInput}
              onChangeText={(message) => this.setState({message})}
              value={this.state.message}
            />
          </ScrollView>
        </View>
      </View>
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
    actions: bindActionCreators(homeActions,
      dispatch)
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(
  CreateMessageScreen)
