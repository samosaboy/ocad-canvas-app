import React, { Component } from 'react'
import { Alert, ScrollView, TextInput } from 'react-native'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { stringify } from 'qs'
import { List, ListItem } from 'react-native-elements'
import { IconsMap, IconsLoaded } from '../../Common/Icons'
import API from '../../Services/Api'
import styles from './InboxScreenStyles d'
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
      message: ''
    }
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._renderNavComponents()
  }
  //
  // componentDidMount () {
  //   console.log(this.props.selectedCourseName)
  // }
  //
  // componentDidUpdate () {
  //   console.log(this.props)
  // }

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
        if (this.state.text) {
          Alert.alert(
            'Are you sure?',
            'You will lose the contents of this message if you continue.',
            [
              { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'Continue',
                onPress: () => {
                  this.props.navigator.dismissModal({
                    animationType: 'slide-down'
                  })
                }
              }
            ], { cancelable: false })
        } else if (!this.state.text) {
          this.props.navigator.dismissModal({
            animationType: 'slide-down'
          })
        }
      }
      if (event.id === 'send') {
        const queryParams = stringify({ recipients: [this.props.selectedUserId], body: this.state.message }, { arrayFormat: 'brackets' })
        this.api.postUserConversation(queryParams)
        this.props.actions.createMessageSent()
        this.props.navigator.dismissModal({
          animationType: 'slide-down'
        })
      }
    }
  }

  _popupCourseList () {
    this.props.navigator.showLightBox({
      screen: 'CreateMessageSelectCourse',
      adjustSoftInput: 'resize',
      style: {
        backgroundBlur: 'light',
        backgroundColor: '#00000080'
      }
    })
  }

  _popupUserList () {
    this.props.navigator.showLightBox({
      screen: 'CreateMessageSelectUser',
      adjustSoftInput: 'resize',
      style: {
        backgroundBlur: 'light',
        backgroundColor: '#00000080'
      }
    })
  }

  render () {
    // Fetch list of user's courses
    // On click -> fetch participants of that course
    // On click -> use that user_id for creation of message
    return (
      <ScrollView>
        <List>
          <ListItem
            title={this.props.courseName ? this.props.courseName : 'Select A Course'}
            onPress={() => this._popupCourseList()}
          />
          <ListItem
            title={this.props.selectedUserName ? this.props.selectedUserName : 'Select A User'}
            onPress={() => this._popupUserList()}
          />
        </List>
        <List>
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
        </List>
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
