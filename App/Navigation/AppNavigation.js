// import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
// import { Icon } from 'react-native'
import CoursesScreen from '../Containers/CoursesScreen'
import InboxScreen from '../Containers/InboxScreen'
import SingleCourseView from '../Containers/CoursesScreenSingle'

import styles from './Styles/NavigationStyles'

const PrimaryNav = TabNavigator({
  CoursesScreen: {
    screen: CoursesScreen
  },
  InboxScreen: {
    screen: InboxScreen
  }
}, {
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#E91E63',
    inactiveTintColor: '#A4AAB3'
  }
})

// Manifest of possible screens
const TopNav = StackNavigator({
  CoursesScreen: {
    screen: PrimaryNav
  },
  SingleCourseView: {
    screen: SingleCourseView
  }
}, {
  // Default config for all screens
  headerMode: 'float',
  mode: 'card',
  initialRouteName: 'CoursesScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default TopNav
