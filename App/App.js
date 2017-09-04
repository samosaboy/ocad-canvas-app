import React from 'react'; // eslint-disable-line
import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'

import './Config/ReactotronConfig'

import { registerScreens } from './Navigation/AppNavigation'
import configureStore from './Redux/Store/configureStore'

const store = configureStore()
registerScreens(store, Provider)

Navigation.startTabBasedApp({
  animationType: 'none',
  tabs: [
    {
      label: 'Courses',
      screen: 'CoursesScreen',
      title: 'Courses'
    },
    {
      label: 'Messages',
      screen: 'InboxScreen',
      title: 'Messages'
    }
  ],
  tabsStyle: {
    tabBarButtonColor: '#343434',
    tabBarSelectedButtonColor: '#343434',
    tabBarLabelColor: '#343434',
    tabBarSelectedLabelColor: '#343434',
    tabBarBackgroundColor: '#FFFFFF',
    initialTabIndex: 0 // TODO: Change later
  }
})
