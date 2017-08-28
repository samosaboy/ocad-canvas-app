import React, { Component } from 'react'
import { View } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageSelectUser extends Component {
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.api = API.create()
  }

  _dismissCourseListView (id, name) {
    this.props.actions.createMessageSelectUser(id, name)
    this.props.navigator.dismissLightBox()
  }

  render () {
    // return (
    //   <View>
    //     <Text>{this.props.courseId}</Text>
    //   </View>
    // )
    return (
      <View>
        <List>
          {
            this.props.possibleUsers.map((user) => (
              <ListItem
                title={user.name}
                key={user.id}
                onPress={() => this._dismissCourseListView(user.id, user.name)}
              />
            ))
          }
        </List>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseList: state.courseReducer.courseList,
    courseId: state.messageReducer.courseId,
    possibleUsers: state.messageReducer.possibleUsers,
    selectedUserId: state.messageReducer.selectedUserId,
    selectedUserName: state.messageReducer.selectedUserName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageSelectUser)
