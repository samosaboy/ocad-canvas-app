import _ from 'lodash'
import React, { Component } from 'react'
import { Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { List, ListItem } from 'react-native-elements'
import styles from '../../Components/Styles/LightBoxStyles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageSelectUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount () {
    this.setState({ itemHeight: this.props.possibleUsers.length * 60 })
    if (this.props.possibleUsers.length > 7) {
      this.setState({ itemHeight: 436 })
    }
  }

  _closeModal () {
    this.props.navigator.dismissLightBox()
  }

  _dismissCourseUserView (id, name) {
    this.props.actions.createMessageSelectUser(id, name)
    this.props.navigator.dismissLightBox()
  }

  render () {
    // TODO: Come back to the way you add Icons here...
    return (
      <View style={styles.lightBoxContainer}>
        <TouchableOpacity style={styles.lightBoxIcon} onPress={() => this._closeModal()}>
          <Icon name='close' size={35} color='#000000' />
        </TouchableOpacity>
        <ScrollView style={[styles.lightBoxContent, { maxHeight: this.state.itemHeight }]}>
          <List style={{ marginTop: 0 }}>
            {
            this.props.possibleUsers.map((user) => (
              <ListItem
                roundAvatar
                hideChevron
                avatar={{uri: user.avatar_url}}
                title={user.name}
                titleStyle={{ marginLeft: 10 }}
                key={user.id}
                style={styles.lightBoxList}
                label={_.head(_.flatMap(user.common_courses)) === 'TeacherEnrollment' ? <Text style={styles.lightBoxListLabel}>(Instructor)</Text> : null}
                rightTitleContainerStyle={{ flex: 1, alignItems: 'flex-start' }}
                onPress={() => this._dismissCourseUserView(user.id, user.name)}
              />
            ))
          }
          </List>
        </ScrollView>
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
