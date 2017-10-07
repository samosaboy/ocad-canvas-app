import React from 'react'
import { Linking, View, Text, ScrollView } from 'react-native'
import API from '../../Services/Api'
import moment from 'moment'
import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'
import HTMLView from 'react-native-htmlview'

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
      assignment: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseAssignmentsSingle()
  }

  _getCourseAssignmentsSingle = () => {
    this.api.getCourseAssignmentsSingle(this.props.courseId, this.props.assignId)
      .then((response) => {
        console.tron.log(response.data)
        this.setState({ assignment: response.data, loading: false })
      })
  }

  _formatDate = (date) => {
    return moment.utc(date).format('D MMMM YYYY HH:mm')
  }

  _showRubric = (assignment) => {
    return (
      <View style={styles.rubricContainer}>
        <Text style={styles.heading}>Rubric</Text>
        {
          assignment.rubric.map(rubric => {
            return (
              <View key={rubric.id} style={{ marginBottom: 20 }}>
                <Text style={styles.rubricHeader}>
                  {rubric.description} ({rubric.points}
                  {
                    assignment.grading_type === 'percent' ? '%' : ' points'
                  })
                </Text>
                <Text>{rubric.long_description}</Text>
              </View>
            )
          })
        }
      </View>
    )
  }

  render () {
    const { assignment } = this.state
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting assignment'} />
      )
    }
    return (
      <ScrollView>
        <View style={{ paddingLeft: 30, paddingRight: 30 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.heading}>{assignment.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Due Date</Text>
              <Text style={styles.infoDesc}>{this._formatDate(assignment.due_at)}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Points Possible</Text>
              <Text style={styles.infoDesc}>{assignment.points_possible}</Text>
            </View>
            <HTMLView
              value={assignment.description.replace(/<p>(.*)<\/p>/g, '$1\r\n').replace(/<br>/g, '')}
              onLinkPress={(url) => Linking.openURL(url)}
            />
          </View>
          {
            assignment.rubric
              ? this._showRubric(assignment)
              : null
          }
        </View>
      </ScrollView>
    )
  }
}
