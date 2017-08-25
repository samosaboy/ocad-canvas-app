import _ from 'lodash'
import React from 'react'
import { stringify } from 'qs'
import { ScrollView, View, Text } from 'react-native'
import { ListItem } from 'react-native-elements'
import moment from 'moment'
import API from '../../Services/Api'
import styles from './InboxScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

export default class CoursesScreenSingle extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.subject}`
  })
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      messages: {},
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    const queryParams = stringify({ conversation: { 'workflow_state': 'read' } }, { arrayFormat: 'brackets' })
    this.api.editUserConversationSingle(this.props.navigation.state.params.id, queryParams)
    this.api.getUserConversationSingle(this.props.navigation.state.params.id)
      .then((response) => {
        this.setState({
          messages: response.data,
          loading: false
        })
      }).catch((e) => {
        console.log(e)
      })
  }

  _formatDate (date) {
    return moment.utc(date).fromNow()
  }

  _getConversationParticipants = (members) => {
    const { navigate } = this.props.navigation
    navigate('SingleConversationViewListParticipants', { members })
  }

  _showCourseName = (name) => {
    return _.truncate(name, { length: 30, seperator: '...' })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting conversation'} />
      )
    }
    return (
      <ScrollView>
        <View style={styles.seeAll}>
          <ListItem
            // title={this._showCourseName(this.state.messages.context_name)}
            hideChevron
            title='Course'
            subtitle={this.state.messages.context_name}
            onPress={() => this._getConversationParticipants(this.state.messages.participants)}
            subtitleStyle={styles.courseNameTitle}
            titleStyle={styles.courseNameSubtitle}
          />
          <ListItem
            // title={this._showCourseName(this.state.messages.context_name)}
            title='See all in conversation'
            badge={{value: this.state.messages.participants.length, textStyle: { color: 'white' }, containerStyle: styles.messageCount}}
            onPress={() => this._getConversationParticipants(this.state.messages.participants)}
          />
        </View>
        <View>
          {this.state.messages.messages.map((messages, index) => (
            <View key={index}>
              <ListItem
                roundAvatar
                hideChevron
                avatar={{uri: _.find(this.state.messages.participants, ['id', messages.author_id]).avatar_url}}
                key={messages.id}
                title={_.find(this.state.messages.participants, ['id', messages.author_id]).name}
                rightTitle={this._formatDate(messages.created_at)}
              />
              <View style={_.isEqual(index, 0)
                ? [styles.messageContainer, styles.fullMessageText, styles.marginBottom]
                : [styles.messageContainer, styles.fullMessageText, styles.noMarginBottom, styles.conversationThread]}>
                <View style={styles.messageContentContainer}>
                  <View style={styles.messageTextContainer}>
                    <View>{_.isEqual(index, 0)
                      ? `${this.props.navigation.state.params.subject}` === ''
                        ? <Text style={[styles.fullMessageTitle]}>(No Subject)</Text>
                        : <Text style={[styles.fullMessageTitle]} key={messages.id}>{this.props.navigation.state.params.subject}</Text>
                      : null}
                    </View>
                    <Text key={messages.id}>
                      {messages.body}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    )
  }
}
