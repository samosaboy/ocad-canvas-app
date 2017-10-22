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
  // https://github.com/wix/react-native-navigation/issues/1742 <- useful perhaps?
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
    this._renderNavComponents()
    this.state = {
      courseState: 0,
      loading: true
    }
    this.api = API.create()
  }

  _renderNavComponents () {
    IconsLoaded.then(() => {
      this.props.navigator.setTabButton({
        icon: IconsMap['courses'],
        selectedIconColor: '#FFFFFF'
      })
    })
  }

  componentDidMount () {
    this.props.actions.retrieveCourses('active')
  }

  _getCourseDetails = (id, fullName, shortName) => {
    // send ID down as a prop?
    this.props.navigator.push({
      screen: 'SingleCourseView',
      // backButtonTitle: '',
      passProps: {
        id,
        fullName,
        shortName
      }
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
      <TouchableOpacity onPress={() => this._getCourseDetails(item.id, item.name, this._showCourseName(item.course_code))}>
        <View style={EStyleSheet.child(styles, 'courseBox', item, item.length)}>
          <Text style={styles.courseName}>{this._showCourseName(item.course_code)}</Text>
          <Text>{item.term.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _changeCourseType = (value) => {
    if (value === 'All') {
      if (!this.props.courseListComplete) {
        this.props.actions.retrieveCourses('completed')
      }
      this.setState({ courseState: 1 })
    }
    if (value === 'Current') {
      if (!this.props.courseList) {
        this.props.actions.retrieveCourses('active')
      }
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
      <View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={styles.homeContainer}
          contentOffset={{x: 0, y: 35}}
        >
          <View>
            <SegmentedControlIOS
              tintColor='#43484D'
              values={['Current', 'All']}
              selectedIndex={this.state.courseState}
              style={{ marginLeft: 5, marginRight: 5, marginTop: 5 }}
              onValueChange={(value) => {
                this._changeCourseType(value)
              }}
            />
            <FlatList
              data={this.state.courseState === 1 ? this.props.courseListComplete : this.props.courseList}
              keyExtractor={item => item.id}
              renderItem={this._filterCourseView}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    courseList: state.courseReducer.courseList,
    courseListComplete: state.courseReducer.courseListComplete,
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
