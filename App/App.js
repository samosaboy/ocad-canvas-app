import React from 'react' // eslint-disable-line
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import { IconsLoaded, IconsMap } from './Common/Icons'

import './Config/ReactotronConfig'

import { registerScreens } from './Navigation/AppNavigation'
import configureStore from './Redux/Store/configureStore'

const store = configureStore()
registerScreens(store, Provider)

// do this properly

const hasAuth = true

if (hasAuth) {
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
        tabBarSelectedButtonColor: '#3D4AD0',
        tabBarLabelColor: '#8E8E93',
        tabBarSelectedLabelColor: '#3D4AD0',
        initialTabIndex: 0
      }
    })
  })
} else {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'NoAuthScreen'
    }
  })
}
