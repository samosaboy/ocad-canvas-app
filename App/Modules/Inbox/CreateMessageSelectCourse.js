import React, { Component } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Divider, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styles from '../../Components/Styles/LightBoxStyles'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageSelectCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemHeight: 0
    }
  }

  componentDidMount () {
    this.setState({itemHeight: this.props.courseList.length * 60})
    console.tron.log(this.props)
  }

  _closeModal () {
    this.props.navigator.dismissLightBox()
  }

  _dismissCourseListView (id, name) {
    this.props.actions.createMessageSelectCourse(id,
      name)
    this.props.actions.createMessagePopulateUsers(id)
    this._closeModal()
  }

  render () {
    return (
      <View style={styles.lightBoxContainer}>
        <View style={[styles.lightBoxContent]}>
          <ScrollView>
            {this.props.courseList.map(course => (
              <ListItem
                hideChevron
                title={<Text style={styles.link}>{course.course_code}</Text>}
                titleNumberOfLines={1}
                key={course.id}
                containerStyle={[styles.userNav, {marginTop: 0, borderBottomColor: '#E1E8EE'}]}
                onPress={() => this._dismissCourseListView(course.id, course.name)}
              />
            ))}
          </ScrollView>
          <Divider />
          <TouchableOpacity onPress={() => this._closeModal()}>
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
    courseName: state.messageReducer.courseName
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
  CreateMessageSelectCourse)
