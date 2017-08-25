import { StyleSheet } from 'react-native'
import { Containers, Metrics, Colors, Fonts } from '../../Common/index'
// import { width, height, totalSize } from 'react-native-dimension'

export default StyleSheet.create({
  courseBox: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Metrics.baseMargin,
    borderRadius: 5,
    height: 184,
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: Metrics.baseMargin
  },
  courseCode: {
    fontSize: Fonts.size.small,
    color: Colors.darkGrey,
    textAlign: 'left',
    fontWeight: '200',
    padding: 0,
    marginLeft: -2
  },
  courseName: {
    fontSize: Fonts.size.regular,
    textAlign: 'left',
    fontWeight: '300',
    padding: 0,
    margin: 0
  },
  ...Containers
})
