// import _ from 'lodash'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { FlatList, View } from 'react-native'
import API from '../Services/Api'
import { ListItem } from 'react-native-elements'
// import styles from './Styles/CourseScreenStyles'
import ScreenLadda from '../Components/ScreenLadda'

export default class InboxScreen extends React.Component {
  static navigationOptions = {
    title: 'My Messages',
    tabBarLabel: 'Inbox',
    tabBarIcon: ({tintColor}) => (
      <Icon name='ios-chatboxes-outline' size={25} style={{color: tintColor}} />
    )
  }
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      messages: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    console.tron.log('test2') // not running when switching to Inbox, runs on Courses
    return this.api.getUserConversations()
      .then((response) => {
        console.tron.log(response.data)
        this.setState({ messages: response.data, loading: false })
        // TODO: For unread messages, compare now timestamp with messages.last_message_at ?
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
          data={this.state.messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              roundAvatar
              title={item.participants[0].name}
              subtitle={item.last_message}
              avatar={{ uri: item.avatar_url }}
            />
          )}
        />
      </View>
    )
  }
}
