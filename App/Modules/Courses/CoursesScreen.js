import React, { Component } from 'react'
import { ActionSheetIOS, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { IconsLoaded, IconsMap } from '../../Common/Icons'
import ScreenLadda from '../../Components/ScreenLadda'
import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'
import * as homeActions from '../../Redux/Actions/homeActions'
import API from '../../Services/Api'
import { styles } from './CourseScreenStyles'

class CoursesScreen extends Component {
  // https://github.com/wix/react-native-navigation/issues/1742 <- useful perhaps?
  // static propTypes = {
  //   dispatch: PropTypes.func,
  //   fetching: PropTypes.bool
  // }
  static navigatorStyle = {
    ...navigatorStyle,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false,
    navBarButtonColor: '#8E8E93'
  }
  api = {}

  _changeCourseType = (value) => {
    if (value === 'All') {
      if (!this.props.courseListComplete) {
        this.props.actions.retrieveCourses('completed')
      }
      this.setState({courseState: 1})
    }
    if (value === 'Current') {
      if (!this.props.courseList) {
        this.props.actions.retrieveCourses('active')
      }
      this.setState({courseState: 0})
    }
  }

  _getCourseDetails = (id, fullName, shortName) => {
    // send ID down as a prop?
    this.props.navigator.push({
      screen: 'SingleCourseView',
      backButtonTitle: '',
      passProps: {
        id,
        fullName,
        shortName
      }
    })
  }

  _showCourseName = (code) => {
    return code.replace(/.{3}$/,
      '')
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
      return ws1.replace(/</,
        '') + word1.replace(/</,
        '') + signedInt1.replace(/</,
        '') + signedInt2.replace(/</,
        '')
    }
  }

  _filterCourseView = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => this._getCourseDetails(item.id,
          item.name,
          this._showCourseName(item.course_code))}>
        <View style={EStyleSheet.child(styles,
          'courseBox',
          item,
          item.length)}>
          <Text style={styles.courseName}>{this._showCourseName(item.course_code)}</Text>
          <Text>{item.term.name}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  constructor (props) {
    super(props)
    this.state = {
      courseState: 0,
      loading: true
    }
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
    this.api = API.create()
    this._renderNavComponents()
  }

  _renderNavComponents () {
    IconsLoaded.then(() => {
      this.props.navigator.setButtons({
        leftButtons: [
          {
            title: 'Options',
            id: 'options',
            disabled: false,
            disableIconTint: false,
            showAsAction: 'ifRoom',
            icon: IconsMap['type']
          }
        ]
      })
      // this.props.navigator.setSubTitle({
      //   subtitle: moment().toISOString()
      // })
    })
  }

  onNavigatorEvent (event) {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'options') {
        ActionSheetIOS.showActionSheetWithOptions({
          options: ['Current Semester', 'All Courses', 'Cancel'],
          cancelButtonIndex: 2
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            if (!this.props.courseList) {
              this.props.actions.retrieveCourses('active')
            }
            this.setState({courseState: 0})
          } else if (buttonIndex === 1) {
            if (!this.props.courseListComplete) {
              this.props.actions.retrieveCourses('completed')
            }
            this.setState({courseState: 1})
          }
        })
      }
    }
    switch (event.id) {
      case 'didAppear':
        this.props.actions.unreadCounter()
        break
    }
  }

  componentDidMount () {
    this.props.actions.retrieveCourses('active')
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
      >
        <FlatList
          data={this.state.courseState === 1
            ? this.props.courseListComplete
            : this.props.courseList}
          keyExtractor={item => item.id}
          renderItem={this._filterCourseView}
        />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    courseList: state.courseReducer.courseList,
    courseListComplete: state.courseReducer.courseListComplete,
    userId: state.courseReducer.userId,
    unreadCounter: ownProps.navigator.setTabBadge(state.courseReducer.badge),
    stateType: state.courseReducer.stateType,
    isLoaded: state.itemLoadReducer.isLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(homeActions,
      dispatch)
  }
}

export default connect(mapStateToProps,
  mapDispatchToProps)(
  CoursesScreen)
