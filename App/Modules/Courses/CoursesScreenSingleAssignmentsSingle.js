import moment from 'moment'
import React from 'react'
import { ActionSheetIOS, Linking, ScrollView, Text, View } from 'react-native'
import { Divider } from 'react-native-elements'
import HTMLView from 'react-native-htmlview'
import { IconsMap } from '../../Common/Icons'
import ScreenLadda from '../../Components/ScreenLadda'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'

export default class CoursesScreenSingleAssignments extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    tabBarHidden: true
  }
  api = {}
  _getCourseAssignmentsSingle = () => {
    this.api.getCourseAssignmentsSingle(this.props.courseId,
      this.props.assignId)
    .then((response) => {
      console.tron.log(response)
      if (response.status === 200) {
        this.setState({
          assignment: response.data,
          loading: false
        })
      }
    })
  }
  _formatDate = (date) => {
    return moment(date,
      moment.ISO_8601)
    .format('D MMM hh:mm A')
  }
  _showRubric = (assignment) => {
    return (
      <View>
        <Divider />
        <View style={styles.rubricContainer}>
          <Text style={styles.heading}>Rubric</Text>
          {assignment.rubric.map(rubric => {
            return (
              <View key={rubric.id} style={{marginBottom: 20}}>
                <Text style={styles.rubricHeader}>
                  {rubric.description} ({rubric.points} points)
                </Text>
                {rubric.long_description
                  ? <Text>{rubric.long_description}</Text>
                  : null}
                {rubric.ratings
                  ? (
                    rubric.ratings.map((rating) => (
                      <Text style={{marginTop: 5}} key={rating.id}>{(rating.points)} - {rating.description}</Text>
                    ))
                  )
                  : null}
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      assignment: {},
      loading: true
    }
    this.api = API.create()
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this._renderNavComponents()
  }

  _renderNavComponents () {
    this.props.navigator.setButtons({
      rightButtons: [
        {
          title: 'Share',
          id: 'share',
          disabled: false,
          disableIconTint: false,
          showAsAction: 'ifRoom',
          icon: IconsMap['share']
        }
      ]
    })
  }

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'share') {
        ActionSheetIOS.showShareActionSheetWithOptions({
          title: this.state.assignment.name,
          message: 'Hi! I am sharing this OCAD Assignment with you! Sent from the OCADU App.',
          url: this.state.assignment.html_url,
          subject: `I just shared an OCADU Assignment with you!`
        },
          (error) => {
            console.error(error)
          },
          (success, method) => {
            let text
            if (success) {
              text = `Shared via ${method}`
            } else {
              text = 'You didn\'t share'
            }
            console.log(text)
          })
      }
    }
  }

  componentDidMount () {
    this._getCourseAssignmentsSingle()
  }

  _renderNode (node, index, siblings, parent, defaultRenderer) {
    if (node.name === 'img') {
      // TODO: Fix image (proper width and clicking to zoom etc)
      return (
        <Text key={index} style={{textDecorationLine: 'underline'}}
          onPress={() => Linking.openURL(node.attribs.src)}>{node.attribs.src}</Text>
      )
    }
  }

  render () {
    const {assignment} = this.state
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting assignment'} />
      )
    }
    return (
      <ScrollView>
        <View style={{
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20
        }}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.heading}>{assignment.name}</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Due Date</Text>
              {assignment.due_at
                ? <Text style={styles.infoDesc}>{this._formatDate(assignment.due_at)}</Text>
                : null}
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoTitle}>Points Possible</Text>
              <Text style={styles.infoDesc}>{assignment.points_possible}</Text>
            </View>
            <HTMLView
              renderNode={this._renderNode}
              value={assignment.description.replace(/<p>(.*)<\/p>/g,
                '$1\r\n')
              .replace(/<br>/g,
                '')}
              onLinkPress={(url) => Linking.openURL(url)}
            />
          </View>
          {assignment.rubric
            ? this._showRubric(assignment)
            : null}
        </View>
      </ScrollView>
    )
  }
}
