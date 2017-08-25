// import React from 'react'
import { StackNavigator, TabNavigator } from 'react-navigation'
// import { Icon } from 'react-native'
import CoursesScreen from '../Modules/Courses/CoursesScreen'
import InboxScreen from '../Modules/Inbox/InboxScreen'
import SingleCourseView from '../Modules/Courses/CoursesScreenSingle'
import SingleConversationView from '../Modules/Inbox/InboxScreenSingle'
import SingleConversationViewListParticipants from '../Modules/Inbox/InboxScreenSingleAllParticipants'

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
  lazy: true,
  tabBarOptions: {
    activeTintColor: '#000000',
    inactiveTintColor: '#A4AAB3',
    showLabel: false,
    labelStyle: styles.label
  }
})

// Manifest of possible screens
const TopNav = StackNavigator({
  CoursesScreen: {
    screen: PrimaryNav
  },
  SingleCourseView: {
    screen: SingleCourseView
  },
  SingleConversationView: {
    screen: SingleConversationView
  },
  SingleConversationViewListParticipants: {
    screen: SingleConversationViewListParticipants
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
