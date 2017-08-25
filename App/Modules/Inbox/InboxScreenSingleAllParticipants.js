import React from 'react'
import { ScrollView, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

export default class CoursesScreenSingle extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `Member List`
  })
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      messages: {},
      loading: false
    }
    this.api = API.create()
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Finding your friends'} />
      )
    }
    return (
      <ScrollView
        style={styles.messageContainer}
        automaticallyAdjustContentInsets={false}>
        <View>
          {this.props.navigation.state.params.members.map((participants) => (
            <ListItem
              roundAvatar
              hideChevron
              avatar={{uri: participants.avatar_url}}
              key={participants.id}
              title={participants.name}
            />
          ))}
        </View>
      </ScrollView>
    )
  }
}
