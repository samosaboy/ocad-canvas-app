import _ from 'lodash'
import React from 'react'
import { Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import moment from 'moment'
import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleGrades extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  constructor (props) {
    super(props)
    this.state = {
      submissions: [],
      assignments: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseGrades()
    this._getCourseAssignments()
    this.setState({ loading: false })
    if (this.state.loading) {
      setTimeout(() => {
        console.tron.log(this.state)
      }, 1000)
    }
  }

  _getCourseGrades = () => {
    this.api.getCourseSubmissions(this.props.id)
      .then((response) => {
        this.setState({ submissions: response.data })
      })
  }

  _getCourseAssignments = () => {
    this.api.getCourseAssignments(this.props.id)
      .then((response) => {
        this.setState({ assignments: response.data })
      })
  }

  showAssignmentInfo = (assignment) => {
    return (
      <Text style={styles.assignmentName}>{assignment.name}</Text>
    )
  }

  _formatDate = (date) => {
    return moment.utc(date).format('D MMM YYYY')
  }

  showAssignmentSubtitle = (assignment) => {
    if (!_.isNull(assignment.due_at)) {
      return (
        <Text style={styles.assignmentDueDate}>{this._formatDate(assignment.due_at)}</Text>
      )
    }
    return null
  }

  showAssignmentDetails = (assignment) => {
    const match = _.find(this.state.submissions, ['assignment_id', assignment.id])
    if (match.grade) {
      return (
        <Text>{match.grade} / {assignment.points_possible}</Text>
      )
    }
    if (_.isNull(match.grade)) {
      return (<Text>No Grade</Text>)
    }
    return (
      <Text>No grade information available</Text>
    )
  }

  goToAssignment = (courseId, assignId) => {
    this.props.navigator.push({
      screen: 'CoursesScreenSingleAssignmentsSingle',
      passProps: {
        courseId,
        assignId
      }
    })
  }

  goToSubmission = (courseId, assignId) => {
    const userId = _.find(this.state.submissions, ['assignment_id', assignId]).user_id
    this.props.navigator.push({
      screen: 'CoursesScreenSingleGradesSingle',
      passProps: {
        courseId,
        assignId,
        userId
      }
    })
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting assignments'} />
      )
    }
    return (
      <ScrollView>
        <ListItem
          hideChevron
          containerStyle={[styles.listContainer, { paddingLeft: 10, paddingRight: 20 }]}
          title={<Text style={styles.labelTitle}>Assignment</Text>}
          titleStyle={styles.headerTitle}
          label={<Text style={styles.labelTitle}>Due Date</Text>}
        />
        {this.state.assignments.map((assignment) => (
          <ListItem
            hideChevron
            containerStyle={[styles.listContainer, styles.pageTableContainer, { paddingTop: 25, paddingBottom: 25 }]}
            key={assignment.id}
            title={this.showAssignmentInfo(assignment)}
            // subtitleStyle={styles.subTitleText}
            label={this.showAssignmentSubtitle(assignment)}
            labelStyle={styles.subtitleText}
            subtitle={this.showAssignmentDetails(assignment)}
            onLongPress={() => this.goToAssignment(assignment.course_id, assignment.id)}
            onPress={() => this.goToSubmission(this.props.id, assignment.id)}
          />
        ))}
      </ScrollView>
    )
  }
}
