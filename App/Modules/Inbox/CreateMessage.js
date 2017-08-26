import React from 'react'
import { Text, View, Picker, TextInput } from 'react-native'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { Card, List, ListItem} from 'react-native-elements'
import { IconsMap, IconsLoaded } from '../../Common/Icons'
import styles from './InboxScreenStyles'

export default class CreateMessageScreen extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }

  constructor (props) {
    super(props)
    this.state = {
      language: {},
      text: ''
    }
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

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'cancel') {
        this.props.navigator.dismissModal({
          animationType: 'slide-down'
        })
      }
    }
  }

  render () {
    // Fetch list of user's courses
    // On click -> fetch participants of that course
    // On click -> use that user_id for creation of message
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <List>
          <ListItem
            hideChevron
            textInput
            textInputMultiline
            textInputPlaceholder='Enter your message'
            style={[styles.noBorderContainer, styles.textInput]}
          />
        </List>
      </View>
    )
  }
}
