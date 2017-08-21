import { StackNavigator } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen'
import HomeScreen from '../Containers/HomeScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  HomeScreen: { screen: HomeScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'HomeScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
