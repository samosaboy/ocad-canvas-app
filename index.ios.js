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

// TODO: Like this
// const tabs = [{
//   label: 'Navigation',
//   screen: 'example.Types',
//   icon: require('../img/list.png'),
//   title: 'Navigation Types',
// }, {
//   label: 'Actions',
//   screen: 'example.Actions',
//   icon: require('../img/swap.png'),
//   title: 'Navigation Actions',
// }];

AppRegistry.registerComponent('ReactOcadCanvasApp', () => App)
