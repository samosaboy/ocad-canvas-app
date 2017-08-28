import React, { Component } from 'react'
// import { View, Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageSelectCourse extends Component {
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
    this.api = API.create()
  }

  _dismissCourseListView (id, name) {
    this.props.actions.createMessageSelectCourse(id, name)
    this.props.actions.createMessagePopulateUsers(id)
    this.props.navigator.dismissLightBox()
  }

  render () {
    return (
      <List>
        {
          this.props.courseList.map((course) => (
            <ListItem
              title={course.name}
              key={course.id}
              onPress={() => this._dismissCourseListView(course.id, course.name)}
            />
          ))
        }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseList: state.courseReducer.courseList,
    courseId: state.messageReducer.courseId,
    courseName: state.messageReducer.courseName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageSelectCourse)
