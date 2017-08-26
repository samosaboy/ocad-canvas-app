// import _ from 'lodash'
import React from 'react'
// import Icon from 'react-native-vector-icons/Ionicons'
import { Text } from 'react-native'
// import API from '../Services/Api'
// import styles from './Styles/CourseScreenStyles'
// import ScreenLadda from '../Components/ScreenLadda'

export default class CoursesScreenSingle extends React.Component {
  render () {
    return (
      <Text key={this.props.id}>{this.props.id}</Text>
    )
  }
}
