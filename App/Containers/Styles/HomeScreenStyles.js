import { StyleSheet } from 'react-native'
import { Containers, Metrics, Colors } from '../../Common/index'

export default StyleSheet.create({
  courseBox: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Metrics.baseMargin,
    borderRadius: 15
  },
  ...Containers
})
