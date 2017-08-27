import React from 'react'
import { List, ListItem } from 'react-native-elements'
import API from '../../Services/Api'

export default class CreateMessageScreen extends React.Component {
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      courseList: [],
      selectedCourse: [],
      selectedUser: null,
      text: ''
    }
    this.api = API.create()
  }

  _dismissCourseListView (name, id) {
    this.props.navigator.dismissLightBox({
      passProps: {
        selectedName: name,
        selectedId: id
      }
    })
  }

  render () {
    return (
      <List>
        {
          this.props.courseList.map((course) => (
            <ListItem
              title={course.name}
              key={course.id}
              onPress={() => this._dismissCourseListView(course.name, course.id)}
            />
          ))
        }
      </List>
    )
  }
}
