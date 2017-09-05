import React from 'react'
import { ScrollView } from 'react-native'
import API from '../../Services/Api'
// import { styles } from './CourseScreenStyles'
import ScreenLadda from '../../Components/ScreenLadda'
import WebHtmlView from 'react-native-webhtmlview'

import { navigatorStyle } from '../../Navigation/Styles/NavigationStyles'

export default class CoursesScreenSingleSyllabus extends React.Component {
  static navigatorStyle = {
    ...navigatorStyle,
    tabBarHidden: true,
    navBarHideOnScroll: false,
    statusBarHideWithNavBar: false
  }
  api = {}
  constructor (props) {
    super(props)
    this.state = {
      syllabus: [],
      loading: true
    }
    this.api = API.create()
  }

  componentDidMount () {
    this._getCourseSyllabus()
  }

  _getCourseSyllabus = () => {
    this.api.getCourseSyllabus(this.props.id)
      .then((response) => {
        this.setState({ syllabus: response.data, loading: false })
      })
  }

  render () {
    if (this.state.loading || this.state.syllabus.syllabus_body === null || this.state.syllabus.syllabus_body === '') {
      return (
        <ScreenLadda text={'Getting outline'} />
      )
    }
    return (
      <ScrollView style={{flex: 1, padding: 10}}>
        <WebHtmlView
          source={{ html: this.state.syllabus.syllabus_body }}
          innerCSS='
            body { font-size: 14px; font-family: sans-serif; font-weight: 300; }
            h1 { font-size: 18px; }
            h2 { font-size: 16px; }
            h3 { font-size: 14px !important; }
            dd { margin-left: 0; margin-bottom: 6px; }
            dt { font-weight: 600; margin-bottom: 1px; }
          '
        />
      </ScrollView>
    )
  }
}
