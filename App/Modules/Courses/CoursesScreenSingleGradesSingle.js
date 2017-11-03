import moment from 'moment'
import React from 'react'
import { Linking, ScrollView, Text, TouchableHighlight, View } from 'react-native'
import { ListItem } from 'react-native-elements'
import Pages from '../../Common/DeepPages'
import { Colors } from '../../Common/index'
import AttachmentIcon from '../../Components/AttachmentIcon'
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
  _getCourseSubmissionSingle = () => {
    this.api.getCourseSubmissionsSingle(this.props.courseId,
      this.props.assignId,
      this.props.userId)
    .then((response) => {
      this.setState({
        item: response.data,
        loading: false
      })
      console.tron.log(this.state.item)
    })
  }
  convertFromByte = (byte, decimals) => {
    if (byte > 0) {
      const k = 1024
      const dm = decimals || 2
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(byte) / Math.log(k))
      return parseFloat((byte / Math.pow(k,
        i)).toFixed(dm)) + ' ' + sizes[i]
    }
    return byte === 0
      ? '0 Bytes'
      : null
  }
  _openAttachment = (url) => {
    Linking.openURL(url)
  }
  _formatDate = (date) => {
    return moment(date,
      moment.ISO_8601)
    .format('MM/DD/YYYY h:mm A')
  }
  _daysLate = (duration) => {
    return moment.duration(duration,
      'seconds')
    .humanize()
  }
  _showRubric = (item) => {
    return (
      <View style={[styles.rubricContainer, Pages.viewContainer]}>
        <Text style={styles.heading}>Rubric</Text>
        {item.assignment.rubric.map(rubric => (
          <View key={rubric.id} style={{marginBottom: 20}}>
            <Text style={styles.rubricHeader}>
              {rubric.description} ({item.rubric_assessment[rubric.id].points} / {rubric.points} points)
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
            {item.rubric_assessment[rubric.id].comments
              ? (
                <View>
                  <Text style={[styles.rubricComments, styles.rubricCommentsHeader]}>Instructor's Comments:</Text>
                  <Text style={styles.rubricComments}>{item.rubric_assessment[rubric.id].comments}</Text>
                </View>
              )
              : null}
          </View>
        ))}
      </View>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      item: {},
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseSubmissionSingle()
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting grade'} />
      )
    }
    return (
      <ScrollView>
        <View style={Pages.viewContainer}>
          <Text style={styles.heading}>{this.props.name}</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Due Date</Text>
            <Text style={styles.infoDesc}>{this._formatDate(this.state.item.assignment.due_at)}</Text>
          </View>
          {this.state.item.submitted_at
            ? (
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Submitted Date</Text>
                <Text style={styles.infoDesc}>{this._formatDate(this.state.item.submitted_at)}
                  {this.state.item.late
                    ? <Text style={{color: Colors.error}}> (Late)</Text>
                    : null}</Text>
              </View>
            )
            : null}
          {this.state.item.late
            ? (
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Approx Time Late</Text>
                <Text style={styles.infoDesc}>{this._daysLate(this.state.item.duration_late)}</Text>
              </View>
            )
            : null}
          {this.state.item.graded_at
            ? (
              <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Graded Date</Text>
                <Text style={styles.infoDesc}>{this._formatDate(this.state.item.graded_at)}</Text>
              </View>
            )
            : null}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Grade</Text>
            <Text style={styles.infoDesc}>{this.state.item.grade} / {this.state.item.assignment.points_possible}</Text>
          </View>
        </View>
        {this.state.item.attachments
          ? (
            <View style={Pages.viewContainer}>
              <Text style={styles.infoTitle}>Files Submitted</Text>
            </View>
          )
          : null}
        {this.state.item.attachments
          ? (
            this.state.item.attachments.map((attachments) => (
              <TouchableHighlight onPress={() => this._openAttachment(attachments.url)} key={attachments.id}
                underlayColor={Colors.transparent} style={Pages.viewContainer}>
                <View style={styles.attachmentContainer} key={attachments.id}>
                  <AttachmentIcon style={styles.attachmentIcon} type={attachments.mime_class} size={30} />
                  <View style={styles.attachmentNameSizeContainer}>
                    <Text style={styles.attachmentName}>{attachments.display_name}</Text>
                    <Text style={styles.attachmentSize}>
                      ({attachments.size !== null
                      ? this.convertFromByte(attachments.size)
                      : 'Unknown Size'})
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            ))
          )
          : null}
        {this.state.item.rubric_assessment
          ? this._showRubric(this.state.item)
          : null}
        {this.state.item.submission_comments.map((item) => (
          <View key={item.id} style={{
            paddingTop: 20,
            paddingBottom: 20
          }}>
            <ListItem
              roundAvatar
              hideChevron
              avatar={{uri: item.author.avatar_image_url}}
              title={item.author.display_name}
              subtitle={this._formatDate(item.created_at)}
              containerStyle={Pages.authorContainer}
            />
            <Text style={Pages.viewContainer}>
              {item.comment}
            </Text>
          </View>
        ))}
      </ScrollView>
    )
  }
}
