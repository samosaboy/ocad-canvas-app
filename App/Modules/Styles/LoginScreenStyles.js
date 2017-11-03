import { StyleSheet } from 'react-native'
import { Colors, Containers, Fonts, Metrics } from '../../Common/index'

const common = {
  color: Colors.white,
  padding: Metrics.smallMargin,
  marginBottom: Metrics.smallMargin,
  marginHorizontal: Metrics.smallMargin
}

const header = {
  ...common, ...Fonts.style.h1
}

const subtitle = {
  ...common
}

const loginInput = {
  padding: Metrics.smallMargin,
  color: Colors.white,
  height: 40
}

const loginContainer = {
  flex: 1,
  backgroundColor: Colors.yellow,
  alignItems: 'center',
  paddingTop: Metrics.doubleSection
}

export default StyleSheet.create({
  header,
  subtitle,
  loginInput,
  loginContainer,
  ...Containers
})
