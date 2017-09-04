import React, { Component } from 'react'
import { ScrollView, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { List, ListItem } from 'react-native-elements'
import styles from '../../Components/Styles/LightBoxStyles'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as homeActions from '../../Redux/Actions/homeActions'

class CreateMessageSelectCourse extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  _closeModal () {
    this.props.navigator.dismissLightBox()
  }

  _dismissCourseListView (id, name) {
    this.props.actions.createMessageSelectCourse(id, name)
    this.props.actions.createMessagePopulateUsers(id)
    this.props.navigator.dismissLightBox()
  }

  render () {
    // TODO: Come back to the way you add Icons here...
    return (
      <View style={styles.lightBoxContainer}>
        <TouchableOpacity style={styles.lightBoxIcon} onPress={() => this._closeModal()}>
          <Icon name='ios-close' size={40} color='#000000' />
        </TouchableOpacity>
        <ScrollView style={styles.lightBoxContent}>
          <List style={{ marginTop: 0 }}>
            {
              this.props.courseList.map((course) => (
                <ListItem
                  hideChevron
                  title={course.name}
                  titleStyle={{ marginLeft: 0 }}
                  key={course.id}
                  style={[styles.lightBoxList, styles.lightBoxListWider]}
                  onPress={() => this._dismissCourseListView(course.id, course.name)}
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
    courseName: state.messageReducer.courseName
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageSelectCourse)
