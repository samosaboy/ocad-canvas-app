import { Containers, Metrics, Colors, Fonts } from '../../Common/index'
import EStyleSheet from 'react-native-extended-stylesheet'

const styles = EStyleSheet.create({
  courseBox: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: Metrics.baseMargin,
    borderRadius: 5,
    height: 100,
    // height: 184,
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: Metrics.baseMargin
  },
  'courseBox:first-child': {
    marginTop: 0
  },
  courseCode: {
    fontSize: Fonts.size.small,
    color: Colors.darkGrey,
    textAlign: 'left',
    fontWeight: '400',
    padding: 0,
    marginLeft: -2
  },
  courseName: {
    fontSize: Fonts.size.input,
    textAlign: 'left',
    fontWeight: '400',
    padding: 0,
    margin: 0
  },
  ...Containers
})

EStyleSheet.build()

export { styles }
