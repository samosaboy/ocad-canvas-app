import _ from 'lodash'
import moment from 'moment'
import React from 'react'
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { Divider, Icon, ListItem } from 'react-native-elements'
import ScreenLadda from '../../Components/ScreenLadda'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'

const {width} = Dimensions.get('window')

const moduleLinks = [
  {
    title: 'Announcements',
    screen: 'CoursesScreenSingleAnnouncements',
    icon: 'ios-megaphone-outline',
    badge: null,
    props: {}
  }, {
    title: 'Assignments',
    screen: 'CoursesScreenSingleAssignments',
    icon: 'ios-paper-outline',
    badge: null,
    props: {}
  }, {
    title: 'Discussions',
    screen: 'CoursesScreenSingleDiscussions',
    icon: 'ios-list-box-outline',
    badge: null,
    props: {}
  }, {
    title: 'Grades',
    screen: 'CoursesScreenSingleGrades',
    icon: 'ios-podium-outline',
    badge: null,
    props: {}
  }, {
    title: 'People',
    screen: 'CoursesScreenSinglePeople',
    icon: 'ios-people-outline',
    badge: null,
    props: {}
  }, {
    title: 'Files',
    screen: 'CoursesScreenSingleFiles',
    icon: 'ios-briefcase-outline',
    badge: null,
    props: {}
  }, {
    title: 'Outline',
    screen: 'CoursesScreenSingleSyllabus',
    icon: 'ios-book-outline',
    badge: null,
    props: {}
  }
]

export default class CoursesScreenSingle extends React.PureComponent {
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}

  _getCourseActivity = () => {
    this.api.getCourseActivity(this.props.id)
    .then((response) => {
      console.log(response.data)
      this.setState({
        courseActivity: _.reject(response.data,
          {
            title: null,
            message: null
          }),
        loading: false
      })
    })
    this.api.getCourseActivitySummary(this.props.id)
    .then((response) => {
      this.setState({courseActivitySummary: response.data})
    })
  }

  _formatDate = (date) => {
    return moment.utc(date)
    .fromNow()
  }

  _formatCourseName = (fullName) => {
    return fullName.replace(`, ${this.props.fullName}`,
      '')
    .replace(`: ${this.props.fullName}`,
      '')
  }

  _activityFull = (item) => {
    console.tron.log(item)
    switch (item.type) {
      case 'DiscussionTopic':
        this.props.navigator.push({
          screen: 'CoursesScreenSingleDiscussionsSingle',
          passProps: {
            courseId: item.course_id,
            itemId: item.discussion_topic_id
          }
        })
        break
      case 'Announcement':
        this.props.navigator.push({
          screen: 'CoursesScreenSingleAnnouncementsSingle',
          passProps: {
            courseId: item.course_id,
            itemId: item.announcement_id
          }
        })
        break
      default:
        break
    }
  }
  _showType = (item) => {
    switch (item.type) {
      case 'DiscussionTopic':
        return 'Discussion'
      case 'Announcement':
        return 'Announcement'
      case 'Submission':
        return 'Submission'
      case 'Message':
        return 'Message'
      default:
        return null
    }
  }
  _showText = (item) => {
    switch (item.type) {
      case 'Submission':
        return (
          <View>
            <Text>Grade: {item.grade}</Text>
            {item.submission_comments.length > 0 &&
              <View style={styles.iconItem}>
                <Icon type='ionicon' name='ios-text-outline' size={20} color='#000000' />
                <Text style={styles.iconItemText}>{item.submission_comments.length}</Text>
              </View>}
          </View>
        )
      default:
        return (
          item.message &&
            (
              <Text>
                {_.truncate(item.message.replace(/<\/?[^>]+>/gi,
                  '')
                  .replace(/\r?\n|\r/g,
                    ' ')
                  .replace('           ',
                    ''),
                  {
                    length: 150,
                    seperator: '...'
                  })}
              </Text>
            )
        )
    }
  }
  _activitySummary = ({item}) => {
    // TODO: Come back to this
    return (
      <TouchableOpacity style={[styles.summaryBox, {width: width - 80}]} onPress={() => {
        this._activityFull(item)
      }}>
        <View
          style={[
            styles.summaryBoxContent, {
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }
          ]}>
          <Text>
            {this._showType(item)}
          </Text>
          <Text style={styles.summaryBoxDate}>{this._formatDate(item.created_at)}</Text>
        </View>
        <Divider />
        <View style={[styles.summaryBoxContent, {flex: 0.9, paddingLeft: 10, paddingRight: 20, paddingTop: 0}]}>
          <Text style={styles.summaryBoxTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <View style={styles.summaryBoxMessage} numberOfLines={4}>
            {this._showText(item)}
          </View>
        </View>
        <View>
          <Divider />
          <Text style={styles.componentButton}>View {this._showType(item)}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  _toCourseModule = (screen, title) => {
    this.props.navigator.push({
      screen,
      title,
      passProps: {
        id: this.props.id
      }
    })
  }
  refresh = () => {
    // TODO: Check back on this later...
    this.api.getCourseActivity(this.props.id)
    .then((response) => {
      this.setState({
        courseActivity: [],
        courseActivitySummary: [],
        loading: true
      })
      this.setState({
        courseActivity: _.reject(response.data,
          {
            title: null,
            message: null
          }),
        loading: false
      })
    })
    this.api.getCourseActivitySummary(this.props.id)
    .then((response) => {
      this.setState({courseActivitySummary: response.data})
    })
  }

  constructor (props) {
    super(props)
    this.props.navigator.setTitle({
      title: this.props.shortName
    })
    this.state = {
      loading: true,
      courseActivity: [],
      courseActivitySummary: []
    }
    this.moduleLinks = moduleLinks
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseActivity()
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Getting course info'} />
      )
    }
    return (
      <View>
        <ScrollView
          horizontal={false}
          refreshControl={<RefreshControl
            refreshing={this.state.loading}
            onRefresh={this.refresh.bind(this)}
          />}
        >
          <FlatList
            horizontal
            data={this.state.courseActivity}
            keyExtractor={item => item.id}
            renderItem={this._activitySummary}
            decelerationRate='fast'
            snapToInterval={width - 60}
            snaptoAlignment={'center'}
          />
          {this.moduleLinks.map((module) => (
            <ListItem
              key={module.screen}
              title={module.title}
              containerStyle={styles.listContainer}
              onPress={() => this._toCourseModule(module.screen,
                module.title)}
              leftIcon={<Icon type='ionicon' name={module.icon} size={25} color='#007AFF' style={courseStyle.icon} />}
            />
          ))}
        </ScrollView>
      </View>
    )
  }
}

const courseStyle = StyleSheet.create({
  icon: {
    paddingLeft: 10,
    paddingRight: 10
  }
})
