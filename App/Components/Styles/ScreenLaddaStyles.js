import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Common/'

export default StyleSheet.create({
  loadingContainer: {
    flex: 1,
    margin: Metrics.section,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 15,
    color: Colors.lightGrey,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 15
  }
})
