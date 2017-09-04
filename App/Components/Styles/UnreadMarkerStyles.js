import { StyleSheet } from 'react-native'
import { Colors } from '../../Common/'

export default StyleSheet.create({
  marker: {
    width: 10,
    height: 10,
    borderRadius: 100 / 2,
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginRight: 5,
    left: 10,
    zIndex: 10,
    top: 0
  }
})
