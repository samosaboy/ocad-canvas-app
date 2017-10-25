import React from 'react'
import { Text, ScrollView } from 'react-native'
import { ListItem } from 'react-native-elements'
import API from '../../Services/Api'
import moment from 'moment'
import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleAssignments extends React.Component {
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
      assignments: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseAssignments()
  }

  _getCourseAssignments = () => {
    this.api.getCourseAssignments(this.props.id)
      .then((response) => {
        const entries = response.data.sort((a, b) => {
          const dateA = new Date(a.due_at)
          const dateB = new Date(b.due_at)
          return dateA - dateB
        })
        this.setState({ assignments: entries, loading: false })
      })
      .catch(() => {
        this.setState({ loading: true })
      })
  }

  _formatDate = (date) => {
    return moment(date, moment.ISO_8601).format('D MMM hh:mm A')
  }

  showAssignmentInfo = (assignment) => {
    return (
      <Text style={styles.assignmentName}>{assignment.name}</Text>
    )
  }

  showAssignmentSubtitle = (assignment) => {
    if (assignment.due_at) {
      return (
        <Text style={styles.assignmentDueDate}>{this._formatDate(assignment.due_at)}</Text>
      )
    }
    return null
  }

  getSingleAssignment = (assignId, name) => {
    const courseId = this.props.id
    this.props.navigator.push({
      screen: 'CoursesScreenSingleAssignmentsSingle',
      // backButtonTitle: '',
      passProps: {
        courseId,
        assignId
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
          label={<Text style={styles.labelTitle}>Due Date</Text>}
        />
        {this.state.assignments.map((assignment) => (
          <ListItem
            hideChevron
            containerStyle={[styles.listContainer, styles.pageTableContainer, { paddingTop: 25, paddingBottom: 25 }]}
            key={assignment.id}
            title={this.showAssignmentInfo(assignment)}
            label={this.showAssignmentSubtitle(assignment)}
            labelStyle={styles.subtitleText}
            subtitleNumberOfLines={2}
            onPress={() => this.getSingleAssignment(assignment.id)}
          />
        ))}
      </ScrollView>
    )
  }
}
