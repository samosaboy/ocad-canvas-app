import React from 'react'
import { Text, Alert, ScrollView, TextInput } from 'react-native'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { List, ListItem } from 'react-native-elements'
import { IconsMap, IconsLoaded } from '../../Common/Icons'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'

export default class CreateMessageScreen extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      courseList: [],
      text: ''
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
            title: 'New',
            id: 'new',
            disabled: false,
            disableIconTint: false,
            showAsAction: 'ifRoom',
            icon: IconsMap['send']
          }
        ]
      })
    })
  }

  componentDidMount () {
    this.api.getCourses()
      .then((response) => {
        this.setState({ courseList: response.data })
        console.log(this.state.courseList)
      }).catch((e) => {
        console.log(e)
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
    }
  }

  _popupCourseList () {
    this.props.navigator.showLightBox({
      screen: 'CreateMessageSelectCourse',
      adjustSoftInput: 'resize',
      passProps: {
        courseList: this.state.courseList
      },
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
        <Text>{this.props.selectedId}</Text>
        <List>
          <ListItem
            title={this.props.selectedName}
            onPress={() => this._popupCourseList()}
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
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
            }
            subtitleContainerStyle={[styles.noBorderContainer]}
          />
        </List>
      </ScrollView>
    )
  }
}
