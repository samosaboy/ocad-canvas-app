import _ from 'lodash'
import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Divider, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { height } from 'react-native-dimension'
import { bindActionCreators } from 'redux'
import styles from '../../Components/Styles/LightBoxStyles'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageSelectUser extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount () {
    this.setState({itemHeight: this.props.possibleUsers.length * 60})
    if (this.props.possibleUsers.length > 7) {
      this.setState({itemHeight: 436})
    }
  }

  _closeModal () {
    this.props.navigator.dismissLightBox()
  }

  _dismissCourseUserView (id, name) {
    this.props.actions.createMessageSelectUser(id,
      name)
    this.props.navigator.dismissLightBox()
  }

  render () {
    return (
      <View style={styles.lightBoxContainer}>
        <View style={[styles.lightBoxContent]}>
          <ScrollView style={{maxHeight: height(60)}}>
            {this.props.possibleUsers.map(user => (
              <ListItem
                roundAvatar
                hideChevron
                avatar={{uri: user.avatar_url}}
                title={user.name}
                titleStyle={{marginLeft: 10}}
                containerStyle={[{marginTop: 0, borderBottomColor: '#E1E8EE'}]}
                key={user.id}
                label={_.head(_.flatMap(user.common_courses)) === 'TeacherEnrollment'
                  ? <Text style={styles.lightBoxListLabel}>(Instructor)</Text>
                  : null}
                rightTitleContainerStyle={{
                  flex: 1,
                  alignItems: 'flex-start'
                }}
                onPress={() => this._dismissCourseUserView(user.id,
                  user.name)}
              />
            ))}
          </ScrollView>
          <TouchableOpacity onPress={() => this._closeModal()}>
            <Divider />
            <Text style={[styles.link, styles.close]}>Cancel</Text>
          </TouchableOpacity>
        </View>
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
    actions: bindActionCreators(homeActions,
      dispatch)
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(
  CreateMessageSelectUser)
