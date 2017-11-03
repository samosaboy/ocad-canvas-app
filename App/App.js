import React from 'react' // eslint-disable-line
import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import { IconsMap, IconsLoaded } from './Common/Icons'

import './Config/ReactotronConfig'

import { registerScreens } from './Navigation/AppNavigation'
import configureStore from './Redux/Store/configureStore'

const store = configureStore()
registerScreens(store, Provider)

IconsLoaded.then(() => {
  Navigation.startTabBasedApp({
    animationType: 'none',
    tabs: [
      {
        label: 'Courses',
        screen: 'CoursesScreen',
        title: 'My Courses',
        icon: IconsMap['courses']
      },
      {
        label: 'Messages',
        screen: 'InboxScreen',
        title: 'Messages',
        icon: IconsMap['messages']
      },
      {
        label: 'Profile',
        screen: 'Profile',
        title: 'My Profile',
        icon: IconsMap['profile']
      }
    ],
    appStyle: {
      keepStyleAcrossPush: false
    },
    tabsStyle: {
      tabBarButtonColor: '#8E8E93',
      tabBarSelectedButtonColor: '#007AFF',
      tabBarLabelColor: '#8E8E93',
      tabBarSelectedLabelColor: '#007AFF',
      // tabBarBackgroundColor: '#FFFFFF',
      initialTabIndex: 0 // TODO: Change later
    }
  })
})
