// import _ from 'lodash'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { ScrollView, FlatList, StatusBar, View, Text, TouchableHighlight } from 'react-native'
import API from '../Services/Api'
import styles from './Styles/CourseScreenStyles'
import ScreenLadda from '../Components/ScreenLadda'

export default class HomeScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'My Courses',
    tabBarLabel: 'Courses',
    tabBarIcon: ({tintColor}) => (
      <Icon name='ios-cube-outline' size={25} style={{color: tintColor}} />
    )
  })
  api = {}

  constructor (props) {
    super(props)
    this.state = {
      courseList: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    return this.api.getCourses()
      .then((response) => {
        this.setState({ courseList: response.data, loading: false })
      }).catch((e) => {
        console.log(e)
      })
  }

  _getCourseDetails = (id, name) => {
    // send ID down as a prop?
    const { navigate } = this.props.navigation
    navigate('SingleCourseView', { id, name: this._showCourseName(name) })
    this.api.getCourseActivity(id)
      .then((response) => {
        console.tron.log(response.data)
      })
  }

  _showCourseName = (code) => {
    return code.replace(/.{3}$/, '')
  }

  _showCourseCode = (name) => {
    const txt = name
    const re1 = '.*?'
    const re2 = '\\s+'
    const re3 = '.*?'
    const re4 = '\\s+'
    const re5 = '.*?'
    const re6 = '(\\s+)'
    const re7 = '((?:[a-z][a-z]+))'
    const re8 = '([-+]\\d+)'
    const re9 = '([-+]\\d+)'
    const p = new RegExp(re1 + re2 + re3 + re4 + re5 + re6 + re7 + re8 + re9, ['i'])
    const m = p.exec(txt)
    if (m != null) {
      const ws1 = m[1]
      const word1 = m[2]
      const signedInt1 = m[3]
      const signedInt2 = m[4]
      return ws1.replace(/</, '') + word1.replace(/</, '') + signedInt1.replace(/</, '') + signedInt2.replace(/</, '')
    }
  }

  _filterCourseView = ({item}) => {
    return (
      <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <TouchableHighlight onPress={() => this._getCourseDetails(item.id, item.course_code)}>
          <View style={styles.courseBox}>
            <Text style={styles.courseCode}>{this._showCourseCode(item.name)}</Text>
            <Text style={styles.courseName}>{this._showCourseName(item.course_code)}</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    )
  }

  render () {
    if (this.state.loading) {
      return (
        <ScreenLadda text={'Populating Courses'} />
      )
    }
    return (
      <View style={styles.homeContainer}>
        <StatusBar
          barStyle='dark-content'
        />
        <View style={styles.groupContainer}>
          <FlatList
            data={this.state.courseList}
            keyExtractor={item => item.id}
            renderItem={this._filterCourseView}
          />
        </View>
      </View>
    )
  }
}
