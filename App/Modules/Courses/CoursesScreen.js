import React, { Component } from 'react'
import { SegmentedControlIOS, ScrollView, FlatList, View, Text, TouchableOpacity } from 'react-native'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import { IconsMap, IconsLoaded } from '../../Common/Icons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet'
import * as homeActions from '../../Redux/Actions/homeActions'

class CoursesScreen extends Component {
  // static propTypes = {
  //   dispatch: PropTypes.func,
  //   fetching: PropTypes.bool
  // }
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}

  constructor (props) {
    super(props)
    this._renderNavButtons()
    this.state = {
      courseState: 0,
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this.props.actions.retrieveCourses('active')
  }

  _renderNavButtons () {
    IconsLoaded.then(() => {
      this.props.navigator.setTabButton({
        icon: IconsMap['courses'],
        selectedIconColor: '#FFFFFF'
      })
    })
  }

  _getCourseDetails = (id, name) => {
    // send ID down as a prop?
    this.props.navigator.push({
      screen: 'SingleCourseView',
      passProps: {
        id,
        name
      }
    })
    this.api.getCourseActivity(id)
      .then((response) => {
        console.log(response.data)
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
      <TouchableOpacity onPress={() => this._getCourseDetails(item.id, item.course_code)}>
        <View style={EStyleSheet.child(styles, 'courseBox', item, item.length)}>
          <Text style={styles.courseCode}>{this._showCourseCode(item.name)}</Text>
          <Text style={styles.courseName}>{this._showCourseName(item.course_code)}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _changeCourseType = (value) => {
    if (value === 'All') {
      this.props.actions.retrieveCourses('completed')
      this.setState({ courseState: 1 })
    }
    if (value === 'Current') {
      this.props.actions.retrieveCourses('active')
      this.setState({ courseState: 0 })
    }
  }

  render () {
    if (this.props.isLoaded) {
      return (
        <ScreenLadda text={'Populating Courses'} />
      )
    }
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.homeContainer}
        contentOffset={{ x: 0, y: 35 }}
      >
        <SegmentedControlIOS
          tintColor='#000000'
          values={['Current', 'All']}
          selectedIndex={this.state.courseState}
          onValueChange={(value) => {
            this._changeCourseType(value)
          }}
        />
        <View>
          <FlatList
            data={this.props.courseList}
            keyExtractor={item => item.id}
            renderItem={this._filterCourseView}
          />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseList: state.courseReducer.courseList,
    userId: state.courseReducer.userId,
    stateType: state.courseReducer.stateType,
    isLoaded: state.itemLoadReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesScreen)
