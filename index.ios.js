import './App/Config/ReactotronConfig'
import { AppRegistry } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { registerScreens } from './App/Navigation/AppNavigation'
import App from './App/Modules/App'

registerScreens()

Navigation.startTabBasedApp({
  animationType: 'fade',
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
    tabBarSelectedButtonColor: '#000000',
    initialTabIndex: 1 // TODO: Change later
  }
})

AppRegistry.registerComponent('ReactOcadCanvasApp', () => App)
